const addNewProjectBtn = document.getElementById("add-new-project");
const addNewTaskBtn = document.getElementById("add-new-task");
const currentProject = document.getElementById("current-project");
const projectFormDialog = document.getElementById("project-form-dialog");
const taskFormDialog = document.getElementById("task-form-dialog");
const checklistItemFormDialog = document.getElementById("checklist-item-form-dialog");

export const uiController = (() => {
    const start = () => {
        addNewProjectBtn.addEventListener('click', () => projectFormDialog.showModal())
        addNewTaskBtn.addEventListener('click', () => taskFormDialog.showModal())
        currentProject.addEventListener('click', (e) => {
            if (e.target.closest(".add-checklist-item")) {
                checklistItemFormDialog.showModal()
            }
        })
    }

    const sync = () => {
        
    }

    return {start}
})();