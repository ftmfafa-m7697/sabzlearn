import {
    getAndShowAllComments,
    showCommentBody,
    acceptComment,
    rejectComment,
    answerToComment,
    removeComment
} from "./funcs/comments.js";

window.showCommentBody = showCommentBody;
window.acceptComment = acceptComment;
window.rejectComment = rejectComment;
window.answerToComment = answerToComment;
window.removeComment = removeComment;

window.addEventListener("load", () => {
    getAndShowAllComments();
});
