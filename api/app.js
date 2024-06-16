// Imports
import express from 'express';

import albumRoutes from './routes/albumRoutes.js';
import songsRoutes from './routes/songsRoutes.js';
import bandRoutes from './routes/bandRoutes.js';

const app = express();

// Middleware
app.use((req, res, next) => {
    res.removeHeader("x-powered-by");
    res.removeHeader("set-cookie");
    res.removeHeader("Date");
    res.removeHeader("Connection");
    next();
});

// Routes
app.use('/v2/albums', albumRoutes);
app.use('/v2/songs', songsRoutes);
app.use('/v2/band', bandRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});

export default app;