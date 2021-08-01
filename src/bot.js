const TMDB = require('moviedb');
const path = require('path');
const s = require('./settings');
settings = s.settings;
const { SlashCreator, ExpressServer, CommandOptionType} = require('slash-create');

var ts = settings["tmdb"]
mdb = TMDB(ts["key"])

var ds = settings["discord"]
const creator = new SlashCreator({
    applicationID: '12345678901234567',
    publicKey: ds['key'],
    token: ds['token'],
});

creator.registerCommandsIn(path.join(__dirname, 'commands')).syncCommands().withServer(new ExpressServer()).startServer()