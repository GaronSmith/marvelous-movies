import {checkRating,rateMovie} from './utils.js'

const shelfStatus = async (status) => {
    if (!status) {
        const body = { status };
        try {
            const res = await fetch('http://localhost:8080/blockbustershelves/status', {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const json = await res.json()
            renderStatus(json)
        } catch (err) {
            console.log(err)
        }
    }
}


