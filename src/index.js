import { Project } from "./models/project.js";

const projectController = (() => {
  let projectList = [];

  const loadData = () => {
    const rawData = storageManager.load();

    if (rawData && rawData.length > 0) {
      projectList = rawData.map((project) => Project.fromJSON(project));
    }
  };

  const addProject = (name) => {
    projectList.push(new Project(name));
  };

  const getProjects = () => {
    return JSON.parse(JSON.stringify(projectList));
  };

  const getProject = (id) => {
    return projectList.find((project) => project.id === id);
  };

  const sync = () => {
    storageManager.save(projectList);
  };

  return { loadData, addProject, getProjects, getProject, sync };
})();

/**
 * @enum {string}
 */
const PRIORITY = Object.freeze({
  URGENT_AND_IMPORTANT: "u&i",
  URGENT: "u",
  IMPORTANT: "i",
  NONE: "n",
});

const storageManager = (() => {
  const save = (data) => {
    localStorage.setItem("Project List", JSON.stringify(data));
  };

  const load = () => {
    const data = localStorage.getItem("Project List");
    return data ? JSON.parse(data) : null;
  };

  return { save, load };
})();

projectController.loadData();

window.projectController = projectController;
window.storageManager = storageManager;
