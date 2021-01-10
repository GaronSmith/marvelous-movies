const renderFeed = (arr) => {
    const feedAnchor = document.getElementById('feed-results')
    
    arr.forEach(status => {
        const divResult = document.createElement('div');
        divResult.setAttribute('class', 'result-container');
        const divPoster = document.createElement('div');
        divPoster.setAttribute('class', 'image-container');
        const divMovie = document.createElement('div');
        divMovie.setAttribute('class', 'movie-items');
        const divUser = document.createElement('div');
        divUser.setAttribute('class', 'user-details');
        divUser.setAttribute('id', status.userId)
        const divContainer = document.createElement('div');
        divContainer.setAttribute('class', 'total')
        const divOverview = document.createElement('div');
        divOverview.setAttribute('class', 'details-container');
        const res = document.createElement('li');
        res.setAttribute('class', 'feed-results')
        const userName = document.createElement('a');
        userName.setAttribute('class', 'user-name');
        userName.setAttribute('href', `/users/${status.userId}`)
        userName.innerHTML = status.userName + ' ' + makeSentence(status.status)
        const unFollowButton = document.createElement('button');
        unFollowButton.setAttribute('class', 'unfollow-btn');
        unFollowButton.setAttribute('id', `unfollow_${status.userId}`)
        unFollowButton.innerHTML = 'Unfollow'
        const time = document.createElement('p');
        time.setAttribute('class', 'time-delta');
        time.innerHTML = makeTime(Math.abs(new Date() - new Date(status.updatedAt))) + ' ago'
        const title = document.createElement('a');
        title.setAttribute('class', 'movie-title');
        title.setAttribute('href', `/movies/${status.Movie.id}`);
        title.innerHTML = status.Movie.title
        const poster = document.createElement('img');
        poster.setAttribute('src', `https://image.tmdb.org/t/p/original${status.Movie.imgPath}`)
        poster.setAttribute('class', 'movie-poster');
        const avgRating = document.createElement('p');
        avgRating.setAttribute('class', 'avg-rating');
        avgRating.innerHTML = `<b>Average rating:</b> ${parseFloat(status.Movie.voteRating) / 2}`;
        const overview = document.createElement('p');
        overview.setAttribute('class', 'overview');
        overview.innerHTML = `<b>Overview:</b> <br> ${status.Movie.description}`
        
        feedAnchor.appendChild(res);
        res.append(divContainer);
        divContainer.appendChild(divUser);
        divContainer.appendChild(divResult);
        divUser.appendChild(unFollowButton)
        divUser.appendChild(userName)
        divUser.appendChild(time)
        divResult.appendChild(divPoster);
        divResult.appendChild(divOverview);
        divPoster.appendChild(poster);
        divOverview.appendChild(title);
        divOverview.appendChild(avgRating);
        divOverview.appendChild(overview);
    })
    
}

const makeSentence = status => {
    if (status == 'Currently Watching') return 'has made Progress on'
    else if (status == 'Want to Watch') return 'wants to watch'
    else if (status == 'Watched') return 'has finished'
}

const getFeed = async () => {
    const res = await fetch('http://localhost:8080/feed/content');
    const json = await res.json();
    renderFeed(json)

}

const makeTime = milliseconds => {
    
    if(1000 < milliseconds && milliseconds <= 60000){
        return `${Math.round(milliseconds / 1000)} s`
    } else if (60000 < milliseconds && milliseconds <= 3600000) {
        return `${Math.round(milliseconds / 60000)} m`
    } else if (3600000 < milliseconds && milliseconds <= 86400000) {
        return `${Math.round(milliseconds / 3600000)} h`
    } else if (86400000 < milliseconds){
        return `${Math.round(milliseconds / 86400000)} d`
    }
}

const unfollow = async (event) =>{
    // event.preventDefault()
    document.getElementById('feed-results').innerHTML = ''
    const id = event.target.id.split('_')[1];
    try{
        const res = await fetch(`http://localhost:8080/feed/follow/${id}/delete`, {
            method: 'DELETE',
        })
        await getFeed()
    }catch (err){
        console.log(err)
    }
    
    
}

document.addEventListener('DOMContentLoaded', async () => {
    await getFeed()
    Array.from(document.getElementsByClassName('unfollow-btn')).forEach(button => {
      button.addEventListener('click', async () =>{
         await unfollow(event)
        // await getFeed()
        })
  })

})