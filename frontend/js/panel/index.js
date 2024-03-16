import {getAdminInfos, logout} from "./funcs/utils.js";
import {insertNotificationHtmlTemplate , seenNotification} from "./funcs/notifications.js";
import {showSwal} from "../funcs/utils.js";

window.seenNotification = seenNotification

const $ = document

window.addEventListener('load', () => {
    const adminWelcomeNameElem = $.querySelector('#admin-welcome-name')
    const adminNameElem = $.querySelector('#admin-name')
    const notificationsIconElem = $.querySelector("#notifications-icon");
    const notificationsBoxElem = $.querySelector(".home-notification-modal");
    // const adminPic = $.querySelector('.home-profile-image a img')
    const logoutBtnElem = $.querySelector('#logout-btn')
    // console.log(adminPic)


    getAdminInfos().then(admin => {
        console.log(admin);

        if (admin.role === "ADMIN") {
            // show admin name in cms homepage
            adminNameElem.innerHTML = admin.name
            adminWelcomeNameElem.innerHTML = admin.name
            // adminPic.setAttribute('src' , admin.profile) set profile
        } else {
            // protact admin routes
            location.replace("../../login.html")
        }

        notificationsIconElem.addEventListener("mouseenter", () => {
            notificationsBoxElem.classList.add("active-modal-notfication");
        });

        notificationsBoxElem.addEventListener("mouseleave", () => {
            notificationsBoxElem.classList.remove("active-modal-notfication");
        });

        insertNotificationHtmlTemplate(admin.notifications)


    })

    logoutBtnElem.addEventListener("click", event => {
        event.preventDefault()

        showSwal(
            "آیا از Logout اطمینان دارید؟",
            "success",
            ["نه", "آره"],
            (result) => {
                if (result) {
                    showSwal(
                        "با موفقیت خارج شدید",
                        "success",
                        "صفحه اصلی سایت",
                        () => {
                            logout()
                            location.href = '../../index.html'
                        }
                    )
                }
            }
        );


    })


})