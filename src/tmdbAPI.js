const { MovieDb } = require('moviedb-promise');
const { tmdb } = require('../config/settings.json');

class tmdbAPI {
	constructor(token) {
		this.mdb = new MovieDb(token);
	}
	stripTMDBURL(URL) {
		return URL.split('/').pop().split('-')[0];
	}
}

module.exports = {
	api: new tmdbAPI(tmdb.token),
};
