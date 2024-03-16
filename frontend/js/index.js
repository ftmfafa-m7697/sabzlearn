import {
    getAndShowAllCourses,
    getAndShowArticles,
    getAndShowNavbarMenus,
    getAndShowPopularCourses,
    getAndShowPresellCourses,
    globalSearch
} from "./funcs/shared.js";

const $ = document;
const landingTitle = $.querySelector('.landing__title');
const landingStatusCount = $.querySelector('#courses-count');
const landingMinutesCount = $.querySelector('#minutes-counter');
const landingUserCount = $.querySelector('#users-counter');
const globalSearchBtn = $.querySelector('#search-btn');
const globalSearchInput = $.querySelector('#search-input');



makeCounter(40, landingStatusCount)
makeCounter(3_320, landingMinutesCount)
makeCounter(3_071, landingUserCount)

function makeCounter(max, elem) {
    let Counter = 0;
    const interval = setInterval(() => {
        if (Counter === max) {
            clearInterval(interval)
        }
        elem.innerHTML = Counter;
        Counter++
    }, 1)
}

// ========================

window.addEventListener('load', () => {
    let landingText = " با آکادمی سبزلرن، برنامه نویسی رو با خیال راحت یاد بگیر و پیشرفت کن."
    let typeIndex = 0;
    typeWriter(landingText, typeIndex);
    getAndShowAllCourses();
    getAndShowPopularCourses();
    getAndShowPresellCourses();
    getAndShowArticles();
    getAndShowNavbarMenus();

})

// global search

globalSearchBtn.addEventListener("click", () => {
    location.href = `search.html?value=${globalSearchInput.value.trim()}`;
    globalSearchInput.value = '';
})


function typeWriter(text, index) {
    if (index < text.length) {
        landingTitle.innerHTML += text[index]
        index++
    }
    setTimeout(() => {
        typeWriter(text, index)
    }, 100)
}

