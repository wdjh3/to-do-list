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

class Task {
  // TODO: move checklist to #checklist here
  /**
   *  @param {string} id
   *  @param {string} title
   *  @param {string} description
   *  @param {Date} dueDate
   *  @param {keyof PRIORITY} priority
   *  @param {ChecklistItem[]} checklist
   *  @param {boolean} isDone
   */
  constructor(title, description, dueDate, priority) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.checklist = [];
    this.isDone = false;
  }

  static fromJSON(data) {
    const checklist = data.checklist.map((item) =>
      ChecklistItem.fromJSON(item),
    );
    const task = new Task(
      data.title,
      data.description,
      data.dueDate, // TODO: Remember to wrap with new Date() to create valid Date object for use
      data.priority,
    );

    task.id = data.id;
    task.checklist = checklist;
    task.isDone = data.isDone;

    return task;
  }

  edit = (title, description, dueDate, priority) => {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  };

  addChecklistItem = (title, description) => {
    this.checklist.push(new ChecklistItem(title, description));
  };

  deleteChecklistItem = (id) => {
    if (this.getChecklistItem(id)) {
      this.checklist = this.checklist.filter((item) => item.id !== id);
      return true;
    } else {
      return false;
    }
  };

  getChecklistItems = () => {
    return JSON.parse(JSON.stringify(this.checklist));
  };

  getChecklistItem = (id) => {
    return this.checklist.find((item) => item.id === id);
  };

  toggleDone = () => {
    this.isDone = !this.isDone;
  };
}

class ChecklistItem {
  /**
   * @param {string} id
   * @param {string} title
   * @param {string} description
   * @param {boolean} isDone
   */
  constructor(title, description) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.isDone = false;
  }

  edit = (title, description) => {
    this.title = title;
    this.description = description;
  };

  static fromJSON(data) {
    const item = new ChecklistItem(data.title, data.description);

    item.id = data.id;
    item.isDone = data.isDone;

    return item;
  }

  toggleDone = () => {
    this.isDone = !this.isDone;
  };
}

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

window.projectController = projectController;
window.storageManager = storageManager;
