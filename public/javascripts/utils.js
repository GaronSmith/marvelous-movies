const checkRating = async () => {
    const movieId = document.getElementsByClassName('stars')[0].id;
    const res = await fetch(`http://localhost:8080/reviews/rating/${movieId}`);

    const { rating } = await res.json();
    if (rating) {
        for (let i = 1; i <= rating.rating; i++) {
            const el = document.getElementById(`star-rating_${i}`)
            el.classList.remove('far')
            el.classList.add('fas')
        }
        for (let i = rating.rating + 1; i <= 5; i++) {
            const el = document.getElementById(`star-rating_${i}`)
            if (el.classList.contains('fas')) {
                el.classList.remove('fas')
                el.classList.add('far')
            }

        }
    }
}

const rateMovie = async (event) => {
    const movieId = parseInt(event.target.parentElement.id);
    const rating = parseInt(event.target.id.split('_')[1]);
    const body = { movieId, rating }
    if (document.getElementById('star-rating_1').classList.contains('fas')) {
        try {
            const res = await fetch(`http://localhost:8080/reviews/rating/${movieId}`, {
                method: "PUT",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            checkRating()
        } catch (err) {
            console.log(err)
        }
    } else {
        try {
            const res = await fetch(`http://localhost:8080/reviews/rating/${movieId}`, {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            checkRating()
        } catch (err) {
            console.log(err)
        }
    }
}

export {
    checkRating,
    rateMovie
}