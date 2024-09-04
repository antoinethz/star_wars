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
        auth: 'simple',
      },
      handler: async (request, h) => {
        const { query } = request.query;
    
        const endpoints = {
          people: `https://swapi.dev/api/people/?search=${query}`,
          starships: `https://swapi.dev/api/starships/?search=${query}`,
          planets: `https://swapi.dev/api/planets/?search=${query}`,
          vehicles: `https://swapi.dev/api/vehicles/?search=${query}`,
          species: `https://swapi.dev/api/species/?search=${query}`,
        };
    
        const fetchAllPages = async (url) => {
          let allResults = [];
          let nextUrl = url;
    
          while (nextUrl) {
            const response = await axios.get(nextUrl);
            const data = response.data;
            allResults = [...allResults, ...data.results]; 
            nextUrl = data.next; 
          }
    
          return allResults;
        };
    
        try {
          let results = [];
    
          const responses = await Promise.all(
            Object.keys(endpoints).map(async (key) => {
              const allResults = await fetchAllPages(endpoints[key]);
              return allResults.map((item) => ({
                ...item,
                type: key,
              }));
            })
          );
          
          results = responses.flat();
    
          return results;
        } catch (error) {
          console.error('Error fetching data:', error);
          return h.response({ error: 'Failed to fetch data' }).code(500);
        }
      },
    });

    await server.start();
    console.log('Server running at:', server.info.uri);
};

start();
