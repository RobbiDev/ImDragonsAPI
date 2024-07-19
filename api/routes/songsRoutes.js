import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import express from 'express';
import fs from 'fs/promises';

const router = express.Router();

// Directory path for the songs data
const __dirname = dirname(fileURLToPath(import.meta.url));
const songsFolderPath = path.resolve(__dirname, '../data/songs');

/**
 * Reads and parses all song files in the songs directory.
 * @returns {Promise<Object[]>} A promise that resolves to an array of song objects.
 */
async function readAllSongs() {
  const songFiles = await fs.readdir(songsFolderPath);
  const songsPromises = songFiles.map(async (file) => {
    const filePath = path.join(songsFolderPath, file);
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  });
  return Promise.all(songsPromises);
}

/**
 * Finds a song by its ID from all available songs.
 * @param {string} songId - The ID of the song to find.
 * @returns {Promise<Object>} A promise that resolves to the song object if found.
 * @throws {Error} Throws an error if the song with the given ID is not found.
 */
async function findSongById(songId) {
  const songs = await readAllSongs();
  const song = songs.find((s) => s.id === songId);
  if (!song) {
    throw new Error('Song not found');
  }
  return song;
}

// GET /api/songs - Retrieve all songs
router.get('/', async (req, res) => {
  try {
    const songs = await readAllSongs();
    res.json(songs);
  } catch (err) {
    console.error('Error reading songs:', err);
    res.status(500).send('Internal Server Error');
  }
});

// GET /api/songs/:id - Retrieve a song by its ID
router.get('/:id', async (req, res) => {
  try {
    const songId = req.params.id.toUpperCase()
    const song = await findSongById(songId);
    res.json(song);
  } catch (err) {
    console.error('Error reading song by ID:', err);
    res.status(404).send('Song not found');
  }
});

export default router;
