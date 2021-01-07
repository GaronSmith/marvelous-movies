
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
            console.log(json.moviesTop)
            renderResults(json)
        } catch (err) {
            console.log(err)
        } 
    }
    const body = {value};
    try{
        const res = await fetch('http://localhost:8080/search/results', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
                }     
            })
        const json = await res.json()
        console.log(json.moviesTop)
        renderResults(json)
    }catch(err){
        console.log(err)
    }
    
}

const renderResults = (json) => {
    const searchResultsAnchor = document.getElementById('search-results');

    while(searchResultsAnchor.firstChild){
        searchResultsAnchor.removeChild(searchResultsAnchor.firstChild)
    }
    for(let i = 0; i < json.moviesTop.length; i++){
        const movie = json.moviesTop[i]
        const res = document.createElement('li');
        res.setAttribute('class', 'search-results')
        const title = document.createElement('h2');
        title.setAttribute('id', 'movie-title')
        title.innerHTML = movie.title
        const poster = document.createElement('img')
        poster.setAttribute('src', `https://image.tmdb.org/t/p/original${movie.imgPath}`)
        poster.setAttribute('id', 'movie-poster')
        const avgRating = document.createElement('p')
        avgRating.setAttribute('id', 'avg-rating')
        avgRating.innerHTML = `Average rating: ${Math.round(parseFloat(movie.voteRating)/2)}`
        const rating = document.createElement('p');
        rating.setAttribute('class', 'stars')
        rating.setAttribute('id', movie.id)
        rating.innerHTML = 'Your rating:'
        const overview = document.createElement('p')
        overview.setAttribute('class', 'overview')
        overview.innerHTML = movie.description
        for(let i = 1; i <=5; i++){
            const span = document.createElement('span')
            span.setAttribute('class', 'far fa-star')
            span.setAttribute('id', `star-rating_${i}`)
            rating.appendChild(span)
        }
        searchResultsAnchor.appendChild(res)
        res.appendChild(title)
        res.appendChild(poster)
        res.appendChild(avgRating)
        res.appendChild(rating)
        res.appendChild(overview)
        
    }
}

document.addEventListener('DOMContentLoaded', async () => {
   document.getElementById('searchBar').addEventListener('keyup', (event) => {
       searchInput(event.target.value)
   })
})