import { updateUser } from "./funcs/users.js";

window.addEventListener('load', () => {
    const updateUserBtn = document.querySelector('#update-btn')

    updateUserBtn.addEventListener('click', event => {
        event.preventDefault()
        updateUser()
    })
})