import { getToken, showSwal } from "./../../funcs/utils.js";

const getAndShowAllComments = async () => {
    const commentsListTableElem = document.querySelector(".table tbody");
    commentsListTableElem.innerHTML = "";

    const res = await fetch(`http://localhost:4000/v1/comments`);
    const comments = await res.json();

    comments.forEach((comment, index) => {
        commentsListTableElem.insertAdjacentHTML("beforeend", `
            <tr>
                <td class="${comment.answer === 1 ? "answer-comment" : "no-answer-comment"}">${index + 1}</td>
                <td>${comment.creator.name}</td>
                <td>${comment.course}</td>
                <td>${comment.createdAt.slice(0, 10)}</td>
                <td>${comment.score}</td>
                <td>
                    <button type='button' onclick="showCommentBody('${comment.body}')" class='btn btn-primary edit-btn'>مشاهده</button>
                </td>
                <td>
                    <button type='button' onclick="answerToComment('${comment._id}')" class='btn btn-primary edit-btn'>پاسخ</button>
                </td>
                <td>
                    <button type='button' onclick="acceptComment('${comment._id}')" class='btn btn-primary edit-btn'>تایید</button>
                </td>
                <td>
                    <button type='button' onclick="rejectComment('${comment._id}')" class='btn btn-primary edit-btn'>رد</button>
                </td>
                <td>
                    <button type='button' onclick="removeComment('${comment._id}')" class='btn btn-danger delete-btn'>حذف</button>
                </td>
            </tr>
        `);
    });
};

const showCommentBody = (commentBody) => {
    showSwal(commentBody, undefined, "دیدم", () => {});
};

const acceptComment = async (commentID) => {
    showSwal(
        "آیا از تایید کامنت اطمینان دارید؟",
        "warning",
        ["نه", "آره"],
        async (result) => {
            if (result) {
                const res = await fetch(`http://localhost:4000/v1/comments/accept/${commentID}`,
                    {
                        method: "PUT",
                        headers: {
                            Authorization: `Bearer ${getToken()}`,
                        },
                    }
                );

                console.log(res);

                if (res.ok) {
                    showSwal(
                        "کامنت مورد نظر با موفقیت تایید شد",
                        "success",
                        "خیلی هم عالی",
                        () => {
                            getAndShowAllComments();
                        }
                    );
                }
            }
        }
    );
};

const rejectComment = async (commentID) => {
    showSwal(
        "آیا از رد کامنت اطمینان دارید؟",
        "warning",
        ["نه", "آره"],
        async (result) => {
            if (result) {
                const res = await fetch(`http://localhost:4000/v1/comments/reject/${commentID}`,
                    {
                        method: "PUT",
                        headers: {
                            Authorization: `Bearer ${getToken()}`,
                        },
                    }
                );

                console.log(res);

                if (res.ok) {
                    showSwal(
                        "کامنت مورد نظر با موفقیت رد شد",
                        "success",
                        "خیلی هم عالی",
                        () => {
                            getAndShowAllComments();
                        }
                    );
                }
            }
        }
    );
};

const answerToComment = async (commentID) => {
    swal({
        title: "متن پاسخ را وارد نمایید:",
        content: "input",
        buttons: "ثبت پاسخ",
    }).then((body) => {
        if (body) {
            fetch(`http://localhost:4000/v1/comments/answer/${commentID}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ body }),
            }).then((res) => {
                if (res.ok) {
                    showSwal(
                        "پاسخ مورد نظر با موفقیت ثبت شد",
                        "success",
                        "خیلی هم عالی",
                        () => {
                            getAndShowAllComments();
                        }
                    );
                }
            });
        }
    });
};

const removeComment = async (commentID) => {
    showSwal(
        "آیا از حذف کامنت اطمینان دارید؟",
        "warning",
        ["نه", "آره"],
        async (result) => {
            if (result) {
                const res = await fetch(
                    `http://localhost:4000/v1/comments/${commentID}`, {
                        method: "DELETE",
                        headers: {
                            Authorization: `Bearer ${getToken()}`,
                        },
                    }
                );

                if (res.ok) {
                    showSwal(
                        "کامنت مورد نظر با موفقیت حذف شد",
                        "success",
                        "خیلی هم عالی",
                        () => {
                            getAndShowAllComments();
                        }
                    );
                }
            }
        }
    );
};

export {
    getAndShowAllComments,
    showCommentBody,
    acceptComment,
    rejectComment,
    answerToComment,
    removeComment,
};
