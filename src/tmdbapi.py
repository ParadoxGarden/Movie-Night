import tmdbsimple as tmdb

class tmdbAPI:
    url = "https://www.themoviedb.org/movie/"

    def __init__(self, key) -> None:
        tmdb.API_KEY = key
        
    def getSearch(self):
        return tmdb.Search()

    def getFind(self):
        return tmdb.Find()

    def getURL(self, movie):
        title = movie['title'].lower()
        title = title.replace(':', '')
        title = title.replace('\'',' ')
        title = title.replace(' ', '-')
        title = title.replace()
        return f"{self.url}{movie['id']}-{title}"