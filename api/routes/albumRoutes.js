import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import express from 'express';
import fs from 'fs';

const router = express.Router();

// Get the directory path of the current module file
const __dirname = dirname(fileURLToPath(import.meta.url));

// Path to the album.json file
const albumFilePath = path.resolve(__dirname, '../data/album.json');

// Middleware to read JSON file
function readAlbumFile() {
  return JSON.parse(fs.readFileSync(albumFilePath, 'utf8'));
}

// GET /api/albums - Get all albums
router.get('/', (req, res) => {
  try {
    const albums = readAlbumFile();
    res.json(albums);
  } catch (err) {
    console.error('Error reading albums:', err);
    res.status(500).send('Internal Server Error');
  }
});

// GET /api/albums/:id - Get album by ID
router.get('/:id', (req, res) => {
  try {
    const albums = readAlbumFile();
    const albumId = parseInt(req.params.id);
    const album = albums.find(album => album.id === albumId);

    if (!album) {
      res.status(404).send('Album not found');
    } else {
      res.json(album);
    }
  } catch (err) {
    console.error('Error reading album by ID:', err);
    res.status(500).send('Internal Server Error');
  }
});

export default router;