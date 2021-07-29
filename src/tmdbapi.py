import tmdbsimple as tmdb

class tmdbAPI:
    url = "https://www.themoviedb.org/movie/"

    def getURL(m):
        title = m['title'].lower()
        title = title.replace(':', '')
        title = title.replace('\'',' ')
        title = title.replace(' ', '-')
        title = title.replace()
        return f"{url}{m['id']}-{title}"
    def __init__(self, key) -> None:
        tmdb.API_KEY = key
        
    def getSearch(self):
        return tmdb.Search()

    def getFind(self):
        return tmdb.Find()
