'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const fetch = require('node-fetch')

    const KEY = process.env.DB_API_KEY

    const movieUrlBuilder = (apiKey = KEY, sort = 'vote_count.desc', page = 1, year = 2020, lang = 'en') => {
      return `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=${sort}&include_adult=false&include_video=false&page=${page}&primary_release_year=${year}&with_original_language=${lang}`
    }
    const genreRaw = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${KEY}&language=en-US`)
    const genreJson = await genreRaw.json()
    const genreObj = {}
    genreJson.genres.forEach(genre => { genreObj[genre.id] = genre.name })
    let startDate = 2010
    let endDate = 2020
    const seederArr = []
    while (startDate <= endDate) {
      for (let i = 1; i <= 4; i++) {
        const url = movieUrlBuilder(KEY, 'vote_count.desc', i, endDate, 'en')
        const rawMovies = await fetch(url)
        const movieJson = await rawMovies.json()
        movieJson.results.forEach(movie => {
          seederArr.push({
            genre: genreObj[movie.genre_ids[0]],
            title: movie.original_title,
            description: movie.overview,
            releaseDate: movie.release_date,
            imgPath: movie.poster_path,
            voteRating: movie.vote_average,
            voteCount: movie.vote_count,
            createdAt: new Date(),
            updatedAt: new Date()
          })
        })
      }
      endDate--
    }
    return queryInterface.bulkInsert('Movies', seederArr, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Movies', null, {});
  }
};
