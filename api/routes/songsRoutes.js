import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import express from 'express';
import fs from 'fs';

const router = express.Router();

// Get the directory path of the current module file
const __dirname = dirname(fileURLToPath(import.meta.url));

// Path to the songs folder
const songsFolderPath = path.resolve(__dirname, '../data/songs');

// Helper function to read a song file
function readSongFile(songId) {
  const songFilePath = path.resolve(songsFolderPath, `${songId}.json`);
  if (fs.existsSync(songFilePath)) {
    return JSON.parse(fs.readFileSync(songFilePath, 'utf8'));
  } else {
    throw new Error('Song not found');
  }
}

// GET /api/songs - Get all songs
router.get('/', (req, res) => {
  try {
    const songFiles = fs.readdirSync(songsFolderPath);
    const songs = songFiles.map(file => {
      const songId = path.basename(file, '.json');
      return readSongFile(songId);
    });
    res.json(songs);
  } catch (err) {
    console.error('Error reading songs:', err);
    res.status(500).send('Internal Server Error');
  }
});

// GET /api/songs/:id - Get song by ID
router.get('/:id', (req, res) => {
  try {
    const songId = req.params.id;
    const song = readSongFile(songId);

    res.json(song);
  } catch (err) {
    console.error('Error reading song by ID:', err);
    res.status(404).send('Song not found');
  }
});

export default router;