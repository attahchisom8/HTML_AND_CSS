export const testTodoData = {
  "Health": [
    {
      id: 1715684000123,
      taskName: "Morning Jog",
      priority: "Medium",
      dueDate: "2026-05-26",
      progress: "done"
    },
    {
      id: 1715684000456,
      taskName: "Doctor Appointment",
      priority: "High",
      dueDate: "2026-05-28",
      progress: "undone"
    }
  ],
  "Work": [
    {
      id: 1715684000789,
      taskName: "Finish Sprint Review",
      priority: "High",
      dueDate: "2026-05-27",
      progress: "pending"
    }
  ],
  "Personal": [] // Empty workspace ready for input
};

/**
 * 
 * @returns getStoreData - gets an item from local storage
 * 
 * Return: The item gotten from storage
 */

export const getStoreData = () => {
	const workspaceObj = JSON.parse(localStorage.getItem("workspaceObj"));
	return workspaceObj;

}


/**
 * save - saves an item to the global workspace object
 * @workspaceObj: A global object that stores list of workspaces
 * @key: workspace name
 * @value: A list of tasks to store in the  current workspace
 * 
 * Return: void
 */
export const save = (workspaceObj, key, value) => {
	workspaceObj[key].push(value);
}

/**
 * saveToStore - A fuunction that saves the workspaceObj to locstorage
 * @workspaceObj: the global workspace object
 * 
 * Return: void
 */

export  const saveToStore = (workspaceObj) => {
	localStorage.setItem("workspaceObj", JSON.stringify(workspaceObj));

}