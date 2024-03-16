import {
    createDiscountCode,
    getAndShowAllDiscountsCodes,
    prepareCreateNewDiscountCodeForm,
    removeDiscount,
} from "./funcs/discounts.js";

window.removeDiscount = removeDiscount;

window.addEventListener("load", () => {
    const createDiscountBtnElem = document.querySelector("#create-discount");

    getAndShowAllDiscountsCodes();
    prepareCreateNewDiscountCodeForm();

    createDiscountBtnElem.addEventListener("click", (event) => {
        event.preventDefault();
        createDiscountCode();
    });
});
