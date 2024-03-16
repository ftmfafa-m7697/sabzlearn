import { getToken, showSwal } from "../../funcs/utils.js";

const phoneInputElem = document.querySelector("#phone");
const nameInputElem = document.querySelector("#name");
const usernameInputElem = document.querySelector("#username");
const emailInputElem = document.querySelector("#email");
const passwordInputElem = document.querySelector("#password");

const getAndShowUserInfosInEditPage = async () => {

  const res = await fetch(`http://localhost:4000/v1/auth/me`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  const user = await res.json();

  phoneInputElem.value = user.phone;
  nameInputElem.value = user.name;
  usernameInputElem.value = user.username;
  emailInputElem.value = user.email;
};

const updateUser = async () => {

  const userNewInfos = {
    name: nameInputElem.value.trim(),
    username: usernameInputElem.value.trim(),
    email: emailInputElem.value.trim(),
    phone: phoneInputElem.value.trim(),
    password: passwordInputElem.value.trim(),
  };

  const res = await fetch(`http://localhost:4000/v1/users/`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userNewInfos),
  });

  if (res.ok) {
    showSwal(
      "اطلاعات شما با موفقیت آپدیت شد",
      "success",
      "خیلی هم عالی",
      () => {
        location.href = "../account/index.html";
      }
    );
  }
};

export { getAndShowUserInfosInEditPage, updateUser };
