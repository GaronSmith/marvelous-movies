
import{checkRating,rateMovie} from './utils.js'

document.addEventListener('DOMContentLoaded', async () => {
    checkRating()
    document.getElementsByClassName('stars')[0].childNodes.forEach(child =>{
        child.addEventListener('click', rateMovie)
    })
})


