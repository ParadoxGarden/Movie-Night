const TMDB = require('moviedb');
const path = require('path');
const { SlashCreator, ExpressServer} = require('slash-create');
const s = require('./config/settings').settings;
const CatLoggr = require('cat-loggr');

settings = s;
var bs = settings['bot']
var ds = settings["discord"]
const logger = new CatLoggr().setLevel(bs['debug'] === 'true' ? 'debug' : 'info');
const creator = new SlashCreator({
    applicationID: ds['id'],
    publicKey: ds['key'],
    token: ds['token'],
    serverPort: bs['port'],
    serverHost: bs['host'],
    endpointPath: bs['endpoint']
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


creator.registerCommandsIn(path.join(__dirname, 'commands')).syncCommands({deleteCommands=true,skipGuildErrors=true,syncGuilds=true,syncPermissions=true}).withServer(new ExpressServer()).startServer()