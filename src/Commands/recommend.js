const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('recommend')
		.setDescription('Recommend Commands')
		.addSubcommand(subcommand =>
			subcommand
				.setName('add')
				.setDescription('Add a recomendation to the list')
				.addStringOption(option => option.setName('movie').setRequired(true).setDescription('Movie to add')))
		.addSubcommand(subcommand =>
			subcommand
				.setName('list')
				.setDescription('List the recommendations')),
	async execute(interaction) {
		const subcommand = interaction.options._subcommand;
		const reply
		switch (subcommand) {
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
			break;
		}
		case 'list': {
			break;
		}
		}
		await interaction.reply(reply);
	},
};
