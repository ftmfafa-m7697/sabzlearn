import { logout } from "./funcs/shared.js";
import { showSwal } from "../funcs/utils.js";

window.addEventListener("load", () => {
  const logoutUserBtn = document.querySelector("#logout-user");

  logoutUserBtn.addEventListener("click", (event) => {
    event.preventDefault();

    showSwal(
      "آیا از Logout اطمینان دارید؟",
      "success",
      ["نه", "آره"],
      (result) => {
        if (result) {
          showSwal("با موفقیت خارج شدید", "success", "صفحه اصلی سایت", () => {
            logout();
            location.href = "../../index.html";
          });
        }
      }
    );


  });
});
