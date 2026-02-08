export class ChecklistItem {
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
