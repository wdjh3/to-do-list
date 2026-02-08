import { Task } from "./task.js";

export class Project {
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
