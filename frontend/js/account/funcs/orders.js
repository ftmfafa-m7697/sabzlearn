import {getToken} from "../../funcs/utils.js";

const getAndShowUserOrders = async () => {
    const ordersListWrapper = document.querySelector(".order__table-body");
    ordersListWrapper.innerHTML = "";

    const res = await fetch("http://localhost:4000/v1/orders", {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
    const orders = await res.json();
    console.log(orders)
    if (orders.length) {
        orders.forEach((order, index) => {
            ordersListWrapper.insertAdjacentHTML("beforeend", `
                <tr class="order__table-body-list">
                    <td class="order__table-body-item">${index + 1}</td>
                    <td class="order__table-body-item">${order.createdAt.slice(0, 10)}</td>
                    <td class="order__table-body-item">${order.price}</td>
                    <td class="order__table-body-item">
                        <a class="order__table-body-btn" href="#">"جزئیات"</a>
                    </td>
                </tr>
            `);
        });
    } else {
        ordersListWrapper.insertAdjacentHTML('beforeend', `
        <div class="alert alert-danger m-5 text-center">سفارشی ثبت نکردید</div>
        `)
    }
};

export {getAndShowUserOrders};
