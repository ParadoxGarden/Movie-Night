const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('addmovie')
		.setDescription('adds a movie to the list'),
	async execute(interaction) {
		let reply = '';
		reply += 'a';
		await interaction.reply(reply);
	},
};
