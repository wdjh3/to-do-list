import { projectController } from "./controller/projectController.js";
import { uiController } from "./controller/uiController.js";
import "./styles.css";

projectController.loadData();
projectController.setCurrentProjectId(projectController.getProjects()[0].id);
uiController.start();
uiController.render(projectController.getProjects(), projectController.getCurrentProjectId());

window.projectController = projectController;
window.uiController = uiController;