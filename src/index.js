import { projectController } from "./controller/projectController.js";
import { uiController } from "./controller/uiController.js";
import { coordinator } from "./controller/coordinator.js";
import "./styles.css";

projectController.loadData();
projectController.setCurrentProjectId(projectController.getProjects()[0].id);
uiController.start();
uiController.render(projectController.getProjects(), projectController.getCurrentProjectId());

// TODO: Delete after development
console.log(projectController.getProjects())

window.projectController = projectController;
window.uiController = uiController;
window.coordinator = coordinator;