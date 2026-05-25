/* this module handles all activities like add, removing updating
and deleting workspaces
*/

import { testTodoData } from "./dataStore.js";

/**
 * createWorkspace - creates a workspace
 * @newWorkspace: new workspace to create
 * @workspaceOj: global workspace obj
 * 
 * Return: A new eorkspace obj
 */

export const createWorkspace = (workspaceObj, newWorkspace) => {
	workspaceObj[newWorkspace] = [];

	return workspaceObj;
}

let myObj = {...testTodoData};
// console.log(createWorkspace(myObj, "Food"));

/**
 * updateWorkspace - updates the name of a given workspace
 * @newWorkspaceName: the workspace name
 * @oldWorkspaceName: name of the old workspace
 * @workspaces: The workspace object
 * 
 * Return: a new workspace
 */

export const updateWorkspace = (workspaceObj, oldWorkspaceName, newWorkspaceName) => {
	const newWorkspaceObj = {};

	for (let  key in workspaceObj) {
		const newKey = key === oldWorkspaceName ? newWorkspaceName : key;
		newWorkspaceObj[newKey] = workspaceObj[key];
	}

	return newWorkspaceObj;
}

// console.log(updateWorkspace(myObj, "Health", "Income"));

/**
 * deleteWorkspace - deletes a workspace from the global workspace object
 * @workspace: The workspace to delete rom the workspace obj
 * @workspaceObj: The global workspaceobject
 * 
 * Return: A new workspace object
 */

export const deleteWorkspace = (workspaceObj, workspace) => {
	const newWorkspaceObj = {};
	const list = Object.entries(workspaceObj).filter((t) => t[0] !== workspace);
	list.forEach((item) => {
		newWorkspaceObj[item[0]] = item[1];
	});

	return newWorkspaceObj;
}

/* let workspace = "Morning Job";
// workspace = "Health";
workspace = "Personal";
console.log(deleteWorkspace(testTodoData, workspace));*/


/*CRUD opration for tasks */

/**
 * addTask - adds a task to the current workspace
 * workspaceObj: global workspace object
 * @currWorkspace: The current workspace
 * @task: task to be added to the workspace
 * 
 * Return: The current workspace or test purposes
 */

const addTask = (workspaceObj, currWorkspace, task) => {
	Object.keys(workspaceObj).some((workspace) => {
		if (workspace === currWorkspace) {
			workspaceObj[currWorkspace].push(task);
			return true;
		}

		return false;
	})

	return Object.fromEntries(
		Object.entries(workspaceObj).filter(([k, v]) => k === currWorkspace)
	);
}

let task = {
	id: 17156840001243,
	taskName: "Buy a football",
	priority: "High",
	dueDate: "2026-07-02",
	progress: "undone"
}
let workspace = "Personal";
workspace = "Health";
// console.log(addTask(myObj, workspace, task));

/**
 * updateTask - update task enties
 */