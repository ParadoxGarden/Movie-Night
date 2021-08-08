const path = require('path');
const CatLoggr = require('cat-loggr');
const { SlashCreator, GatewayServer } = require('slash-create');
const s = require('./config/settings').settings;
const Eris = require('eris');
const settings = s;
const bs = settings['bot'];
const ds = settings['discord'];

const client = new Eris(ds['token']);
const logger = new CatLoggr().setLevel(bs['debug'] === 'true' ? 'debug' : 'info');
const creator = new SlashCreator({
	applicationID: ds['id'],
	publicKey: ds['key'],
	token: ds['token'],
	serverPort: bs['port'],
	serverHost: bs['host'],
});

creator.on('debug', (message) => logger.log(message));
creator.on('warn', (message) => logger.warn(message));
creator.on('error', (error) => logger.error(error));
creator.on('synced', () => logger.info('Commands synced!'));
creator.on('commandRun', (command, _, ctx) =>
	logger.info(`${ctx.user.username}#${ctx.user.discriminator} (${ctx.user.id}) ran command ${command.commandName}`));
creator.on('commandRegister', (command) =>
	logger.info(`Registered command ${command.commandName}`));
creator.on('commandError', (command, error) => logger.error(`Command ${command.commandName}:`, error));


creator
	.withServer(new GatewayServer(
		(handler) => client.on('rawWS', (event) => {
			if (event.t === 'INTERACTION_CREATE') handler(event.d);
		}),
	),
	)
	.registerCommandsIn(path.join(__dirname, 'commands'))
	.syncCommands({ syncGuilds: true, skipGuildErrors: true, deleteCommands: true, syncPermissions: true });
client.connect();