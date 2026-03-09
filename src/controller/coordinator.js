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
          .getTask()
          .addChecklistItem(
            formDataObject["checklist-item-title"],
            formDataObject["checklist-item-description"],
          );
      }
    }

    uiController.render(
      projectController.getProjects(),
      projectController.getCurrentProjectId(),
    );
  };

  return { getFormMode, setFormMode, handleFormRequest };
})();
