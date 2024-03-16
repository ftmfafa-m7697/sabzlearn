import { getSessionDetail } from "./funcs/shared.js";

window.addEventListener('load', () => {
    getSessionDetail().then(data => { 
        console.log(data); 
    })
})