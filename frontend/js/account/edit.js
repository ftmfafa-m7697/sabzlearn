import { getAndShowUserInfosInEditPage, updateUser } from "./funcs/edit.js";

window.addEventListener('load', () => {

    const editInfoSubmitBtn = document.querySelector('#edit-info-btn')

    getAndShowUserInfosInEditPage()

    editInfoSubmitBtn.addEventListener('click', event => {
        event.preventDefault()
        updateUser()
    })

})