const projectController = (() => {
  let projectList = [];

  return { projectList };
})();

const listController = (() => {
  let taskList = [];

  const addTask = (title, description, dueDate, priority) => {
    taskList.push(new Task(title, description, dueDate, priority));
  };

  const editTask = (id, title, description, dueDate, priority) => {
    const task = taskList.find((item) => item.id === id);
    task.title = title;
    task.description = description;
    task.dueDate = dueDate;
    task.priority = priority;
  };

  const toggleTaskDone = (id) => {
    const task = taskList.find((item) => item.id === id);
    task.toggleDone();
  };

  const deleteTask = (id) => {
    taskList = taskList.filter((task) => task.id !== id);
  };

  const addChecklistItemToTask = (id, title, description) => {
    const task = taskList.find((item) => item.id === id);
    task.addChecklistItem(title, description);
  };

  const editChecklistItemFromTask = (
    taskId,
    checklistItemId,
    title,
    description,
  ) => {
    const task = taskList.find((item) => item.id === taskId);
    task.editChecklistItem(checklistItemId, title, description);
  };

  const toggleChecklistItemDone = (taskId, checklistItemId) => {
    const task = taskList.find((item) => item.id === taskId);
    task.toggleChecklistItemDone(checklistItemId);
  };

  const deleteChecklistItemFromTask = (taskId, checklistItemId) => {
    const task = taskList.find((item) => item.id === taskId);
    task.deleteChecklistItem(checklistItemId);
  };

  const getList = () => {
    return [...taskList]; // Task properties and methods and checklist can still be manipulated
  };

  return {
    addTask,
    editTask,
    toggleTaskDone,
    deleteTask,
    addChecklistItemToTask,
    editChecklistItemFromTask,
    toggleChecklistItemDone,
    deleteChecklistItemFromTask,
    getList,
  };
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

window.listController = listController;
