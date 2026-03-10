import { uiController } from "./uiController.js";
import { projectController } from "./projectController.js";

export const coordinator = (() => {
  let formMode = "ADD";

  const getFormMode = (mode) => {
    return formMode;
  };

  const setFormMode = (mode) => {
    formMode = mode;
  };

  const setCurrentProject = (id) => {
    projectController.setCurrentProjectId(id);
    uiController.render(
      projectController.getProjects(),
      projectController.getCurrentProjectId(),
    );
  };

  const handleFormRequest = (formData) => {
    console.log(formMode);
    const formDataObject = Object.fromEntries(formData);
    console.log(formDataObject);
    const itemType = formDataObject["item-type"];

    if (formMode === "ADD") {
      if (itemType === "project") {
        projectController.addProject(formDataObject["project-title"]);
      } else if (itemType === "task") {
        projectController
          .getProject(projectController.getCurrentProjectId())
          .addTask(
            formDataObject["task-title"],
            formDataObject["task-description"],
            formDataObject["task-due-date"],
            formDataObject["task-priority"],
          );
      } else if (itemType === "checklist-item") {
        projectController
          .getProject(projectController.getCurrentProjectId())
          .getTask(formDataObject["task-id"])
          .addChecklistItem(
            formDataObject["checklist-item-title"],
            formDataObject["checklist-item-description"],
          );
      }
    } else if (formMode === "EDIT") {
      if (itemType === "project") {
        projectController
          .getProject(formDataObject["project-id"])
          .edit(formDataObject["project-title"]);
      } else if (itemType === "task") {
        projectController
          .getProject(projectController.getCurrentProjectId())
          .getTask(formDataObject["task-id"])
          .edit(
            formDataObject["task-title"],
            formDataObject["task-description"],
            formDataObject["task-due-date"],
            formDataObject["task-priority"],
          );
      } else if (itemType === "checklist-item") {
        projectController
          .getProject(projectController.getCurrentProjectId())
          .getTask(formDataObject["task-id"])
          .getChecklistItem(formDataObject["checklist-item-id"])
          .edit(
            formDataObject["checklist-item-title"],
            formDataObject["checklist-item-description"],
          );
      }
    }

    projectController.sync();

    uiController.render(
      projectController.getProjects(),
      projectController.getCurrentProjectId(),
    );
  };

  const handleDeleteProjectRequest = (id) => {
    projectController.deleteProject(id);

    projectController.sync();

    const currentProjectId = projectController.getCurrentProjectId();

    if (currentProjectId === id) {
      if (projectController.getProjects().length === 0) {
        return;
      }
      projectController.setCurrentProjectId(
        projectController.getProjects()[0].id,
      );
    }
    uiController.render(
      projectController.getProjects(),
      projectController.getCurrentProjectId(),
    );
  };

  const handleToggleTaskDropdownRequest = (id) => {
    projectController
      .getProject(projectController.getCurrentProjectId())
      .getTask(id)
      .toggleDropdown();

    projectController.sync();
    uiController.render(
      projectController.getProjects(),
      projectController.getCurrentProjectId(),
    );
  };

  const handleGetTaskRequest = (id) => {
    return projectController
      .getProject(projectController.getCurrentProjectId())
      .getTask(id);
  };

  const handleToggleTaskDoneRequest = (id) => {
    projectController
      .getProject(projectController.getCurrentProjectId())
      .getTask(id)
      .toggleDone();

    projectController.sync();
    uiController.render(
      projectController.getProjects(),
      projectController.getCurrentProjectId(),
    );
  };

  const setupTaskEditForm = (id) => {
    const task = projectController
      .getProject(projectController.getCurrentProjectId())
      .getTask(id);
    uiController.fillTaskFormFields(task);
  };

  const handleDeleteTaskRequest = (id) => {
    projectController
      .getProject(projectController.getCurrentProjectId())
      .deleteTask(id);

    projectController.sync();
    uiController.render(
      projectController.getProjects(),
      projectController.getCurrentProjectId(),
    );
  };

  const handleToggleChecklistItemDoneRequest = (taskId, checklistItemId) => {
    projectController
      .getProject(projectController.getCurrentProjectId())
      .getTask(taskId)
      .getChecklistItem(checklistItemId)
      .toggleDone();

    projectController.sync();
    uiController.render(
      projectController.getProjects(),
      projectController.getCurrentProjectId(),
    );
  };

  const setupChecklistItemEditForm = (taskId, checklistItemId) => {
    const checklistItem = projectController
      .getProject(projectController.getCurrentProjectId())
      .getTask(taskId)
      .getChecklistItem(checklistItemId);
    uiController.fillChecklistItemFormFields(checklistItem);
  };

  const handleDeleteChecklistItemRequest = (taskId, checklistItemId) => {
    projectController
      .getProject(projectController.getCurrentProjectId())
      .getTask(taskId)
      .deleteChecklistItem(checklistItemId);

    projectController.sync();
    uiController.render(
      projectController.getProjects(),
      projectController.getCurrentProjectId(),
    );
  };

  return {
    getFormMode,
    setFormMode,
    setCurrentProject,
    handleFormRequest,
    handleGetTaskRequest,
    setupTaskEditForm,
    handleToggleTaskDropdownRequest,
    handleToggleTaskDoneRequest,
    handleDeleteTaskRequest,
    handleToggleChecklistItemDoneRequest,
    setupChecklistItemEditForm,
    handleDeleteChecklistItemRequest,
    handleDeleteProjectRequest,
  };
})();
