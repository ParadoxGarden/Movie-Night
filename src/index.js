const fs = require('fs');
const OS = require('process');
try {
	OS.chdir('src');
}
catch (err) {
	console.error(err);
}
const { Client, Collection, Intents } = require('discord.js');
const { Routes } = require('discord-api-types/v9');
const { REST } = require('@discordjs/rest');
const { discord } = require('../config/settings.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.login(discord['token']);

client.commands = new Collection();
client.buttons = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const buttonFiles = fs.readdirSync('./buttons').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const commands = [];

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
	commands.push(command.data.toJSON());
}

for (const file of buttonFiles) {
	const button = require(`./buttons/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.buttons.set(button.name, button);
}

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	}
	else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

const rest = new REST({ version: '9' }).setToken(discord['token']);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');
		await rest.put(
			Routes.applicationGuildCommands(discord['clientID'], discord['guildID']),
			{ body: commands },
		);
		console.log('Successfully registered application commands.');
	}
	catch (error) {
		console.error(error);
	}
})();
