const checkRating = async () => {
    const movieId = document.getElementsByClassName('stars')[0].id;
    const res = await fetch(`http://localhost:8080/reviews/rating/${movieId}`);
    
    const {rating} = await res.json();
    if(rating){
        for(let i = 1; i <= rating.rating; i++){
            const el = document.getElementById(`star-rating_${i}`)
            el.classList.remove('far')
            el.classList.add('fas')
        }
    }
}

const rateMovie = async (event) => {
    const movieId = event.target.parentElement.id;
    const rating = parseInt(event.target.id.split('_')[1]);
    console.log(rating)
}

document.addEventListener('DOMContentLoaded', async () => {
   checkRating()
    document.getElementsByClassName('stars')[0].addEventListener('click', rateMovie)
})