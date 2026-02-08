import { Project } from "../models/project.js";
import { storageManager } from "../storage/storageManager.js";

export const projectController = (() => {
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
