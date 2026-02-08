export const storageManager = (() => {
  const save = (data) => {
    localStorage.setItem("Project List", JSON.stringify(data));
  };

  const load = () => {
    const data = localStorage.getItem("Project List");
    return data ? JSON.parse(data) : null;
  };

  return { save, load };
})();
