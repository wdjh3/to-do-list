import { projectController } from "./controller/projectController.js";
import "./styles.css";

projectController.loadData();

window.projectController = projectController;
