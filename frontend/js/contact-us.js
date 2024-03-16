import {submitContactUsMsg} from "./funcs/shared.js"

window.addEventListener('load' , ()=> {

    const submitBtnElem = document.querySelector('#submit-btn')
    submitBtnElem.addEventListener('click' , event=> {
        event.preventDefault();
        submitContactUsMsg();
    })

})