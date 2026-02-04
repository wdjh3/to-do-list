const listController = (() => {
  let taskList = [];

  const addTask = (title, description, dueDate, priority) => {
    taskList.push(new Task(title, description, dueDate, priority));
  };

  const deleteTask = (id) => {
    taskList = taskList.filter((task) => task.id !== id);
  };

  const addChecklistItemToTask = (id, title, description) => {
    const task = taskList.find((item) => item.id === id);
    task.addChecklistItem(title, description);
  };

  const deleteChecklistItemFromTask = (taskId, checklistItemId) => {
    const task = taskList.find((item) => item.id === taskId);
    task.deleteChecklistItem(checklistItemId);
  };

  const showList = () => {
    return [...taskList]; // Task properties and methods and checklist can still be manipulated
  };

  return {
    addTask,
    showList,
    deleteTask,
    addChecklistItemToTask,
    deleteChecklistItemFromTask,
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
}

window.listController = listController;

