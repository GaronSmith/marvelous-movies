const updateShelfStatus = async (event) => {
    event.preventDefault();
        try {
            const res = await fetch(`http://localhost:8080/shelves/${event.target.id}`)
            const json = await res.json();
            console.log(json);
        } catch (err) {
            console.log(err);
        }
}

document.addEventListener('DOMContentLoaded', async() => {
    document.getElementById('want').addEventListener('click', updateShelfStatus(event))
})

Add event listener to each option
event.target.parentElement.id - 
event.target.value - 


// const updateShelfStatus = async (event, status) => {
//     event.preventDefault();    
//     if (status.value) {
//         const body = { status };
//         try {
//             const res = await fetch('http://localhost:8080/shelves/status', {
//                 method: 'POST',
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify(body),
//             })
//             const json = await res.json()
//             renderStatus(json)
//         } catch (err) {
//             console.log(err)
//         }
//     }
// }

// const renderStatus = async () => {

// }
