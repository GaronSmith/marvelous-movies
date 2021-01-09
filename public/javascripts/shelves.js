const checkStatus = async (event) => {
    const statuses = document.getElementsByTagName('option');
    Array.from(statuses).forEach(async status => {
        const movieId = movie.id
        const res = await fetch(`http://localhost:8080/shelves/${event.target.id}`);

        const { status } = await res.json();
        if (status) {
                    
        }
    })
}

const renderStatus = async (event) => {
    const movieId = parseInt(event.target.parentElement.id);
    const status = parseInt(event.target.value);
    const body = { movieId, status };
    if (document.getElementById('want')) {
        try {
            const res = await fetch(`http://localhost:8080/shelves/${event.target.id}`, {
                method: "PUT",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            checkShelfStatus()
        } catch (err) {
            console.log(err)
        }
    } else {
        try {
            const res = await fetch(`http://localhost:8080/shelves/${event.target.id}`, {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            checkShelfStatus()
        } catch (err) {
            console.log(err)
        }
    }
}
export {
    checkStatus,
    renderStatus
}