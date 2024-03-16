import {getToken} from "../../funcs/utils.js";

const insertNotificationHtmlTemplate = (notifications) => {
    const notificationModaListElem = document.querySelector(".home-notification-modal-list");
    notificationModaListElem.innerHTML ='';
    if (notifications.length) {
        notifications.forEach(notification => {
            notificationModaListElem.insertAdjacentHTML('beforeend', `
                   <li class="home-notification-modal-item" xmlns="http://www.w3.org/1999/html">
                        <span class="home-notification-modal-text">${notification.msg}</span>
                        <button class="btn btn-success" onclick='seenNotification(${JSON.stringify(notifications)},${JSON.stringify(notification._id)})'>see</button>
                   </li> 
            `)
        })
    } else {
        notificationModaListElem.insertAdjacentHTML('beforeend', `
            <span class="alert alert-danger text-center">هیچ نوتیفیکیشنی وجود ندارد</span>
        `)
    }

}

const seenNotification = async (notifications,notificationID) => {
    const res = await fetch(`http://localhost:4000/v1/notifications/see/${notificationID}`,
        {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        }
    )

    removeNotification(notifications, notificationID)

    const result = await res.json();

}

const removeNotification = (notifications, notificationID) => {
    const filteredNotifications = notifications.filter(notification => notification._id !== notificationID)

    insertNotificationHtmlTemplate(filteredNotifications)
}

export {insertNotificationHtmlTemplate, seenNotification}