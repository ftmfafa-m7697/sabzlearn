import {getAndShowRelatedCourses, getCourseDetail, submitComment} from "./funcs/shared.js";

window.addEventListener('load', () => {
    const submitCommentBtn = document.querySelector('.comments__respond-btn')

    getCourseDetail()
    getAndShowRelatedCourses()

    submitCommentBtn.addEventListener("click", () => {
        submitComment()
    })

})