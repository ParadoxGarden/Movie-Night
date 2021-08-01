var ts = settings["tmdb"]

mdb = TMDB(ts["key"])

exports.mdb = mdb;