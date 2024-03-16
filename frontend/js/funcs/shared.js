import {getMe} from "./auth.js";
import {getToken, getUrlParam, isLogin, showSwal} from "./utils.js";


const showUserNameInNavbar = () => {
    const navbarProfileBox = document.querySelector(".main-header__profile");
    const isUserLogin = isLogin();
    if (isUserLogin) {
        const userInfos = getMe().then(data => {

            navbarProfileBox.innerHTML = `<span class="main-header__profile-text">${data.name}</span>`

            // console.log(data)
            navbarProfileBox.addEventListener("click", (e) => {
                e.preventDefault()
                if (data.role === "ADMIN") {
                        location.href = `http://localhost:63342/sabzlearn%20me/frontend/panel/main/index.html`
                } else {
                    location.href = `http://localhost:63342/sabzlearn%20me/frontend/my-account/Account/index.html`
                }
            })

        })
    } else {
        navbarProfileBox.setAttribute("href", "login.html");
        navbarProfileBox.innerHTML = '<span class="main-header__profile-text">ثبت نام / ورود</span> ';
    }
}

const renderTopbarMenus = async () => {
    const topBarList = document.querySelector(".top-bar__menu");
    const res = await fetch(`http://localhost:4000/v1/menus/topbar`);
    const topbarMenus = await res.json();
    topBarList.innerHTML = " ";

    const shuffledArray = topbarMenus.sort((a, b) => 0.5 - Math.random());
    shuffledArray.splice(0, 6).map((menu) => {
        topBarList.innerHTML += `<li class="top-bar__item">
      <a href="#" class="top-bar__link">${menu.title}</a> </li>`;
    })
    // رندوم کردن ایتم ها و انتخای 6 تای انها بصورت تصادفی


    //     [...topbarMenus].splice(0, 6).map((menu) => {
    //     topBarList.innerHTML += `<li class="top-bar__item">
    //   <a href="#" class="top-bar__link">${menu.title}</a> </li>`;
    // })
    // انتخاب 6 ایتم اول برای منو


    // console.log(topbarMenus)
}

const getAndShowAllCourses = async () => {
    const coursesContainer = document.querySelector("#courses-container");

    const res = await fetch(`http://localhost:4000/v1/courses`);
    const courses = await res.json();
    // console.log(courses)
    courses.slice(0, 6).map((course) => {
        coursesContainer.insertAdjacentHTML('beforeend', `
            <div class="col-4">
                <div class="course-box">
                    <a href="course.html?name=${course.shortName}">
                        <img src=http://localhost:4000/courses/covers/${course.cover} alt="course img" class="course-box__img">
                    </a>
                    <div class="course-box__main">
                        <a href="course.html?name=${course.shortName}" class="course-box__title">${course.name}</a>

                        <div class="course-box__rating-teacher">
                            <div class="course-box__teacher">
                                <i class="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
                                <a href="#" class="course-box__teacher-link">${course.creator}</a>
                            </div>
                                    
                            <div class="course-box__rating">
                            ${Array(5 - course.courseAverageScore).fill(0).map((score) => '<img src="images/svgs/star.svg" alt="rating" class="course-box__star">').join('')}
                            ${Array(course.courseAverageScore).fill(0).map((score) => '<img src="./images/svgs/star_fill.svg" alt="rating" class="course-box__star">').join('')}
                            </div>           
                        </div>
                                
                        <div class="course-box__status">
                            <div class="course-box__users">
                                <i class="fas fa-users course-box__users-icon"></i>
                                <span class="course-box__users-text">${course.registers}</span>
                            </div>
                           <span class="course-box__price">
                              ${course.price === 0 ? "رایگان" : (course.price !== 0 && course.discount) && `
                                 <span class="courses-box__price-discount">
                                   ${(course.price - (course.price * course.discount / 100)).toLocaleString()}
                                 </span>
                                 <span class="courses-box__price courses-box__undiscount">
                                   ${course.price.toLocaleString()}
                                 </span>
                             `}
                           </span>
                        </div>
                    </div>
                    <div class="course-box__footer">
                        <a href="" class="course-box__footer-link">
                                    مشاهده اطلاعات
                            <i class="fas fa-arrow-left course-box__footer-icon"></i>
                        </a>
                    </div>
                     ${course.discount ? `<span class="courses-box__discount">${course.discount}%</span>` : ``}
                </div>
            </div>
        `)
    })
    return courses;
}

const getAndShowPopularCourses = async () => {
    const popularCoursesWrapper = document.querySelector("#popular-courses-wrapper");

    const res = await fetch(`http://localhost:4000/v1/courses/popular`);
    const popularCourses = await res.json();

    popularCourses.forEach((course) => {
        popularCoursesWrapper.insertAdjacentHTML("beforeend", `<div class="swiper-slide">
    <div class="course-box">
      <a href="#">
        <img src=http://localhost:4000/courses/covers/${course.cover} alt="Course img" class="course-box__img"/>
      </a>
      <div class="course-box__main">
        <a href="#" class="course-box__title">${course.name}</a>

        <div class="course-box__rating-teacher">
          <div class="course-box__teacher">
            <i class="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
            <a href="#" class="course-box__teacher-link">${course.creator}</a>
          </div>
          <div class="course-box__rating">
           ${Array(5 - course.courseAverageScore).fill(0).map((score) =>
            '<img src="images/svgs/star.svg" alt="rating" class="course-box__star">').join('')}
             ${Array(course.courseAverageScore).fill(0).map((score) =>
            ' <img src="./images/svgs/star_fill.svg" alt="rating" class="course-box__star">').join('')}
          </div>
        </div>

        <div class="course-box__status">
          <div class="course-box__users">
            <i class="fas fa-users course-box__users-icon"></i>
            <span class="course-box__users-text">${course.registers}</span>
          </div>

          <div class="courses-box__price">
            <span class="course-box__price">${course.price === 0 ? "رایگان" : course.price.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div class="course-box__footer">
        <a href="#" class="course-box__footer-link">
          مشاهده اطلاعات
          <i class="fas fa-arrow-left course-box__footer-icon"></i>
        </a>
      </div>
    </div>
  </div> `);
    });
    return popularCourses;
};

const getAndShowPresellCourses = async () => {
    const presellCoursesWrapper = document.querySelector("#presell-courses-wrapper");

    const res = await fetch(`http://localhost:4000/v1/courses/presell`);
    const presellCourses = await res.json();

    presellCourses.forEach((course) => {
        presellCoursesWrapper.insertAdjacentHTML("beforeend", `<div class="swiper-slide">
    <div class="course-box">
      <a href="#">
        <img src=http://localhost:4000/courses/covers/${course.cover} alt="Course img" class="course-box__img" />
      </a>
      <div class="course-box__main">
        <a href="#" class="course-box__title">${course.name}</a>

        <div class="course-box__rating-teacher">
          <div class="course-box__teacher">
            <i class="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
            <a href="#" class="course-box__teacher-link">${course.creator}</a>
          </div>
          <div class="course-box__rating">
          ${Array(5 - course.courseAverageScore).fill(0)
            .map((score) =>
                '<img src="images/svgs/star.svg" alt="rating" class="course-box__star">').join("")}
          ${Array(course.courseAverageScore).fill(0)
            .map((score) =>
                '<img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">').join("")}
          </div>
        </div>

        <div class="course-box__status">
          <div class="course-box__users">
            <i class="fas fa-users course-box__users-icon"></i>
            <span class="course-box__users-text">${course.registers}</span>
          </div>
          <span class="course-box__price">${course.price === 0 ? "رایگان" : course.price.toLocaleString()}</span>
        </div>
      </div>

      <div class="course-box__footer">
        <a href="#" class="course-box__footer-link">
          مشاهده اطلاعات
          <i class="fas fa-arrow-left course-box__footer-icon"></i>
        </a>
      </div>

    </div>
  </div>`);
    });
    return presellCourses;
};

const getAndShowArticles = async () => {
    const articlesWrapper = document.querySelector("#articles-wrapper");

    const res = await fetch(`http://localhost:4000/v1/articles`);
    const articles = await res.json();

    articles.slice(0, 3).forEach((article) => {
        articlesWrapper.insertAdjacentHTML("beforeend", `
    <div class="col-4">
    <div class="article-card">
      <div class="article-card__header">
        <a href="#" class="article-card__link-img">
          <img src=http://localhost:4000/courses/covers/${article.cover} class="article-card__img" alt="Article Cover" />
        </a>
      </div>
      <div class="article-card__content">
        <a href="#" class="article-card__link">
          ${article.title}
        </a>
        <p class="article-card__text">
        ${article.description}
        </p>
        <a href="#" class="article-card__btn">بیشتر بخوانید</a>
      </div>
    </div>
  </div>`);
    });

    return articles;
};

const getAndShowNavbarMenus = async () => {
    const manusWrapper = document.querySelector("#manus-wrapper")
    const res = await fetch(`http://localhost:4000/v1/menus`);
    const menus = await res.json();

    menus.forEach((menu) => {
        // console.log(menu)
        manusWrapper.insertAdjacentHTML('beforeend', `
          <li class="main-header__item">
          <a href=category.html?cat=${menu.href}&page=1 class="main-header__link">${menu.title}
            ${menu.submenus.length !== 0 ? `<i class="fas fa-angle-down main-header__link-icon"></i>
              <ul class="main-header__dropdown"> ${menu.submenus.map((submenu) =>
            ` <li class="main-header__dropdown-item">
                    <a href="" class="main-header__dropdown-link">${submenu.title}</a>
                  </li>`).join('')
        }
               </ul>` : " "}
            </a></li>`);
    });
    return menus;
}

const getAndShowCategoryCourses = async () => {
    const categoryName = getUrlParam("cat");
    // console.log(categoryName)
    const res = await fetch(`http://localhost:4000/v1/courses/category/${categoryName}`)
    const courses = await res.json();
    // console.log(courses)
    return courses;
};

const insertCourseBoxHtmlTemplate = (courses, showType, parentElement) => {
    // console.log(courses, showType, parentElement)
    parentElement.innerHTML = ' ';
    if (showType === 'row') {
        courses.forEach((course) => {
            parentElement.insertAdjacentHTML("beforeend", `
      <div class="col-4">
      <div class="course-box">
        <a href="#">
          <img src="images/courses/js_project.png" alt="Course img" class="course-box__img" />
        </a>
        <div class="course-box__main">
          <a href="#" class="course-box__title">${course.name}</a>
  
          <div class="course-box__rating-teacher">
            <div class="course-box__teacher">
              <i class="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
              <a href="#" class="course-box__teacher-link">${course.creator}</a>
            </div>
            <div class="course-box__rating">
              ${Array(5 - course.courseAverageScore)
                .fill(0)
                .map((score) => '<img src="images/svgs/star.svg" alt="rating" class="course-box__star">')
                .join("")}
              ${Array(course.courseAverageScore)
                .fill(0)
                .map((score) => '<img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">')
                .join("")}
            </div>
          </div>
  
          <div class="course-box__status">
            <div class="course-box__users">
              <i class="fas fa-users course-box__users-icon"></i>
              <span class="course-box__users-text">${course.registers}</span>
            </div>
            <span class="course-box__price">${course.price === 0 ? "رایگان" : course.price.toLocaleString()}</span>
          </div>
        </div>
  
        <div class="course-box__footer">
          <a href="#" class="course-box__footer-link">
            مشاهده اطلاعات
            <i class="fas fa-arrow-left course-box__footer-icon"></i>
          </a>
        </div>
  
      </div>
    </div>
      `);
        });
    } else {
        courses.forEach((course) => {
            parentElement.insertAdjacentHTML("beforeend", `
      <div class="col-12">
      <div class="course-box d-flex">
        <a href="#">
          <img src="images/courses/js_project.png" alt="Course img" class="course-box__img" />
        </a>
        <div class="course-box__main flex-column w-100">
          <a href="#" class="course-box__title">${course.name}</a>
  
          <div class="course-box__rating-teacher">
            <div class="course-box__teacher">
              <i class="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
              <a href="#" class="course-box__teacher-link">${course.creator}</a>
            </div>
            <div class="course-box__rating">
              ${Array(5 - course.courseAverageScore)
                .fill(0)
                .map((score) => '<img src="images/svgs/star.svg" alt="rating" class="course-box__star">')
                .join("")}
              ${Array(course.courseAverageScore)
                .fill(0)
                .map((score) => '<img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">')
                .join("")}
            </div>
          </div>
  
          <div class="course-box__status">
            <div class="course-box__users">
              <i class="fas fa-users course-box__users-icon"></i>
              <span class="course-box__users-text">${course.registers}</span>
            </div>
            <span class="course-box__price">${course.price === 0 ? "رایگان" : course.price.toLocaleString()}</span>
          </div>
           <div class="course-box__footer">
          <a href="#" class="course-box__footer-link">
            مشاهده اطلاعات
            <i class="fas fa-arrow-left course-box__footer-icon"></i>
          </a>
        </div>
        </div>
  
       
  
      </div>
    </div>
      `);
        });
    }

}

const insertArticlesHtmlTemplate = (articles, showType, parentElement) => {
    parentElement.innerHTML = ' ';
    if (showType === 'row') {
        articles.forEach((article) => {
            parentElement.insertAdjacentHTML("beforeend", `
    <div class="col-4">
    <div class="article-card">
      <div class="article-card__header">
        <a href="#" class="article-card__link-img">
          <img src=http://localhost:4000/courses/covers/${article.cover} class="article-card__img" alt="Article Cover" />
        </a>
      </div>
      <div class="article-card__content">
        <a href="#" class="article-card__link">
          ${article.title}
        </a>
        <p class="article-card__text">
        ${article.description}
        </p>
        <a href="#" class="article-card__btn">بیشتر بخوانید</a>
      </div>
    </div>
  </div>`);
        });
    }


}
const coursesSorting = (array, filterMethode) => {
    console.log(array, filterMethode)
    let outputArray = [];

    switch (filterMethode) {
        case 'free': {
            outputArray = array.filter(course => course.price === 0)
            break
        }
        case 'money': {
            outputArray = array.filter(course => course.price !== 0)
            break
        }
        case 'default': {
            outputArray = array
            break
        }
        case 'first': {
            outputArray = [...array].reverse()
            break
        }
        case 'last': {
            outputArray = array
            break
        }
        case 'score': {
            outputArray = array.sort((a, b) => b.courseAverageScore - a.courseAverageScore);
            break
        }
        default: {
            outputArray = array
        }
    }

    return outputArray;
}

const getCourseDetail = () => {

    const courseShortName = getUrlParam("name");
    let $ = document;
    const courseTitleElem = $.querySelector('.course-info__title')
    const courseDescElem = $.querySelector('.course-info__text')
    const courseCategoryElem = $.querySelector('.course-info__link')
    const courseRegisterInfoElem = $.querySelector('.course-info__register-title')
    const courseStatuseElem = $.querySelector('.course-boxes__box-left--subtitle')
    const courseSupportElem = $.querySelector('.course-boxes__box-left--support')
    const courseLastUpdateElem = $.querySelector('.course-boxes__box-left--last-update')
    const courseTimeElem = $.querySelector('.course-boxes__box-left--time')
    const courseCommentsCountElem = $.querySelector('.course-info__total-comment-text')
    const courseStudentsCountElem = $.querySelector('.course-info__total-sale-number')
    const commentsContentWrapper = $.querySelector('.comments__content')


    fetch(`http://localhost:4000/v1/courses/${courseShortName}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    }).then(res => res.json()).then(course => {
            // console.log(course)
            courseTitleElem.innerHTML = course.name;
            courseDescElem.innerHTML = course.description;
            courseCategoryElem.innerHTML = course.categoryID.title;

            if (course.isUserRegisteredToThisCourse) {
                courseRegisterInfoElem.insertAdjacentHTML('beforeend', 'شما دانشجوی این دوره هستید')
            } else {
                courseRegisterInfoElem.insertAdjacentHTML('beforeend', 'ثبت نام در دوره')

                courseRegisterInfoElem.addEventListener('click', event => {
                    event.preventDefault();
                    // console.log("click")
                    if (course.price === 0) {
                        // console.log("0")
                        showSwal(
                            "آیا مطمئن هستید در عضویت این دوره",
                            "warning",
                            ["نه", "آره"],
                            async (result) => {
                                if (result) {
                                    const res = await fetch(`http://localhost:4000/v1/courses/${course._id}/register`, {
                                        method: "POST",
                                        headers: {
                                            Authorization: `Bearer ${getToken()}`,
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify({price: 0})
                                    })

                                    if (res.ok) {
                                        showSwal("با موفقیت ثبت نام شدید",
                                            "success",
                                            "ok",
                                            () => {
                                                location.reload();
                                            }
                                        )
                                    }

                                }
                            }
                        )
                    } else {

                        showSwal(
                            "آیا از ثبت نام در دوره اطمینان دارید؟",
                            "success",
                            ["نه", "آره"],
                            async (result) => {
                                if (result) {
                                    showSwal(
                                        "آیا کد تخفیف دارید؟",
                                        "warning",
                                        ["نه", "آره"],
                                        async (result) => {
                                            if (result) {
                                                swal({
                                                    title: "کد تخفیف را وارد نمایید:",
                                                    content: "input",
                                                    button: "اعمال تخفیف",
                                                }).then((code) => {
                                                    fetch(`http://localhost:4000/v1/offs/${code}`, {
                                                        method: "POST",
                                                        headers: {
                                                            Authorization: `Bearer ${getToken()}`,
                                                            "Content-Type": "application/json",
                                                        },
                                                        body: JSON.stringify({course: course._id}),
                                                    })
                                                        .then((res) => {
                                                            if (res.status === 404) {
                                                                showSwal(
                                                                    "کد تخفیف معتبر نمی‌باشد",
                                                                    "error",
                                                                    "ای بابا",
                                                                    () => {
                                                                    }
                                                                );
                                                            } else if (res.status === 409) {
                                                                showSwal(
                                                                    "مهلت استفاده از کد تخفیف به اتمام رسیده",
                                                                    "error",
                                                                    "ای بابا",
                                                                    () => {
                                                                    }
                                                                );
                                                            }
                                                            return res.json();
                                                        })
                                                        .then((code) => {
                                                            console.log(code);

                                                            fetch(
                                                                `http://localhost:4000/v1/courses/${course._id}/register`,
                                                                {
                                                                    method: "POST",
                                                                    headers: {
                                                                        Authorization: `Bearer ${getToken()}`,
                                                                        "Content-Type": "application/json",
                                                                    },
                                                                    body: JSON.stringify({price: course.price - (course.price * code.percent / 100)}),
                                                                }
                                                            ).then((res) => {
                                                                if (res.ok) {
                                                                    showSwal(
                                                                        "با موفقیت در دوره ثبت نام شدید",
                                                                        "success",
                                                                        "هورررراااا",
                                                                        () => {
                                                                            location.reload();
                                                                        }
                                                                    );
                                                                }
                                                            });
                                                        });
                                                });
                                            } else {
                                                const res = await fetch(
                                                    `http://localhost:4000/v1/courses/${course._id}/register`,
                                                    {
                                                        method: "POST",
                                                        headers: {
                                                            Authorization: `Bearer ${getToken()}`,
                                                            "Content-Type": "application/json",
                                                        },
                                                        body: JSON.stringify({price: course.price}),
                                                    }
                                                );

                                                if (res.ok) {
                                                    showSwal(
                                                        "با موفقیت در دوره ثبت نام شدید",
                                                        "success",
                                                        "هورررراااا",
                                                        () => {
                                                            location.reload();
                                                        }
                                                    );
                                                }
                                            }
                                        }
                                    );
                                }
                            }
                        );


                    }

                })
            }


            courseStatuseElem.innerHTML = course.isComplete ? 'تکمیل شده' : 'در حال برگذاری'
            courseSupportElem.innerHTML = course.support
            courseLastUpdateElem.innerHTML = course.updatedAt.slice(0, 10)

            let arrayTimes = course.sessions.map(time => {
                return time.time
            })
            // console.log(arrayTimes);
            let numbers = arrayTimes.map(time => {
                let [hour, minute] = time.split(':');
                return {hour: parseInt(hour), minute: parseInt(minute)};
            });
            // console.log(numbers);
            let total = numbers.reduce((acc, time) => {
                acc.hour += time.hour;
                acc.minute += time.minute;
                return acc;
            }, {hour: 0, minute: 0});

            if (total.minute >= 60) {
                total.hour += Math.floor(total.minute / 60);
                total.minute = total.minute % 60;
            }
            // console.log(total);
            courseTimeElem.innerHTML = total.hour + ":" + total.minute
            courseCommentsCountElem.innerHTML = `${course.comments.length} دیدگاه`
            courseStudentsCountElem.innerHTML = course.courseStudentsCount
            const sessionsWrapper = $.querySelector(".sessions-wrapper");

            // Show Course Sessions

            if (course.sessions.length) {
                course.sessions.forEach((session, index) => {
                    sessionsWrapper.insertAdjacentHTML(
                        "beforeend",
                        `
            <div class="accordion-body introduction__accordion-body">
              <div class="introduction__accordion-right">
                <span class="introduction__accordion-count">${index + 1}</span>
                <i class="fab fa-youtube introduction__accordion-icon"></i>
                ${session.free || course.isUserRegisteredToThisCourse ? `
                      <a href="episode.html?name=${course.shortName}&id=${session._id}" class="introduction__accordion-link">
                        ${session.title}
                      </a>
                  `
                            : `
                      <span class="introduction__accordion-link">
                        ${session.title}
                      </span>
             
                  `
                        }
                </div>
              <div class="introduction__accordion-left">
                <span class="introduction__accordion-time">
                  ${session.time}
                </span>
                ${!(session.free || course.isUserRegisteredToThisCourse)
                            ? `
                    <i class="fa fa-lock"></i>
                  `
                            : ""
                        }
              </div>
            </div>
        `
                    );
                });
            } else {
                sessionsWrapper.insertAdjacentHTML(
                    "beforeend",
                    `
            <div class="accordion-body introduction__accordion-body">
              <div class="introduction__accordion-right">
                <span class="introduction__accordion-count"> -- </span>
                <i class="fab fa-youtube introduction__accordion-icon"></i>
                <a href="#" class="introduction__accordion-link">
                  هنوز جلسه‌ای آپلود نشده
                </a>
              </div>
              <div class="introduction__accordion-left">
                <span class="introduction__accordion-time">
                  00:00
                </span>
              </div>
            </div>
        `
                );
            }

            // Show Course Comments
            if (course.comments.length) {

                course.comments.forEach(comment => {
                    commentsContentWrapper.insertAdjacentHTML('beforeend', `
              <div class="comments__item">
                <div class="comments__question">
                    <div class="comments__question-header">
                        <div class="comments__question-header-right">
                            <span class="comments__question-name comment-name">${comment.creator.name}</span>
                            <span class="comments__question-status comment-status">
                            (${comment.creator.role === "USER" ? "دانشجو" : "مدرس"})
                            </span>
                                <span class="comments__question-date comment-date">
                                  ${comment.createdAt.slice(0, 10)}
                                </span>
                        </div>
                        <div class="comments__question-header-left">
                            <a class="comments__question-header-link comment-link" href="#">پاسخ</a>
                        </div>
                    </div>
                    <div class="comments__question-text">
                       
                        <p class="comments__question-paragraph comment-paragraph">
                          ${comment.body}
                        </p>
                    </div>
                </div>
                ${
                        comment.answerContent
                            ? `
                      <div class="comments__ansewr">
                          <div class="comments__ansewr-header">
                              <div class="comments__ansewr-header-right">
                                  <span class="comments__ansewr-name comment-name">
                                 ${comment.answerContent.creator.name}
                                      </span>
                                  <span class="comments__ansewr-staus comment-status">
                                    (${comment.creator.role === "USER" ? "دانشجو" : "مدرس"})
                                  </span>
                                  <span class="comments__ansewr-date comment-date">1401/04/21</span>
                              </div>
                              <div class="comments__ansewr-header-left">
                                  <a class="comments__ansewr-header-link comment-link" href="#">پاسخ</a>
                              </div>
                          </div>
                          <div class="comments__ansewr-text">
                              <p class="comments__ansewr-paragraph comment-paragraph">
                                ${comment.answerContent.body}
                              </p>
                          </div>
                      </div>
                    `
                            : ""
                    }
              </div>
            `)
                })

            } else {
                commentsContentWrapper.insertAdjacentHTML('beforeend', `
            <div class="alert alert-danger">هیچ کامنتی برای این دوره ثبت نشده</div>  `)
            }


        }
    )
}

const getAndShowRelatedCourses = async () => {
    const courseShortName = getUrlParam("name");

    const courseRelatedCoursesWrapper = document.querySelector('.course-info__courses-list')
    const res = await fetch(`http://localhost:4000/v1/courses/related/${courseShortName}`)
    const relatedCourses = await res.json();

    if (relatedCourses.length) {
        relatedCourses.forEach(course => {
            courseRelatedCoursesWrapper.insertAdjacentHTML('beforeend', ` <li class="course-info__courses-list-item">
            <a href="course.html?name=${course.shortName}" class="course-info__courses-link">
              <img src="http://localhost:4000/courses/covers/${course.cover}" alt="Course Cover" class="course-info__courses-img">
              <span class="course-info__courses-text">
                ${course.name}
              </span>
            </a>
        </li>`)
        })
    } else {

    }
    return relatedCourses;
}

const getSessionDetail = async () => {
    const courseShortName = getUrlParam('name');
    const sessionID = getUrlParam('id');
    const sessionVideoElem = document.querySelector('.episode-content__video')
    const courseSessionsListElem = document.querySelector('.sidebar-topics__list')

    const res = await fetch(`http://localhost:4000/v1/courses/${courseShortName}/${sessionID}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
    const responseData = await res.json();

    sessionVideoElem.setAttribute("src", `http://localhost:4000/courses/cover/${responseData.session.video}`)
    responseData.sessions.forEach(session => {
        courseSessionsListElem.insertAdjacentHTML('beforeend', `
      <li class="sidebar-topics__list-item">
          <div class="sidebar-topics__list-right">
            <svg class="svg-inline--fa fa-circle-play sidebar-topics__list-item-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-play" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM176 168V344C176 352.7 180.7 360.7 188.3 364.9C195.8 369.2 205.1 369 212.5 364.5L356.5 276.5C363.6 272.1 368 264.4 368 256C368 247.6 363.6 239.9 356.5 235.5L212.5 147.5C205.1 142.1 195.8 142.8 188.3 147.1C180.7 151.3 176 159.3 176 168V168z"></path></svg><!-- <i class="sidebar-topics__list-item-icon fa fa-play-circle"></i> Font Awesome fontawesome.com -->
            ${
            session.free
                ? `
                <a class="sidebar-topics__list-item-link" href="episode.html?name${courseShortName}&id=${session._id}">${session.title}</a>
              `
                : `
                <span class="sidebar-topics__list-item-link">${session.title}</span>
              `
        }
          </div>
          <div class="sidebar-topics__list-left">
            <span class="sidebar-topics__list-item-time">${session.time}</span>
          </div>
        </li>
    `)
    })
    return responseData;

}

const submitContactUsMsg = async () => {
    const nameInputElem = document.querySelector('#name')
    const emailInputElem = document.querySelector('#email')
    const phoneInputElem = document.querySelector('#phone')
    const bodyInputElem = document.querySelector('#body')

    const newContactUsInfos = {
        name: nameInputElem.value.trim(),
        email: emailInputElem.value.trim(),
        phone: phoneInputElem.value.trim(),
        body: bodyInputElem.value.trim(),
    };

    const res = await fetch(`http://localhost:4000/v1/contact`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(newContactUsInfos)
    })

    const result = await res.json();

    if (res.status === 201) {
        showSwal(" پیغام شما با موفقیت انجام شد", "success", "ورود به پنل", (result) => location.href = 'index.html')
        nameInputElem.value = '';
        emailInputElem.value = '';
        phoneInputElem.value = '';
        bodyInputElem.value = '';
    } else {
        showSwal(" لطفا بعدا تست کنید " +
            " \nمشکلی در اتصال وجود دارد ", "error", "ای بابا", () => {
        })
    }

    // console.log(res)
    // console.log(result)
}

const createNewNewsLetter = async () => {

    const newsLetterInput = document.querySelector('#news-letter-input')

    const newNewsLetterEmailObj = {
        email: newsLetterInput.value.trim()
    }


    const res = await fetch(`http://localhost:4000/v1/newsletters`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(newNewsLetterEmailObj)
    })

    const result = await res.json();

    if (res.ok) {
        showSwal(" عضویت شما در خبرنامه انجام شد", "success")
        newsLetterInput.value = '';
    }
}

const globalSearch = async () => {
    const searchValue = getUrlParam("value");
    const coursesSearchResultWrapper = document.querySelector("#courses-container");
    const articlesSearchResultWrapper = document.querySelector("#articles-wrapper");

    const res = await fetch(`http://localhost:4000/v1/search/${searchValue}`);
    const data = await res.json();

    if (data.allResultCourses.length) {
        data.allResultCourses.forEach((course) => {
            coursesSearchResultWrapper.insertAdjacentHTML("beforeend", `
      <div class="col-4">
        <div class="course-box">
          <a href="course.html?name=${course.shortName}">
            <img src=http://localhost:4000/courses/covers/${course.cover} alt="Course img" class="course-box__img" />
          </a>
          <div class="course-box__main">
            <a href="course.html?name=${course.shortName}" class="course-box__title">${course.name}</a>

            <div class="course-box__rating-teacher">
              <div class="course-box__teacher">
                <i class="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
                <a href="#" class="course-box__teacher-link">محمدامین سعیدی راد</a>
              </div>
              <div class="course-box__rating">
                <img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">
                <img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">
                <img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">
                <img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">
                <img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">
              </div>
            </div>

            <div class="course-box__status">
              <div class="course-box__users">
                <i class="fas fa-users course-box__users-icon"></i>
                <span class="course-box__users-text">${course.registers}</span>
              </div>
              <span class="course-box__price">${
                    course.price === 0 ? "رایگان" : course.price.toLocaleString()
                }</span>
            </div>
          </div>

          <div class="course-box__footer">
            <a href="#" class="course-box__footer-link">
              مشاهده اطلاعات
              <i class="fas fa-arrow-left course-box__footer-icon"></i>
            </a>
          </div>

        </div>
      </div>
    `
            );
        });
    } else {
        coursesSearchResultWrapper.insertAdjacentHTML("beforeend", `
      <div class="alert alert-danger">هیچ دوره‌ای برای جستجوی شما وجود ندارد</div>
        `);
    }

    if (data.allResultArticles.length) {
        data.allResultArticles.forEach((article) => {
            articlesSearchResultWrapper.insertAdjacentHTML("beforeend", `
            <div class="col-4">
              <div class="article-card">
                <div class="article-card__header">
                  <a href="#" class="article-card__link-img">
                    <img src=http://localhost:4000/courses/covers/${article.cover} class="article-card__img" alt="Article Cover" />
                  </a>
                </div>
                <div class="article-card__content">
                  <a href="#" class="article-card__link">
                    ${article.title}
                  </a>
                  <p class="article-card__text">
                  ${article.description}
                  </p>
                  <a href="#" class="article-card__btn">بیشتر بخوانید</a>
                </div>
              </div>
            </div>
      `);
        });
    } else {
        articlesSearchResultWrapper.insertAdjacentHTML("beforeend", `
      <div class="alert alert-danger">هیچ مقاله‌ای برای جستجوی شما وجود ندارد</div>
      `);
    }

    return data;

};

const submitComment = async () => {
    const commentTextareaElem = document.querySelector('.comments__score-input-respond')
    const commentScoreElem = document.querySelector('#comment-score')
    let score = 5;
    const courseShortName = getUrlParam('name')

    commentScoreElem.addEventListener('change', event => {
        score = event.target.value;
        // console.log(event.target,  score)
    })

    const newCommentInfos = {
        body: commentTextareaElem.value.trim(),
        courseShortName,
        score,
    }

    const res = await fetch(`http://localhost:4000/v1/comments`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newCommentInfos),
    });

    console.log(res);

    if (res.ok) {
        showSwal(
            "کامنت مورد نظر شما با موفقیت ثبت شد",
            "success",
            "خیلی هم عالی",
            () => {
            }
        );

        commentTextareaElem.value = "";
    }

}

const getAllCourses = async () => {
    const coursesWrapperElem = document.querySelector("#courses-wrapper");

    const res = await fetch(`http://localhost:4000/v1/courses`);
    const courses = await res.json();

    return courses;
};

const getAllArticles = async () => {
    const res = await fetch(`http://localhost:4000/v1/articles`);
    const articles = await res.json();

    return articles;
};

export {
    showUserNameInNavbar,
    renderTopbarMenus,
    getAndShowAllCourses,
    getAndShowPopularCourses,
    getAndShowPresellCourses,
    getAndShowArticles,
    getAndShowNavbarMenus,
    getAndShowCategoryCourses,
    insertCourseBoxHtmlTemplate,
    coursesSorting,
    getCourseDetail,
    getAndShowRelatedCourses,
    getSessionDetail,
    submitContactUsMsg,
    createNewNewsLetter,
    globalSearch,
    submitComment,
    getAllCourses,
    getAllArticles,
    insertArticlesHtmlTemplate
}