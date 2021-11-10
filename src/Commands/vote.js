const fs = require('fs').promises;
const { SlashCommandBuilder } = require('@discordjs/builders');
const { api } = require('../tmdbAPI.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('vote')
		.setDescription('Vote Commands')
		.addSubcommand(subcommand =>
			subcommand
				.setName('begin')
				.setDescription('Start a movie night vote'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('end')
				.setDescription('Ends a movie night vote and announces the results'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('show')
				.setDescription('Shows the current votes for each movie, and who voted'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('test')
				.setDescription('Shows the current votes for each movie, and who voted')),
	async execute(interaction) {
		const subcommand = interaction.options._subcommand;
		switch (subcommand) {
		case 'begin': {
			break;
		}
		case 'end': {
			break;
		}
		case 'show': {
			break;
		}
		}
		interaction.reply('Nope, Chuck testa');

	},
};