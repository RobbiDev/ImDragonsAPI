import { fileURLToPath } from 'url';
import { Success, Error } from '../util/ResponseHandler.js'
import path, { dirname } from 'path';
import express from 'express';
import fs from 'fs';

const router = express.Router();

// File Handling
const __dirname = dirname(fileURLToPath(import.meta.url));
const FilePath = path.resolve(__dirname, '../data/album.json');

// Middleware to read JSON file
function readFile() {
  return JSON.parse(fs.readFileSync(FilePath, 'utf8'));
}

// GET /albums - Get all albums
router.get('/', (req, res) => {
  try {
    const albums = readFile();
    Success(res, 200, albums)
  } catch (err) {
    Error(res, 404, "fu")
  }
});

// GET /albums/:id - Get album by ID
router.get('/:id', (req, res) => {
  try {
    const albums = readFile();
    const albumId = parseInt(req.params.id);
    const album = albums.find(album => album.id === albumId);

    if (!album) {
      Error(res, 404, "The requested album does not exist or could not be found.")
    } else {
      Success(res, 200, album)
    }
  } catch (err) {
    console.error('Error reading album by ID:', err);
    res.status(500).send('Internal Server Error');
  }
});

export default router;