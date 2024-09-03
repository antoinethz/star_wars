'use strict';

const Hapi = require('@hapi/hapi');
const axios = require('axios');
const auth = require('./auth'); 

const start = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    await server.register(require('@hapi/basic'));

    server.auth.strategy('simple', 'basic', { validate: auth.validate });


    server.route({
        method: 'GET',
        path: '/',
        options: {
            auth: 'simple'
        },
        handler: async (request, h) => {
            return 'Hello World!';
        }
    });

    server.route({
        method: 'GET',
        path: '/search',
        options: {
            auth: 'simple'
        },
        handler: async (request, h) => {
            const query = request.query.query;
            const type = request.query.type;
            
            try {
                const response = await axios.get(`https://swapi.dev/api/${type}/?search=${query}`);
                return response.data;
            } catch (err) {
                return h.response(err.message).code(500);
            }
        }
    });

    await server.start();
    console.log('Server running at:', server.info.uri);
};

start();
