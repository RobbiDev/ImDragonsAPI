// Import necessary modules
const express = require('express');
const app = express();
const config = require('./config.json');
const builder = require('./fileBuilder.js');

// Middleware to parse JSON bodies
app.use(express.json());

// Global constant for API name
const apiName = config.apiName;

// Middleware to remove specific headers for security
app.use((req, res, next) => {
    res.removeHeader("x-powered-by");
    res.removeHeader("set-cookie");
    res.removeHeader("Date");
    res.removeHeader("Connection");
    next();
});

// Maintenance mode middleware
if (config.maintenance) {
    app.use('*', (req, res) => {
        res.status(503).send({ maintenance: 'Server currently down for maintenance' });
    });
}

// Route for public API requests
app.use(`/${apiName}/v1/public`, builder("main"));

// Uncomment the following line if you need to add private routes in the future
// app.use(`/${apiName}/v1/private`, builder("main"));

// Start the server and listen on the specified port
app.listen(config.PORT, () => {
    if (config.env.stage) {
        console.log(`Server is in Staging Mode and is running on http://localhost:${config.PORT}`);
    } else {
        console.warn('WARNING: Server is in PRODUCTION Mode! All changes will be live immediately.');
        console.log(`Server is in PRODUCTION Mode and is running on https://api.unnecessarylibraries.com/imdragons/v1/`);
    }
});

/**
 * Express.js server application setup
 * 
 * This application is configured to run an API server using Express.js. It loads
 * configuration settings from a JSON file and applies various middlewares, including:
 * - JSON body parsing
 * - Security headers removal
 * - Maintenance mode handling
 * 
 * The server routes are dynamically built using an external module (`fileBuilder.js`).
 * Depending on the environment and configuration, it can operate in staging or production mode.
 * 
 * Configurations:
 * - apiName: The base name for the API routes
 * - maintenance: Boolean flag for enabling maintenance mode
 * - PORT: Port number on which the server listens
 * - env.stage: Boolean flag indicating if the server is in staging mode
 * 
 * Routes:
 * - Public routes are prefixed with `/${apiName}/v1/public`
 * - Private routes (currently commented out) can be added as needed
 * 
 * The server starts and logs its status based on the environment configuration.
 */