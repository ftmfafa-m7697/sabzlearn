import {getAllArticles, insertArticlesHtmlTemplate} from "./funcs/shared.js";
import { paginateItems, getUrlParam, addParamToUrl } from "./funcs/utils.js";

window.addParamToUrl = addParamToUrl

window.addEventListener("load", () => {
    getAllArticles().then((articles) => {
        const coursesPagintionWrapperElem = document.querySelector("#courses-pagintion");
        const coursesWrapperElem = document.querySelector("#courses-wrapper");

        const currentPage = getUrlParam("page");

        let shownCourses = paginateItems([...articles], 3, coursesPagintionWrapperElem, currentPage);
        insertArticlesHtmlTemplate(shownCourses, "row" ,coursesWrapperElem)
    });
});