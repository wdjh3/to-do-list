const projectController = (() => {
  let projectList = [];

  const addProject = (name) => {
    projectList.push(new Project(name));
  };

  return { projectList, addProject };
})();

class Project {
  constructor(name) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.taskList = [];
  }

  // TODO: Add fromJSON method

  addTask = (title, description, dueDate, priority) => {
    this.taskList.push(new Task(title, description, dueDate, priority));
  };

  editTask = (id, title, description, dueDate, priority) => {
    const task = this.taskList.find((item) => item.id === id);
    task.title = title;
    task.description = description;
    task.dueDate = dueDate;
    task.priority = priority;
  };

  toggleTaskDone = (id) => {
    const task = this.taskList.find((item) => item.id === id);
    task.toggleDone();
  };

  deleteTask = (id) => {
    this.taskList = this.taskList.filter((task) => task.id !== id);
  };

  addChecklistItemToTask = (id, title, description) => {
    const task = this.taskList.find((item) => item.id === id);
    task.addChecklistItem(title, description);
  };

  editChecklistItemFromTask = (taskId, checklistItemId, title, description) => {
    const task = this.taskList.find((item) => item.id === taskId);
    task.editChecklistItem(checklistItemId, title, description);
  };

  toggleChecklistItemDone = (taskId, checklistItemId) => {
    const task = this.taskList.find((item) => item.id === taskId);
    task.toggleChecklistItemDone(checklistItemId);
  };

  deleteChecklistItemFromTask = (taskId, checklistItemId) => {
    const task = this.taskList.find((item) => item.id === taskId);
    task.deleteChecklistItem(checklistItemId);
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

  addChecklistItem = (title, description) => {
    this.checklist.push(new ChecklistItem(title, description));
  };

  editChecklistItem = (id, title, description) => {
    const item = this.checklist.find((item) => item.id === id);
    item.title = title;
    item.description = description;
  };

  toggleChecklistItemDone = (id) => {
    const item = this.checklist.find((item) => item.id === id);
    item.toggleDone();
  };

  deleteChecklistItem = (id) => {
    if (this.hasChecklistItem(id)) {
      this.checklist = this.checklist.filter((item) => item.id !== id);
      return true;
    } else {
      return false;
    }
  };

  hasChecklistItem = (id) => {
    if (this.checklist.find((item) => item.id === id)) {
      return true;
    } else {
      return false;
    }
  };

  toggleDone = () => {
    this.isDone = !this.isDone;
  };
}

window.projectController = projectController;
