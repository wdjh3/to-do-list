import { projectController } from "./controller/projectController.js";
import { storageManager } from "./storage/storageManager.js";

/**
 * @enum {string}
 */
const PRIORITY = Object.freeze({
  URGENT_AND_IMPORTANT: "u&i",
  URGENT: "u",
  IMPORTANT: "i",
  NONE: "n",
});

projectController.loadData();

window.projectController = projectController;
window.storageManager = storageManager;
