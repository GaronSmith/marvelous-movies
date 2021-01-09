// const checkStatus = async (event) => {
//     const statuses = document.getElementsByTagName('option');
//     Array.from(statuses).forEach(async status => {
//         const movieId = movie.id
//         const res = await fetch(`http://localhost:8080/shelves/${event.target.id}`);

//         const { status } = await res.json();
//         if (status) {

//         }
//     })
// }

const renderStatus = async (event, value) => {
    const movieId = parseInt(event.target.id);
    const status = value;
    const body = { movieId, status };
    if (document.getElementById('exists')) {
        try {
            const res = await fetch(`http://localhost:8080/shelves`, {
                method: "PUT",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            // checkStatus()
        } catch (err) {
            console.log(err)
        }
    } else {
        try {
            const res = await fetch(`http://localhost:8080/shelves`, {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            // checkStatus()
        } catch (err) {
            console.log(err)
        }
    }
}
export {
    // checkStatus,
    renderStatus
}