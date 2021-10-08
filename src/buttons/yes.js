const fs = require('fs').promises;
const emoji = require('number-to-emoji');

const movielistFile = 'movielist.json';

module.exports = {
	name: 'yes',
	execute: async (interaction) => {
		const movielist = JSON.parse(await fs.readFile(movielistFile));
		console.log(movielist);
		const searchNum = movielist.temp.searchNum;
		const search = movielist.temp.search;

		movielist.list.length++;
		const lenEmoji = emoji.toEmoji(movielist.list.length);
		const movieDoc = search.results[searchNum];

		const date = new Date();
		const movie = {
			id: movieDoc.id,
			description: movieDoc.overview,
			poster: movieDoc.poster_path,
			tagline: movieDoc.tagline,
			emoji: lenEmoji,
			runtime: `${Math.floor(movieDoc.runtime / 60)}:${movieDoc.runtime % 60}`,
			title: movieDoc.title,
			time: `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}-${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
		};

		movielist.list.movies.push(movie);
		movielist.temp.searchNum = 0;
		movielist.temp.search = {};
		await fs.writeFile(movielistFile, JSON.stringify(movielist, null, 4));

		const reply = `[${movieDoc.title}](https://www.themoviedb.org/movie/${movieDoc.id}) has been added to the movie vote list with vote emoji ${movieDoc.lenEmoji}`;

		await interaction.reply(reply);
	},
};