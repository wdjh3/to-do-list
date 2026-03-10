import { coordinator } from "./coordinator.js";

const addNewProjectBtn = document.getElementById("add-new-project");
const addNewTaskBtn = document.getElementById("add-new-task");
const currentProjectTitleElement = document.getElementById(
  "current-project-title",
);
const currentProjectContainer = document.getElementById("current-project");
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
      projectFormDialog.querySelector("button[type='submit']").textContent =
        "Add Project";
      coordinator.setFormMode("ADD");
      projectFormDialog.showModal();
    });
    addNewTaskBtn.addEventListener("click", () => {
      taskFormDialog.querySelector(".title").textContent = "Add Task";
      taskFormDialog.querySelector("button[type='submit']").textContent =
        "Add Task";
      coordinator.setFormMode("ADD");
      taskFormDialog.showModal();
    });

    currentProjectContainer.addEventListener("click", (e) => {
      if (e.target.closest(".add-checklist-item")) {
        checklistItemFormDialog.querySelector("input[name='task-id']").value =
          e.target.closest(".task-container").querySelector(".task").id;
        checklistItemFormDialog.querySelector(".title").textContent =
          "Add Checklist Item";
        checklistItemFormDialog.querySelector(
          "button[type='submit']",
        ).textContent = "Add Checklist Item";
        coordinator.setFormMode("ADD");
        checklistItemFormDialog.showModal();
      }

      // Handles opening the edit form dialog when the edit button is pressed for Tasks
      if (e.target.closest(".edit-button") && e.target.closest(".task")) {
        taskFormDialog.querySelector("input[name='task-id']").value =
          e.target.closest(".task").id;
        taskFormDialog.querySelector(".title").textContent = "Edit Task";
        taskFormDialog.querySelector("button[type='submit']").textContent =
          "Edit Task";
        coordinator.setFormMode("EDIT");
        taskFormDialog.showModal();
      }

      // Delete Task
      if (e.target.closest(".delete-button") && e.target.closest(".task")) {
        const userConfirmed = confirm(`Are you sure you want to delete this?`);

        if (userConfirmed) {
          coordinator.handleDeleteTaskRequest(e.target.closest(".task").id);
          console.log("Action confirmed!");
        } else {
          console.log("Action cancelled.");
        }
      }

      // Handles opening the edit form dialog when the edit button is pressed for ChecklistItems
      if (
        e.target.closest(".edit-button") &&
        e.target.closest(".checklist-item")
      ) {
        checklistItemFormDialog.querySelector("input[name='task-id']").value =
          e.target.closest(".task-container").querySelector(".task").id;
        checklistItemFormDialog.querySelector(
          "input[name='checklist-item-id']",
        ).value = e.target.closest(".checklist-item").id;
        checklistItemFormDialog.querySelector(".title").textContent =
          "Edit Checklist Item";
        checklistItemFormDialog.querySelector(
          "button[type='submit']",
        ).textContent = "Edit Checklist Item";
        coordinator.setFormMode("EDIT");
        checklistItemFormDialog.showModal();
      }

      // Delete Checklist Item
      if (
        e.target.closest(".delete-button") &&
        e.target.closest(".checklist-item")
      ) {
        const userConfirmed = confirm(`Are you sure you want to delete this?`);

        if (userConfirmed) {
          coordinator.handleDeleteChecklistItemRequest(
            e.target.closest(".task-container").querySelector(".task").id,
            e.target.closest(".checklist-item").id,
          );
          console.log("Action confirmed!");
        } else {
          console.log("Action cancelled.");
        }
      }
    });

    projectList.addEventListener("click", (e) => {
      if (e.target.closest(".project-in-list")) {
        coordinator.setCurrentProject(e.target.closest(".project-in-list").id);
      }

      if (e.target.closest(".edit-button")) {
        projectFormDialog.querySelector("input[name='project-id']").value =
          e.target.closest(".project-in-list").id;
        projectFormDialog.querySelector(".title").textContent = "Edit Project";
        projectFormDialog.querySelector("button[type='submit']").textContent =
          "Edit Project";
        coordinator.setFormMode("EDIT");
        projectFormDialog.showModal();
      }

      // Delete Project
      if (
        e.target.closest(".delete-button")
      ) {
        const userConfirmed = confirm(`Are you sure you want to delete this?`);

        if (userConfirmed) {
          coordinator.handleDeleteProjectRequest(
            e.target.closest(".project-in-list").id,
          );
          console.log("Action confirmed!");
        } else {
          console.log("Action cancelled.");
        }
      }
    });

    for (const formDialog of formDialogs) {
      formDialog.addEventListener("close", (e) => {
        console.log(formDialog.returnValue);
        if (formDialog.returnValue === "submit") {
          coordinator.handleFormRequest(
            new FormData(formDialog.querySelector("form")),
          );
        }

        formDialog.querySelector(".input-form").reset();
      });

      // Close form if click outside dialog window
      formDialog.addEventListener("click", (e) => {
        const dialogDimensions = formDialog.getBoundingClientRect();
        formDialog.returnValue = "cancel";

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

  const render = (data, currentProjectId) => {
    projectList.innerHTML = "";
    currentProjectContainer.innerHTML = "";
    for (const project of data) {
      const projectDiv = document.createElement("div");
      projectDiv.classList.add("project-in-list");
      projectDiv.id = project.id;
      projectDiv.innerHTML = `
        <p class="project-title">${project.name}</p>
        <div class="project-buttons">
          <div class="delete-button button">
            <span class="material-symbols-outlined">
            delete
            </span>
          </div>
          <div class="edit-button button">
            <span class="material-symbols-outlined">
            edit
            </span>
          </div>
        </div>
      `;
      projectList.appendChild(projectDiv);
    }

    const currentProject = data.find(
      (project) => project.id === currentProjectId,
    );
    currentProjectTitleElement.textContent = currentProject.name;
    const taskList = currentProject ? currentProject.taskList : [];
    for (const task of taskList) {
      const taskContainerDiv = document.createElement("div");
      taskContainerDiv.classList.add("task-container");
      taskContainerDiv.innerHTML = `
        <div class="task" id="${task.id}">
					<div class="task-lean-left">
						<div class="drop-down button">
							<span class="material-symbols-outlined">
							keyboard_arrow_down
							</span>
						</div>
						<p class="task-title">${task.title}</p>
					</div>
					<div class="task-buttons">
						<div class="delete-button button">
							<span class="material-symbols-outlined">
							delete
							</span>
						</div>
						<div class="edit-button button">
							<span class="material-symbols-outlined">
							edit
							</span>
						</div>
						<div class="toggle-button button">
							<span class="material-symbols-outlined">
							check
							</span>
						</div>
					</div>
				</div>
      `;
      if (task.hasDropdown) {
        const checklistContainerDiv = document.createElement("div");
        checklistContainerDiv.classList.add("checklist-container");
        checklistContainerDiv.innerHTML = `
          <div class="checklist"></div>
					<div class="add-checklist-item">
						+ Add new checklist item...
					</div>
        `;
        for (const checklistItem of task.checklist) {
          const checklistItemElement = document.createElement("div");
          checklistItemElement.classList.add("checklist-item");
          checklistItemElement.id = checklistItem.id;
          checklistItemElement.innerHTML = `
            <p class="checklist-item-title">${checklistItem.title}</p>
            <div class="checklist-item-buttons">
              <div class="delete-button button">
                <span class="material-symbols-outlined">
                delete
                </span>
              </div>
              <div class="edit-button button">
                <span class="material-symbols-outlined">
                edit
                </span>
              </div>
              <div class="toggle-button button active">
                <span class="material-symbols-outlined">
                check
                </span>
              </div>
            </div>
          `;
          checklistContainerDiv
            .querySelector(".checklist")
            .appendChild(checklistItemElement);
        }
        taskContainerDiv.appendChild(checklistContainerDiv);
      }
      currentProjectContainer.appendChild(taskContainerDiv);
    }
    return true;
  };

  return { start, render };
})();
