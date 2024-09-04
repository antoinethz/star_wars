'use strict';

const Hapi = require('@hapi/hapi');
const axios = require('axios');
const auth = require('./auth'); 

const start = async () => {



    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        routes: {
          cors: {
            origin: ['http://localhost:5173'],
            headers: ['Accept', 'Content-Type', 'Authorization'],
            exposedHeaders: ['Authorization'],
            additionalExposedHeaders: ['Authorization'],
            credentials: true
          }
        }
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
          const { query, type } = request.query;
    
          const endpoints = {
            people: `https://swapi.dev/api/people/?search=${query}`,
            starships: `https://swapi.dev/api/starships/?search=${query}`,
            planets: `https://swapi.dev/api/planets/?search=${query}`,
            vehicles: `https://swapi.dev/api/vehicles/?search=${query}`,
            species: `https://swapi.dev/api/species/?search=${query}`,
          };
    
          try {
            let results = [];
    
            if (type === 'all') {
              const responses = await Promise.all(
                Object.keys(endpoints).map(async (key) => {
                  const response = await axios.get(endpoints[key]);
                  return response.data.results.map((item) => ({
                    ...item,
                    type: key,
                  }));
                })
              );
              results = responses.flat();
            } else if (endpoints[type]) {
              const response = await axios.get(endpoints[type]);
              results = response.data.results.map((item) => ({
                ...item,
                type: type,
              }));
            } else {
              return h.response({ error: 'Invalid type parameter' }).code(400);
            }
    
            return results;
          } catch (error) {
            console.error('Error fetching data:', error);
            return h.response({ error: 'Failed to fetch data' }).code(500);
          }
        }
      });

    await server.start();
    console.log('Server running at:', server.info.uri);
};

start();
