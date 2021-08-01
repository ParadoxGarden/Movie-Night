const YAML = require('js-yaml');
const fs = require('fs');

settingsName = "settings.yaml";
settingsfile = fs.readFileSync(settingsName);
settings = YAML.load(settingsfile)["settings"];

exports.settings = settings;