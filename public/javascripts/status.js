
import { renderStatus } from "./shelves.js";

document.addEventListener('DOMContentLoaded', async () => {
    const options = document.getElementsByClassName('status')[0];
    options.addEventListener('change', function(event) {
        renderStatus(event, options.options[options.selectedIndex].value)
    })
})
