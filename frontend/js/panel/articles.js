import { createNewArticle, getAndShowAllArticles, prepareCreateNewArticleForm, removeArticle } from "./funcs/articles.js";

window.removeArticle = removeArticle

window.addEventListener("load", () => {

    const createArticleBtn = document.querySelector('#create-article')

    getAndShowAllArticles();
    prepareCreateNewArticleForm()

    createArticleBtn.addEventListener('click', event => {
        event.preventDefault()
        createNewArticle()
    })

});
