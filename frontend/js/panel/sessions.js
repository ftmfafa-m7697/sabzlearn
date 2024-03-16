import {
    createSession,
    getAndShowAllSessions,
    prepareCreateNewSessionForm,
    removeSession,
} from "./funcs/sessions.js";

window.removeSession = removeSession

window.addEventListener("load", () => {
    const createSessionBtn = document.querySelector("#create-session");

    getAndShowAllSessions();
    prepareCreateNewSessionForm();

    createSessionBtn.addEventListener("click", event => {
        event.preventDefault()
        createSession();
    });
});
