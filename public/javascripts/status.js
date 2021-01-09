
// import { checkStatus, renderStatus } from './shelves.js'

import { renderStatus } from "./shelves.js";

document.addEventListener('DOMContentLoaded', async () => {
    // checkStatus()
    // document.getElementsByClassName('status')[0].addEventListener('change', (event) => {
    //         console.log(event.target.value)
    //     })
    const options = document.getElementsByClassName('status')[0];
    options.addEventListener('change', function(event) {
        renderStatus(event, options.options[options.selectedIndex].value)
    }

    )
})
