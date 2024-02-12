const express = require('express');
const cors = require('cors');
const { createLogger, transports, format } = require('winston');

const ServiceProvider = require("./lib/musiclib");

let lib = new ServiceProvider();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const logger = createLogger({
    level: 'error',
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        new transports.Console({ format: format.simple() })
    ]
});

app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});


function asyncHandler(fn) {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            next(error);
        }
    };
}

app.get(['/', '/api'], asyncHandler(async (req, res) => {
    await res.json({ message: 'Invalid route /api' });
}));

app.get('/api/getArtist', asyncHandler(async (req, res) => {
    const query = req.query;
    const data = await lib.getArtist(query.id, query.count);
    await res.json(data);
}));

app.get('/api/getTopSearches', asyncHandler(async (req, res) => {
    const data = await lib.getTopSearches();
    await res.json(data);
}));

app.get('/api/getHome', asyncHandler(async (req, res) => {
    const data = await lib.getLaunchData();
    await res.json(data);
}));

app.get('/api/getAlbums', asyncHandler(async (req, res) => {
    const query = req.query;
    const data = await lib.getAlbums(query.count, query.page);
    await res.json(data);
}));

app.get('/api/getCharts', asyncHandler(async (req, res) => {
    const data = await lib.getCharts();
    await res.json(data);
}));

app.get('/api/getFeaturedPlaylists', asyncHandler(async (req, res) => {
    const query = req.query;
    const data = await lib.getFeaturedPlaylists(query.count, query.page);
    await res.json(data);
}));

app.get('/api/getTopShows', asyncHandler(async (req, res) => {
    const query = req.query;
    const data = await lib.getTopShows(query.count, query.page);
    await res.json(data);
}));

app.get('/api/getTopArtists', asyncHandler(async (req, res) => {
    const data = await lib.getTopArtists();
    await res.json(data);
}));

app.get('/api/playById', asyncHandler(async (req, res) => {
    const query = req.query;
    const data = await lib.playById(query.id);
    await res.json(data);
}));

app.get('/api/getLyricsById', asyncHandler(async (req, res) => {
    const query = req.query;
    const data = await lib.getLyrics(query.id);
    await res.json(data);
}));

app.get('/api/getPlaylistById', asyncHandler(async (req, res) => {
    const query = req.query;
    const data = await lib.getPlaylistById(query.id);
    await res.json(data);
}));

app.get('/api/search', asyncHandler(async (req, res) => {
    const query = req.query;
    const data = await lib.getSearch(query.query, query.page, query.type);
    await res.json(data);
}));


app.get('/api/getTopSearch', asyncHandler(async (req, res) => {
    const data = await lib.getTopSearches();
    await res.json(data);
}));

app.get('/api/getFeaturedStations', asyncHandler(async (req, res) => {
    const data = await lib.getFeaturedStations();
    await res.json(data);
}));

app.get('/api/getSongById', asyncHandler(async (req, res) => {
    const query = req.query;
    const data = await lib.getSongById(query.id);
    await res.json(data);
}));

app.get('/api/getAlbumById', asyncHandler(async (req, res) => {
    const query = req.query;
    const data = await lib.getAlbumById(query.id);
    await res.json(data);
}));

app.get('/api/getStationById', asyncHandler(async (req, res) => {
    const query = req.query;
    const data = await lib.getStationById(name = query.name, count = query.count);
    await res.json(data);
}));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on : ${port}`);
});
