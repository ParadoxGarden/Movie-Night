import yaml
import tmdbapi
import discord

def init():
    with open('settings.yaml', 'r') as settings_file:
        settings = yaml.load(settings_file)["Settings"]
    api = tmdbapi.tmdbAPI(settings['TMDBAPIkey'])
    print(api)
init()