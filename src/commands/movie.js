const fs = require('fs').promises;
const url = require('url');
const emoji = require('number-to-emoji');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { api } = require('../tmdbAPI.js');

const movielistFile = 'movielist.json';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('movie')
		.setDescription('Movie Commands')
		.addSubcommand(subcommand =>
			subcommand
				.setName('add')
				.setDescription('Adds a movie to the vote list')
				.addStringOption(option => option.setName('movie').setRequired(true).setDescription('Movie to add'))
				.addStringOption(option => option.setName('year').setDescription('Year')))
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
			let movieID;
			if (validURL(message)) {
				movieID = api.stripTMDBURL(message);
			}
			else {
				const search = await api.mdb.searchMovie({ query: message });
				console.log(search);
				movieID = search.results[0].id;
			}
			const movieDoc = await api.mdb.movieInfo({ id:movieID });
			const list = JSON.parse(await fs.readFile(movielistFile)).list;

			list.length++;
			const lenEmoji = emoji.toEmoji(list.length);
			const reply = `${movieDoc.title} has been addded to the Movie Night voting list with voteEmoji: ${lenEmoji}`;

			const date = new Date();
			const movie = {
				id: movieDoc.id,
				description: movieDoc.overview,
				poster: movieDoc.poster_path,
				tagline: movieDoc.tagline,
				emoji: lenEmoji,
				runtime: `${Math.floor(movieDoc.runtime / 60)}:${movieDoc.runtime % 60}`,
				title: movieDoc.title,
				time: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}::${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`,
			};

			await fs.writeFile(`movies/${movieDoc.title}.json`.replace(' ', '_'), JSON.stringify(movieDoc, null, 4));
			list.movies.push(movie);
			await fs.writeFile(movielistFile, JSON.stringify({ list: list }, null, 4));
			await interaction.reply(reply);
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