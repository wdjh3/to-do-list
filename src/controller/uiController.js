const addNewProjectBtn = document.getElementById("add-new-project");
const addNewTaskBtn = document.getElementById("add-new-task");
const taskContainer = document.getElementById("task-container");
const projectFormDialog = document.getElementById("project-form-dialog");
const taskFormDialog = document.getElementById("task-form-dialog");
const checklistItemFormDialog = document.getElementById("checklist-item-form-dialog");

export const uiController = (() => {
    const start = () => {
        addNewProjectBtn.addEventListener('click', () => projectFormDialog.showModal())
        addNewTaskBtn.addEventListener('click', () => taskFormDialog.showModal())
    }

    return {start}
})();