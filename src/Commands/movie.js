const fs = require('fs').promises;
const url = require('url');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { api } = require('../tmdbAPI.js');

const movielistFile = 'data/movielist.json';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('movie')
		.setDescription('Movie Commands')
		.addSubcommand(subcommand =>
			subcommand
				.setName('add')
				.setDescription('Adds a movie to the vote list')
				.addStringOption(option => option.setName('movie').setRequired(true).setDescription('Movie to add')))
		.addSubcommand(subcommand =>
			subcommand
				.setName('list')
				.setDescription('Lists all the movies currently in the voting list'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('clear')
				.setDescription('Clears the voting movie list'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('remove')
				.setDescription('Remove the most recent item from the voting movie list')),

	async execute(interaction) {
		const options = interaction.options;
		const subcommand = options._subcommand;
		switch (subcommand) {
		case 'list': {
			const list = JSON.parse(await fs.readFile(movielistFile)).list;

			let reply = `\nThere are ${list.length} movies in the list:\n`;
			list.movies.forEach(element => {
				reply += `${element.title}:${element.emoji}\n`;
				if (element.tagline) {
					reply += `${element.tagline}\n`;
				}
			});
			interaction.reply(reply);
			break;
		}
		case 'clear': {
			const document = JSON.parse(await fs.readFile(`${movielistFile}template`));
			await fs.writeFile(movielistFile, JSON.stringify(document, null, 4));
			const reply = 'Movielist file cleared, no movies in voting list';
			interaction.reply(reply);
			break;
		}
		case 'remove': {
			const list = JSON.parse(await fs.readFile(movielistFile));
			const movie = list.list.movies.pop();
			list.list.length--;
			await fs.writeFile(movielistFile, JSON.stringify(list, null, 4));
			await interaction.reply(`Removed ${movie.title} fromt the list`);
			break;
		}
		case 'add': {
			const message = interaction.options._hoistedOptions[0].value;
			const option = [];
			let reply = `Searched ${message} Results:\n`;
			const search = await api.mdb.searchMovie({ query: message });
			search.results.forEach((movie) => {
				// reply += `[${movie.title}](https://www.themoviedb.org/movie/${movie.id})\n`;
				reply += `${movie.title}\n`;
				option.push(
					{
						label: movie.title,
						description: movie.overview.slice(0, 50),
						value: `${movie.id}`,
					},
				);
			});

			const movielist = JSON.parse(await fs.readFile(movielistFile));

			const row = new MessageActionRow()
				.addComponents(
					new MessageSelectMenu()
						.setCustomId('movie')
						.setPlaceholder('Nothing Selected')
						.addOptions(option),
				);

			movielist.temp.search = search;
			await fs.writeFile(movielistFile, JSON.stringify(movielist, null, 4));
			await interaction.reply({ content: reply, components: [row] });


			break;
		}
		}

	},
};

function validURL(s) {
	try {
		new url.URL(s);
		return true;
	}
	catch (err) {
		return false;
	}
}