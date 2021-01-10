import{getFeed, addEventUnfollow} from './utils.js'


document.addEventListener('DOMContentLoaded', async () => {
    await getFeed()
    addEventUnfollow()

})