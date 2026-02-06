const projectController = (() => {
  let projectList = [];

  const addProject = (name) => {
    projectList.push(new Project(name));
  };

  const getProject = (id) => {
    return projectList.find((project) => project.id === id);
  };

  return { projectList, addProject, getProject };
})();

class Project {
  constructor(name) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.taskList = [];
  }

  // TODO: Add fromJSON method

  edit = (name) => {
    this.name = name;
  };

  addTask = (title, description, dueDate, priority) => {
    this.taskList.push(new Task(title, description, dueDate, priority));
  };

  deleteTask = (id) => {
    this.taskList = this.taskList.filter((task) => task.id !== id);
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

  toggleDone = () => {
    this.isDone = !this.isDone;
  };
}

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

  getChecklistItem = (id) => {
    return this.checklist.find((item) => item.id === id);
  };

  toggleDone = () => {
    this.isDone = !this.isDone;
  };
}

window.projectController = projectController;
