
import express from 'express';

import albumRoutes from './routes/albumRoutes.js';

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

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});

export default app;