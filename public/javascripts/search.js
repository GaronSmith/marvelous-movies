import {checkRating,rateMovie} from './utils.js'

const searchInput = async (value) => {
    if(value.length){
        const body = { value };
        try {
            const res = await fetch('http://localhost:8080/search/results', {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const json = await res.json()
            renderResults(json)
        } catch (err) {
            console.log(err)
        } 
    }    
}

const renderResults = (json) => {
    const searchResultsAnchor = document.getElementById('search-results');

    while(searchResultsAnchor.firstChild){
        searchResultsAnchor.removeChild(searchResultsAnchor.firstChild)
    }
    for(let i = 0; i < json.moviesTop.length; i++){
        const movie = json.moviesTop[i]

        const divResult = document.createElement('div');
        divResult.setAttribute('class','result-container')
        const divPoster = document.createElement('div');
        divPoster.setAttribute('class','image-container')
        const divOverview = document.createElement('div')
        divOverview.setAttribute('class', 'details-container')
        const res = document.createElement('li');
        res.setAttribute('class', 'search-results')
        const title = document.createElement('a');
        title.setAttribute('class', 'movie-title')
        title.setAttribute('href', `/movies/${movie.id}`)
        title.innerHTML = movie.title
        const genre = document.createElement('h3');
        genre.setAttribute('class', 'movie-genre')
        genre.innerHTML = movie.genre
        const poster = document.createElement('img')
        poster.setAttribute('src', `https://image.tmdb.org/t/p/original${movie.imgPath}`)
        poster.setAttribute('class', 'movie-poster')
        const avgRating = document.createElement('p')
        avgRating.setAttribute('class', 'avg-rating')
        avgRating.innerHTML = `<b>Average rating:</b> ${parseFloat(movie.voteRating)/2}`
        const rating = document.createElement('p');
        rating.setAttribute('class', 'stars')
        rating.setAttribute('id', movie.id)
        rating.innerHTML = '<b>Your rating:</b>'
        const overview = document.createElement('p')
        overview.setAttribute('class', 'overview')
        overview.innerHTML = `<b>Overview:</b> <br> ${movie.description}`
        for(let i = 1; i <=5; i++){
            const span = document.createElement('span')
            span.setAttribute('class', 'far fa-star')
            span.setAttribute('id', `movie-${movie.id}-star-rating_${i}`)
            rating.appendChild(span)
        }
        checkRating()
        searchResultsAnchor.appendChild(res)
        res.append(divResult)
        divResult.append(divPoster)
        divResult.append(divOverview)
        divPoster.appendChild(poster)
        divOverview.appendChild(title)
        divOverview.appendChild(genre)
        divOverview.appendChild(avgRating)
        divOverview.appendChild(rating)
        divOverview.appendChild(overview)
    }
    
    
}

document.addEventListener('DOMContentLoaded', async () => {
   document.getElementById('searchBar').addEventListener('keyup', async (event) => {
       await searchInput(event.target.value)
       
       const ratings = document.getElementsByClassName('stars')
       
       Array.from(ratings).forEach(rating => {
           rating.childNodes.forEach(star => {
               star.addEventListener('click', rateMovie)
           })
       })
    
   })
    
})