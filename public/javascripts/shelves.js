const renderStatus = async (event, value) => {
    if (!value) return;
    const movieId = parseInt(event.target.id);
    const status = value;
    const body = { movieId, status };
    if (document.getElementById('exists')) {
        try {
            const res = await fetch('/shelves', {
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
            const res = await fetch('/shelves', {
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
