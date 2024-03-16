import {getToken, showSwal} from "../../funcs/utils.js";

let departmentID = "-1";
let subDepartmentID = "-1";
let ticketPriority = "2";
let ticketCourse = undefined;

const prepareSendTicketForm = async () => {
    const ticketsDepartmentsWrapper = document.querySelector("#departments");
    const ticketsSubDepartmentsWrapper = document.querySelector("#sub-department");
    const ticketPriorityWrapper = document.querySelector("#ticket-priority");
    const ticketCourseParentElem = document.querySelector("#ticket-course-parent");
    const ticketCourseSelectBoxElem = document.querySelector("#ticket-course");

    const res = await fetch(`http://localhost:4000/v1/tickets/departments`);
    const departments = await res.json();

    departments.forEach((department) => {
        ticketsDepartmentsWrapper.insertAdjacentHTML("beforeend", `
            <option value="${department._id}" class="ticket-form__option">${department.title}</option>
        `);
    });

    ticketsDepartmentsWrapper.addEventListener("change", (event) => {
        departmentID = event.target.value;

        fetch(`http://localhost:4000/v1/tickets/departments-subs/${event.target.value}`)
            .then((res) => res.json())
            .then((subDepartment) => {
                ticketsSubDepartmentsWrapper.innerHTML = "";

                ticketsSubDepartmentsWrapper.insertAdjacentHTML("beforeend", `
                   <option value="-1" class="ticket-form__option">لطفا نوع تیکت را انتخاب کنید</option>
               `);

                subDepartment.forEach((subDepartment) => {
                    ticketsSubDepartmentsWrapper.insertAdjacentHTML("beforeend", `
                        <option value="${subDepartment._id}" class="ticket-form__option">${subDepartment.title}</option>
                    `);
                });

            });
    });

    const userCoursesRes = await fetch(`http://localhost:4000/v1/users/courses/`, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        }
    );
    const userCourses = await userCoursesRes.json();


    userCourses.forEach((userCourse) => {
        ticketCourseSelectBoxElem.insertAdjacentHTML("beforeend", `
            <option value="${userCourse.course._id}" class="ticket-form__option">${userCourse.course.name}</option>
        `);
    });

    ticketsSubDepartmentsWrapper.addEventListener("change", (event) => {
        subDepartmentID = event.target.value;
        if (event.target.value === "63b688c5516a30a651e98156") {
            ticketCourseParentElem.classList.remove("d-none");
        } else {
            ticketCourseParentElem.classList.add("d-none");
        }
    });

    ticketPriorityWrapper.addEventListener("change",
        (event) => (ticketPriority = event.target.value)
    );

    ticketCourseSelectBoxElem.addEventListener("change",
        (event) => (ticketCourse = event.target.value)
    );

};

const sendTicket = async () => {
    const ticketTitleInput = document.querySelector("#ticket-title");
    const ticketBodyInput = document.querySelector("#titket-body");

    const newTicketInfos = {
        departmentID,
        departmentSubID: subDepartmentID,
        title: ticketTitleInput.value.trim(),
        priority: ticketPriority,
        body: ticketBodyInput.value.trim(),
        course: ticketCourse
    };

    const res = await fetch(`http://localhost:4000/v1/tickets`, {
        method: "POST",
        headers: {
            "Content-Type": `application/json`,
            Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(newTicketInfos),
    });

    console.log(res);
    if (res.ok) {
        showSwal("تیکت جدید با موفقیت ارسال شد", "success", "نمایش تیکت‌ها", () => {
            location.href = "../Tickets/index.html";
        });
    }
};

export {prepareSendTicketForm, sendTicket};
