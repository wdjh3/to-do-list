import { projectController } from "./controller/projectController.js";
import { storageManager } from "./storage/storageManager.js";

projectController.loadData();

window.projectController = projectController;
window.storageManager = storageManager;
