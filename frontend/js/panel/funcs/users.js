import {getToken, showSwal} from "../../funcs/utils.js";

const getAndShowAllUsers = async () => {
    const usersListTableElem = document.querySelector(".table tbody");
    usersListTableElem.innerHTML = "";

    const res = await fetch(`http://localhost:4000/v1/users`, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });

    const users = await res.json();

    users.forEach((user, index) => {
        usersListTableElem.insertAdjacentHTML("beforeend", `
            <tr>
                <td>${index + 1}</td>
                <td>${user.name}</td>
                <td>${user.username}</td>
                <td>${user.phone}</td>
                <td>${user.email}</td>
                <td>${user.role === "ADMIN" ? "مدیر" : "کاربر عادی"}</td>
                <td>
                    <button type='button' class='btn btn-primary edit-btn'>ویرایش</button>
                </td>
                <td>
                    <button type='button' onclick="changeRole('${user._id}')" class='btn btn-primary edit-btn'>تغییر نقش</button>
                </td>
                <td>
                    <button type='button' onclick="removeUser('${user._id}')" class='btn btn-danger delete-btn'>حذف</button>
                </td>
                <td>
                    <button type='button' onclick="banUser('${user._id}')" class='btn btn-danger delete-btn'>بن</button>
                </td>
            </tr>
        `);
    });
};

const removeUser = async (userID) => {
    showSwal(
        "آیا از حذف کاربر اطمینان دارید؟",
        "warning",
        ["نه", "آره"],
        async (result) => {
            if (result) {
                const res = await fetch(`http://localhost:4000/v1/users/${userID}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                    },
                });
                if (res.ok) {
                    showSwal(
                        "کاربر مورد نظر با موفقیت حذف شد",
                        "success",
                        "خیلی هم عالی",
                        () => {
                            getAndShowAllUsers();
                        }
                    );
                }
            }
        }
    );
};

const banUser = async (userID) => {
    showSwal(
        "آیا از بن کاربر اطمینان دارید؟",
        "error",
        ["نه", "آره"],
        async (result) => {
            if (result) {
                const res = await fetch(
                    `http://localhost:4000/v1/users/ban/${userID}`,
                    {
                        method: "PUT",
                        headers: {
                            Authorization: `Bearer ${getToken()}`,
                        },
                    }
                );
                console.log(res);
                if (res.ok) {
                    showSwal(
                        "کاربر مورد نظر با موفقیت بن شد",
                        "success",
                        "خیلی هم عالی",
                        () => {
                        }
                    );
                }
            }
        }
    );
};

const changeRole = async (userID) => {
    showSwal(
        "آیا از تغییر نقش اطمینان دارید؟",
        "warning",
        ["نه", "آره"],
        async (result) => {
            if (result) {
                swal({
                    title: "نقش جدید را وارد نمایید:",
                    content: "input",
                    button: "تغییر نقش",
                }).then((newRole) => {
                    const userNewRoleInfos = {
                        role: newRole,
                        id: userID,
                    };

                    fetch(`http://localhost:4000/v1/users/role`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${getToken()}`,
                        },
                        body: JSON.stringify(userNewRoleInfos),
                    }).then((res) => {
                        if (res.ok) {
                            showSwal(
                                "نقش کاربر مورد نظر با موفقیت تغییر یافت",
                                "success",
                                "خیلی هم عالی",
                                () => {
                                    getAndShowAllUsers();
                                }
                            );
                        }
                    });
                });
            }
        }
    );
};

const createNewUser = async () => {
    const nameInput = document.querySelector("#name");
    const usernameInput = document.querySelector("#username");
    const emailInput = document.querySelector("#email");
    const phoneInput = document.querySelector("#phone");
    const passwordInput = document.querySelector("#password");

    const newUserInfos = {
        name: nameInput.value.trim(),
        username: usernameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim(),
        password: passwordInput.value.trim(),
        confirmPassword: passwordInput.value.trim(),
    };

    const res = await fetch(`http://localhost:4000/v1/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserInfos),
    })
    // .then((res) => {
    if (res.status === 201) {
        showSwal(
            "کاربر جدید با موفقیت ایجاد شد",
            "success",
            "خیلی هم عالی",
            (result) => {
                getAndShowAllUsers();
            }
        );
    } else if (res.status === 409) {
        showSwal(
            "نام کاربری یا ایمیل قبلا استفاده شده",
            "error",
            "تصحیح اطلاعات",
            () => {
            }
        );
    } else if (res.status === 403) {
        showSwal(
            "متاسفانه این شماره تماس بن شده",
            "error",
            "تصحیح اطلاعات",
            () => {
            }
        );
    }
    nameInput.value= "";
    usernameInput.value= "";
    emailInput.value= "";
    phoneInput.value= "";
    passwordInput.value= "";

    console.log(res);
    return res.json();
    // });  change code
};

const updateUser = async () => {
    const nameInputElem = document.querySelector("#name");
    const usernameInputElem = document.querySelector("#username");
    const emailInputElem = document.querySelector("#email");
    const phoneInputElem = document.querySelector("#phone");
    const passwordInputElem = document.querySelector("#password");

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
                location.href = "../main/index.html";
            }
        );
    }

};

export {getAndShowAllUsers, removeUser, banUser, createNewUser, changeRole, updateUser};
