import {coursesSorting, getAndShowCategoryCourses, insertCourseBoxHtmlTemplate} from "./funcs/shared.js";
import {addParamToUrl, getUrlParam, paginateItems, searchInArray} from "./funcs/utils.js";

window.addParamToUrl = addParamToUrl


window.addEventListener('load', () => {

    getAndShowCategoryCourses().then(responseCourses => {
        // console.log(responseCourses)
        const categoryCoursesWrapper = document.querySelector("#courses-wrapper");
        const coursesShowTypeIcons = document.querySelectorAll('.courses-top-bar__icon-parent')
        const coursesFilteringSelection = document.querySelectorAll('.courses-top-bar__selection-item')
        const selectionTitleElem = document.querySelector('.courses-top-bar__selection__title')
        const coursesSearchInput = document.querySelector('.courses-top-bar__input')

        let courses = [...responseCourses]
        let coursesShowType = 'row'

        // show category row type
        if (courses.length) {
            insertCourseBoxHtmlTemplate(courses, coursesShowType, categoryCoursesWrapper)
        } else {
            categoryCoursesWrapper.insertAdjacentHTML('beforeend', `
      <div class="alert alert-danger">هیچ دوره‌ای برای این دسته بندی وجود ندارد :/</div>
    `)
        }
        // show category row type user selected
        coursesShowTypeIcons.forEach(coursesShowTypeIcon => {
            coursesShowTypeIcon.addEventListener('click', event => {
                coursesShowTypeIcons.forEach(icon => icon.classList.remove('courses-top-bar__icon--active'))
                event.target.classList.add('courses-top-bar__icon--active');

                if (String(event.target.classList).includes('row')) {
                    coursesShowType = 'row';
                    insertCourseBoxHtmlTemplate(courses, coursesShowType, categoryCoursesWrapper)
                } else {
                    coursesShowType = 'column';
                    insertCourseBoxHtmlTemplate(courses, coursesShowType, categoryCoursesWrapper)
                }

            })
        })
        // show category row type user selected filtering
        coursesFilteringSelection.forEach(courseFilteringSelection => {
            courseFilteringSelection.addEventListener('click', event => {
                coursesFilteringSelection.forEach(selection => selection.classList.remove('courses-top-bar__selection-item--active')
                )
                event.target.classList.add('courses-top-bar__selection-item--active')
                selectionTitleElem.innerHTML = '';
                selectionTitleElem.insertAdjacentHTML('beforeend', `
                ${event.target.innerHTML} 
                 <i class="fas fa-angle-down courses-top-bar__selection-icon"></i> `
                )
                let userFilteringSelection = event.target.dataset.key

                let shownCourses = coursesSorting([...courses], userFilteringSelection)
                // console.log(courses)
                insertCourseBoxHtmlTemplate(shownCourses, coursesShowType, categoryCoursesWrapper)

            })
        })
        // search in courses
        coursesSearchInput.addEventListener('input', event => {
            let valueSearchInput = event.target.value;
            const shownCourses = searchInArray([...responseCourses], 'name', valueSearchInput)
            // console.log(shownCourses)
            if (shownCourses.length) {
                insertCourseBoxHtmlTemplate(shownCourses, coursesShowType, categoryCoursesWrapper)
            } else {
                categoryCoursesWrapper.innerHTML = '';
                categoryCoursesWrapper.insertAdjacentHTML('beforeend', `
                    <div class="alert alert-danger">هیچ دوره‌ای در نتیجه این جستجو وجود ندارد :/</div>
                     `)
            }
        })

        // Handle Pagination
        const coursesPaginationWrapper = document.querySelector(".courses__pagination-list");
        const currentPage = getUrlParam("page");
        const shownCourses = paginateItems([...responseCourses], 3, coursesPaginationWrapper, currentPage);
        insertCourseBoxHtmlTemplate([...shownCourses], coursesShowType, categoryCoursesWrapper);
    })


})