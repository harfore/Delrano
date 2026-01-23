const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Delrano API Documentation',
            version: '1.0.0',
            description: 'Authentication API documentation',
        },
        servers: [
            {
                url: 'http://localhost:3000/api',
                description: 'Development server',
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: [path.join(__dirname, '../routes/*.js')],
};

const specs = swaggerJsdoc(options);

module.exports = specs;