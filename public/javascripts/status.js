
import { checkStatus, renderStatus } from './shelves.js'

document.addEventListener('DOMContentLoaded', async () => {
    checkStatus()
    document.getElementsByClassName('status')[0].childNodes.forEach(child => {
        child.addEventListener('click', renderStatus)
    })
})