import { projectController } from "./controller/projectController.js";
import { uiController } from "./controller/uiController.js";
import "./styles.css";

projectController.loadData();
uiController.start()

window.projectController = projectController;
