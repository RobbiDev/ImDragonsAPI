// Importing required modules
const express = require('express');
const router = express.Router();
const config = require('../config.json');
const { Error, Send } = require('../util/ResponseHandler');
const entries = config.contents;

// Middleware to parse JSON bodies
router.use(express.json());

/**
 * @route GET /:content
 * @desc Get content by name
 * @access Public
 */
router.get('/:content', (req, res) => {
    const content = req.params.content.toLowerCase();

    if (entries.includes(content)) {
        try {
            const file = require(`../../db/${content}.json`);
            Send(res, 200, file);
        } catch (err) {
            Error(res, 500, 'Internal server error');
        }
    } else {
        Error(res, 404, 'Content not found');
    }
});

/**
 * @route GET /album/:album
 * @desc Get album by title or ID
 * @access Public
 */
router.get('/album/:album', (req, res) => {
    const targetedAlbum = req.params.album;

    try {
        const file = require(`../../db/album.json`);
        const result = file.ALBUM_LIST.find(album => album.title === targetedAlbum || album.id === targetedAlbum);

        if (!result) {
            return Error(res, 404, 'Album not found');
        }

        Send(res, 202, result);
    } catch (err) {
        Error(res, 500, 'Internal server erro');
    }
});

/**
 * @route GET /band/:content
 * @desc Get band information by content key
 * @access Public
 */
router.get('/band/:content', (req, res) => {
    const targetedContent = req.params.content;

    try {
        const ContentType = require(`../../db/band.json`).BAND_INFO;
        const subContent = Object.keys(ContentType);

        if (!subContent.includes(targetedContent)) {
            return Error(res, 404, 'Content not found!');
        }

        const subContentProps = ContentType[targetedContent];
        Send(res, 202, subContentProps);
    } catch (err) {
        Error(res, 500, 'Internal server error!');
    }
});

// Exporting the router
module.exports = router;
