import {filterCourses, getUserCourses, insertCourseBoxHtmlTemplate} from "./funcs/courses.js";

window.addEventListener("load", () => {
    getUserCourses().then((courses) => {
        const coursesWrapperElem = document.querySelector("#courses-wrapper");
        const coursesFilterLinks = document.querySelectorAll(".course-filter-link");

        if (courses.length) {
            insertCourseBoxHtmlTemplate([...courses], coursesWrapperElem)
        } else {
            coursesWrapperElem.insertAdjacentHTML("beforeend", `
            <div class="alert alert-danger">شما تا الان در هیچ دوره‌ای ثبت نام نکردید</div>
        `);
        }

        // Handle Filtering

        coursesFilterLinks.forEach((filterLink) => {
            filterLink.addEventListener("click", (event) => {
                event.preventDefault();

                coursesFilterLinks.forEach((filterLink) =>
                    filterLink.classList.remove("courses-header__link-active")
                );
                event.target.classList.add("courses-header__link-active");

                let filterMethod = event.target.dataset.filter;
                let filteredCourses = filterCourses([...courses], filterMethod);

                if (filteredCourses.length) {
                    insertCourseBoxHtmlTemplate(filteredCourses, coursesWrapperElem);
                } else {
                    coursesWrapperElem.innerHTML = ''
                    coursesWrapperElem.insertAdjacentHTML('beforeend', `
                      <div class="alert alert-danger">دوره‌ای برای این فیلتر وجود ندارد</div>
                   `)
                }

            });
        });
    });
});