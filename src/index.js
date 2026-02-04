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
    console.log([...taskList]);
  };

  return {
    addTask,
    showList,
    deleteTask,
    addChecklistItemToTask,
    deleteChecklistItemFromTask,
  };
})();

// TODO: Priority enum
const Priority = {};

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
   *  @param {string} priority
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
      this.checklist = this.checklist.filter((task) => task.id !== id);
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

