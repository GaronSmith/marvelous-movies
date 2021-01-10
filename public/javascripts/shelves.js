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
        } catch (err) {
            console.log(err)
        }
    }
}
export {
    renderStatus
}
