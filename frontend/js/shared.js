import {showUserNameInNavbar, renderTopbarMenus,createNewNewsLetter } from "./funcs/shared.js";

window.addEventListener('load', () => {
    showUserNameInNavbar()
    renderTopbarMenus()

    const newsLetterSubmitBtn = document.querySelector('#news-letter-submit-btn')

    newsLetterSubmitBtn.addEventListener('click', event => {
        event.preventDefault();
        createNewNewsLetter();
    })
})