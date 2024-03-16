import { getToken, showSwal } from "../../funcs/utils.js";

let courseID = null;
let sessionVideo = null;
let isFree = 0;

const prepareCreateNewSessionForm = async () => {
    const coursesSelectElem = document.querySelector("#courses-select");
    const sessionVideoElem = document.querySelector("#video");
    const sessionFreeRadioBtn = document.querySelector("#free");
    const sessionNotFreeRadioBtn = document.querySelector("#not-free");

    const res = await fetch(`http://localhost:4000/v1/courses`);
    const courses = await res.json();

    courses.forEach((course) => {
        coursesSelectElem.insertAdjacentHTML("beforeend", `
            <option value='${course._id}'>${course.name}</option>
        `);
    });

    // Events
    coursesSelectElem.addEventListener("change",
        (event) => (courseID = event.target.value)
    );
    sessionVideoElem.addEventListener("change",
        (event) => (sessionVideo = event.target.files[0])
    );
    sessionFreeRadioBtn.addEventListener("change",
        (event) => (isFree = event.target.value)
    );
    sessionNotFreeRadioBtn.addEventListener("change",
        (event) => (isFree = event.target.value)
    );
};

const createSession = async () => {
    console.log(courseID);
    console.log(sessionVideo);
    console.log(isFree);

    const sessionTitleInputElem = document.querySelector("#title");
    const sessionTimeInputElem = document.querySelector("#time");

    const formData = new FormData();
    formData.append("title", sessionTitleInputElem.value.trim());
    formData.append("time", sessionTimeInputElem.value.trim());
    formData.append("video", sessionVideo);
    formData.append("free", isFree);

    const res = await fetch(`http://localhost:4000/v1/courses/${courseID}/sessions`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
            body: formData,
        }
    );

    const result = await res.json();

    if (res.ok) {
        showSwal(
            "جلسه مورد نظر با موفقیت ایجاد شد",
            "success",
            "خیلی هم عالی",
            () => {
                getAndShowAllSessions();
            }
        );
    }
    console.log(res);
    console.log(result);
};

const getAndShowAllSessions = async () => {
    const sessionsListElemWrapper = document.querySelector(".table tbody");
    sessionsListElemWrapper.innerHTML = "";

    const res = await fetch(`http://localhost:4000/v1/courses/sessions`);
    const sessions = await res.json();

    sessions.forEach((session, index) => {
        sessionsListElemWrapper.insertAdjacentHTML(
            "beforeend",
            `
            <tr>
                <td>${index + 1}</td>
                <td>${session.title}</td>
                <td>${session.time}</td>
                <td>${session.createdAt.slice(0, 10)}</td>
                <td>${session.course.name}</td>
                <td>
                    <button type='button' class='btn btn-primary edit-btn'>ویرایش</button>
                </td>
                <td>
                    <button type='button' onclick=removeSession('${session._id}') class='btn btn-danger delete-btn'>حذف</button>
                </td>
            </tr>
        `
        );
    });
};

const removeSession = async (sessionID) => {
    showSwal(
        "آیا از حذف جلسه اطمینان دارید؟",
        "warning",
        ["نه", "آره"],
        async (result) => {
            if (result) {
                const res = await fetch(`http://localhost:4000/v1/courses/sessions/${sessionID}`,
                    {
                        method: "DELETE",
                        headers: {
                            Authorization: `Bearer ${getToken()}`,
                        },
                    }
                );

                if (res.ok) {
                    showSwal(
                        "جلسه مورد نظر با موفقیت حذف شد",
                        "success",
                        "خیلی هم عالی",
                        () => {
                            getAndShowAllSessions();
                        }
                    );
                }
            }
        }
    );
};

export {
    getAndShowAllSessions,
    prepareCreateNewSessionForm,
    createSession,
    removeSession,
};
