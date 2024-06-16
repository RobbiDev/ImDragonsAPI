// Imports
import { fileURLToPath } from 'url'
import { Success, Error } from '../util/ResponseHandler.js'
import path, { dirname } from 'path'
import express from 'express'
import fs from 'fs'

const router = express.Router()

// File Handling
const __dirname = dirname(fileURLToPath(import.meta.url))
const FilePath = path.resolve(__dirname, '../data/band.json')

// Middleware to read JSON file
function readFile() {
  return JSON.parse(fs.readFileSync(FilePath, 'utf8'))
}

// GET /band - Get all band details
router.get('/', (req, res) => {
  try {
    const band = readFile()
    Success(res, 200, band)
  } catch (err) {
    Error(res, 404, "fu")
  }
});

// GET /band/:type - Get band details type
router.get('/:type', (req, res) => {

  const type = req.params.type
  
  try {
    const band = readFile()
    const data = band[`${type}`]
    Success(res, 200, data)
  } catch (err) {
    Error(res, 404, "The requested type of band details does not exist or could not be found.")
  }
});

export default router;