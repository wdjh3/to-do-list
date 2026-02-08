import { ChecklistItem } from "./checklistItem.js";

/**
 * @enum {string}
 */
const PRIORITY = Object.freeze({
  URGENT_AND_IMPORTANT: "u&i",
  URGENT: "u",
  IMPORTANT: "i",
  NONE: "n",
});

export class Task {
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
