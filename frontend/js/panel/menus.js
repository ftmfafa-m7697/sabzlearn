import {getAndShowAllMenus , prepareCreateMenuForm , createNewMenu , removeMenu} from "./funcs/menus.js"

window.removeMenu = removeMenu


window.addEventListener('load', () => {
    const createMenuBtnElem = document.querySelector('#create-menu-btn')

    getAndShowAllMenus()
    prepareCreateMenuForm()

    createMenuBtnElem.addEventListener('click' , event=> {
        event.preventDefault()
        createNewMenu()
    })

})