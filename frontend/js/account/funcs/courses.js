import {getToken} from "../../funcs/utils.js";

const getUserCourses = async () => {
    const res = await fetch(`http://localhost:4000/v1/users/courses`, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
    const courses = await res.json();

    return courses;
};

const insertCourseBoxHtmlTemplate = (array, parentElement) => {
    parentElement.innerHTML = ''
    array.forEach((course) => {
        parentElement.insertAdjacentHTML('beforeend', `
              <div class="main__box">
                  <div class="main__box-right">
                      <a class="main__box-img-link" href="#">
                          <img class="main__box-img img-fluid" 
                          src="http://localhost:4000/courses/covers/${course.course.cover}"/>
                      </a>
                  </div>
                  <div class="main__box-left">
                      <a href="#" class="main__box-title">${course.course.name}</a>
                      <div class="main__box-bottom">
                          <div class="main__box-all">
                              <span class="main__box-all-text">مبلغ:</span>
                              <span class="main__box-all-value">
                                 ${course.course.price === 0 ? "رایگان" : course.course.price}
                              </span>
                          </div>
                          <div class="main__box-completed">
                              <span class="main__box-completed-text">وضعیت:</span>
                              <span class="main__box-completed-value">
                                  ${course.course.isComplete === 1 ? "تکمیل شده" : "در حال برگزاری"}
                              </span>
                          </div>
                      </div>
                  </div>
             </div>
       `);
    });
}

const filterCourses = (array, filterMethod) => {

    let filteredCourses = null;

    switch (filterMethod) {
        case 'free': {
            filteredCourses = array.filter(course => course.course.price === 0)
            break;
        }
        case 'money': {
            filteredCourses = array.filter(course => course.course.price !== 0)
            break;
        }
        case 'complete': {
            filteredCourses = array.filter(course => course.course.isComplete === 1)
            break;
        }
        case 'active': {
            filteredCourses = array.filter(course => course.course.isComplete === 0)
            break;
        }
        default: {
            return array
        }
    }

    return filteredCourses

}

export {getUserCourses, filterCourses, insertCourseBoxHtmlTemplate};
