import http from 'http';
import app from './app.js';
import config from './config/default.json' assert { type: 'json' }

const port = config.PORT;
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`API is running on port Localhost:${port}\nAPI URL: `);
});