const fs = require('fs').promises;
const { api } = require('../tmdbAPI.js');
const { MessageActionRow, MessageButton } = require('discord.js');

const movielistFile = 'data/movielist.json';

module.exports = {
	name: 'movie-next',
	execute: async (interaction) => {

		const movielist = JSON.parse(await fs.readFile(movielistFile));
		const search = movielist.temp.search;
		movielist.temp.searchNum++;
		const id = search.results[movielist.temp.searchNum].id;
		const movieDoc = await api.mdb.movieInfo({
			id:id,
		});
		const reply = `[${movieDoc.title}](https://www.themoviedb.org/movie/${movieDoc.id}) is the movie you want to add?`;

		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('movie-yes')
					.setLabel('Yes')
					.setStyle('SUCCESS'),
				new MessageButton()
					.setCustomId('movie-next')
					.setLabel('Next')
					.setStyle('SECONDARY'),
				new MessageButton()
					.setCustomId('movie-no')
					.setLabel('No')
					.setStyle('DANGER'),
			);
		await interaction.reply({ content:reply, components: [row] });
		await fs.writeFile(movielistFile, JSON.stringify(movielist, null, 4));
	},
};