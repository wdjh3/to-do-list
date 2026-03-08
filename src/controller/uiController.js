const addNewProjectBtn = document.getElementById("add-new-project");
const addNewTaskBtn = document.getElementById("add-new-task");
const currentProject = document.getElementById("current-project");
const projectList = document.getElementById("project-list");
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
    addNewProjectBtn.addEventListener("click", () => {
      projectFormDialog.querySelector(".title").textContent = "Add Project";
      projectFormDialog.querySelector("button[type='submit']").textContent = "Add Project";
      projectFormDialog.showModal();
      }
    );
    addNewTaskBtn.addEventListener("click", () => {
      taskFormDialog.querySelector(".title").textContent = "Add Task";
      taskFormDialog.querySelector("button[type='submit']").textContent = "Add Task";
      taskFormDialog.showModal()
    });
    currentProject.addEventListener("click", (e) => {
      if (e.target.closest(".add-checklist-item")) {
        checklistItemFormDialog.querySelector(".title").textContent = "Add Checklist Item";
        checklistItemFormDialog.querySelector("button[type='submit']").textContent = "Add Checklist Item";
        checklistItemFormDialog.showModal()}

      // Handles opening the edit form dialog when the edit button is pressed for Tasks
      if (e.target.closest(".edit-button") && e.target.closest(".task")) {
        taskFormDialog.querySelector(".title").textContent = "Edit Task";
        taskFormDialog.querySelector("button[type='submit']").textContent = "Edit Task";
        taskFormDialog.showModal();
      }

      // Handles opening the edit form dialog when the edit button is pressed for ChecklistItems
      if (e.target.closest(".edit-button") && e.target.closest(".checklist-item")) {
        checklistItemFormDialog.querySelector(".title").textContent = "Edit Checklist Item";
        checklistItemFormDialog.querySelector("button[type='submit']").textContent = "Edit Checklist Item";
        checklistItemFormDialog.showModal();
      }
    });

    projectList.addEventListener("click", (e) => {
      if (e.target.closest(".edit-button")) {
        projectFormDialog.querySelector(".title").textContent = "Edit Project";
        projectFormDialog.querySelector("button[type='submit']").textContent = "Edit Project";
        projectFormDialog.showModal();
      }
    })

    for (const formDialog of formDialogs) {
      formDialog.addEventListener("close", () => {
        formDialog.querySelector(".input-form").reset();
      });

      // Close form if click outside dialog window
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
