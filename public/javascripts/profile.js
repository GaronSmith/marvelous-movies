const checkIfFollowing = async (event) => {
    const res = await fetch(`http://localhost:8080/feed/follow/${event.target.id}`)
    const json = await res.json(res)
    console.log(json)
}

document.addEventListener('DOMContentLoaded', async () => {
   document.getElementsByClassName('follow-btn')[0].addEventListener('click', event => {
    //    event.preventDefault()
       checkIfFollowing(event)
    // console.log(event.target.id)
   })

})