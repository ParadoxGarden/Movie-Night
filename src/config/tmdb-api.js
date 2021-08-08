const settings = require('./config/settings').settings;
const TMDB = require('moviedb');
const ts = settings['tmdb'];

const mdb = TMDB(ts['key']);

exports.mdb = mdb;