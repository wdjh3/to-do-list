const listController = (() => {
  let taskList = [];

  const addTask = (title, description, dueDate, priority) => {
    taskList.push(new Task(title, description, dueDate, priority));
  };

  const showList = () => {
    console.log([...taskList]);
  }

  return { addTask, showList };
})();

// TODO: Priority enum
const Priority = {

}

class Task {
    /**
     *  @param {string} id
     *  @param {string} title
     *  @param {string} description
     *  @param {Date} dueDate
     *  @param {string} priority
     *  @param {Task[]} checklist
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
}

window.listController = listController;