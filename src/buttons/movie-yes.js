const fs = require('fs').promises;
const { api } = require('../tmdbAPI.js');
const emoji = require('number-to-emoji');

const movielistFile = 'data/movielist.json';

module.exports = {
	name: 'movie-yes',
	execute: async (interaction) => {
		const movielist = JSON.parse(await fs.readFile(movielistFile));
		const searchNum = movielist.temp.searchNum;
		const search = movielist.temp.search;

		movielist.list.length++;
		const lenEmoji = emoji.toEmoji(movielist.list.length);
		const movieDoc = await api.mdb.movieInfo({
			id:search.results[searchNum].id,
		});
		const date = new Date();
		const movie = {
			id: movieDoc.id,
			description: movieDoc.overview,
			poster: movieDoc.poster_path,
			emoji: lenEmoji,
			title: movieDoc.title,
			time: `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}-${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
		};
		if (movieDoc.tagline) {
			movie.tagline = movieDoc.tagline;
		}
		if (movieDoc.runtime) {
			movie.runtime = `${Math.floor(movieDoc.runtime / 60)}:${`0${movieDoc.runtime % 60}`.slice(-2)}`;
		}
		movielist.list.movies.push(movie);
		movielist.temp.searchNum = 0;
		movielist.temp.search = {};
		await fs.writeFile(movielistFile, JSON.stringify(movielist, null, 4));

		const reply = `[${movie.title}](https://www.themoviedb.org/movie/${movie.id}) has been added to the movie vote list with vote emoji ${movie.lenEmoji}`;

		await interaction.reply(reply);
	},
};