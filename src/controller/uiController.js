const addNewProjectBtn = document.getElementById("add-new-project");
const addNewTaskBtn = document.getElementById("add-new-task");
const currentProject = document.getElementById("current-project");
const projectFormDialog = document.getElementById("project-form-dialog");
const taskFormDialog = document.getElementById("task-form-dialog");
const checklistItemFormDialog = document.getElementById(
  "checklist-item-form-dialog",
);

export const uiController = (() => {
  const formDialogs = [
    projectFormDialog,
    taskFormDialog,
    checklistItemFormDialog,
  ];

  const start = () => {
    addNewProjectBtn.addEventListener("click", () =>
      projectFormDialog.showModal(),
    );
    addNewTaskBtn.addEventListener("click", () => taskFormDialog.showModal());
    currentProject.addEventListener("click", (e) => {
      if (e.target.closest(".add-checklist-item")) {
        console.log(
          e.target.closest(".task-container").querySelector(".task").id,
        );
        checklistItemFormDialog.showModal();
      }
    });
    for (const formDialog of formDialogs) {
      formDialog.addEventListener("close", () => {
        formDialog.querySelector(".input-form").reset();
      });

      formDialog.addEventListener('click', (e) => {
        const dialogDimensions = formDialog.getBoundingClientRect();
  
        if (
          e.clientX < dialogDimensions.left ||
          e.clientX > dialogDimensions.right ||
          e.clientY < dialogDimensions.top ||
          e.clientY > dialogDimensions.bottom
        ) {
          formDialog.close();
        }
      });
    }
  };

  const sync = () => {};

  return { start };
})();
