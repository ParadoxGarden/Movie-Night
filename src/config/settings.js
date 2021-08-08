const YAML = require('js-yaml');
const fs = require('fs');

const settingsName = 'settings.yaml';
const settingsfile = fs.readFileSync(settingsName);
const settings = YAML.load(settingsfile)['settings'];

exports.settings = settings;