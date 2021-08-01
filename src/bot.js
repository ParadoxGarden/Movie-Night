const TMDB = require('moviedb');
const path = require('path');
const { SlashCreator, ExpressServer} = require('slash-create');
const s = require('./config/settings').settings;
settings = s;

var bs = settings['bot']
var ds = settings["discord"]
const creator = new SlashCreator({
    applicationID: ds['id'],
    publicKey: ds['key'],
    token: ds['token'],
    serverPort: bs['port'],
    serverHost: bs['host'],
    endpointPath: bs['endpoint']
});

creator.registerCommandsIn(path.join(__dirname, 'commands')).syncCommands().withServer(new ExpressServer()).startServer()