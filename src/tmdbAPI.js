const theMovieDb = require('themoviedb-javascript-library');
const { tmdb } = require('../config/settings.json');
theMovieDb.common.api_key = tmdb.token;
