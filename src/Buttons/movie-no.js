const fs = require('fs').promises;

const movielistFile = 'data/movielist.json';

module.exports = {
	name: 'movie-no',
	execute: async (interaction) => {

		const movielist = JSON.parse(await fs.readFile(movielistFile));

		movielist.temp.search = {};
		movielist.temp.searchNum = 0;
		await fs.writeFile(movielistFile, JSON.stringify(movielist, null, 4));

		await interaction.reply('No movie selected');
	},
};