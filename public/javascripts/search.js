

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
    
    // searchResultsAnchor.querySelectorAll('.search-results').forEach(n => n.remove)
    while(searchResultsAnchor.firstChild){
        searchResultsAnchor.removeChild(searchResultsAnchor.firstChild)
    }
    
    for(movie of json.moviesTop){
        const res = document.createElement('li')
        res.innerHTML=movie.title
        res.setAttribute('class', 'search-results')
        searchResultsAnchor.appendChild(res)
        
    }
}



document.addEventListener('DOMContentLoaded', async () => {
   document.getElementById('searchBar').addEventListener('keyup', (event) => {
       searchInput(event.target.value)
   })
})