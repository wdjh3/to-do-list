import { Task } from "./models/task.js";

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

class Project {
  constructor(name) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.taskList = [];
  }

  static fromJSON(data) {
    const taskList = data.taskList.map((task) => Task.fromJSON(task));
    const project = new Project(data.name);

    project.id = data.id;
    project.taskList = taskList;

    return project;
  }

  edit = (name) => {
    this.name = name;
  };

  addTask = (title, description, dueDate, priority) => {
    this.taskList.push(new Task(title, description, dueDate, priority));
  };

  deleteTask = (id) => {
    this.taskList = this.taskList.filter((task) => task.id !== id);
  };

  getTasks = () => {
    return JSON.parse(JSON.stringify(this.taskList));
  };

  getTask = (id) => {
    return this.taskList.find((task) => task.id === id);
  };

  getList = () => {
    return [...this.taskList]; // Task properties and methods and checklist can still be manipulated
  };
}

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
