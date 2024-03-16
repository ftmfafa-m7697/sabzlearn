import { getAndShowAllUsers, removeUser, banUser, createNewUser, changeRole } from "./funcs/users.js";

window.removeUser = removeUser;
window.banUser = banUser;
window.changeRole = changeRole;

window.addEventListener("load", () => {

    const createNewUserBtn = document.querySelector('#create-new-user')

    getAndShowAllUsers();

    createNewUserBtn.addEventListener('click', event => {
        event.preventDefault()
        createNewUser()
    })


});
