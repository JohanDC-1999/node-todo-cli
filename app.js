import fs from 'fs/promises';
import inquirer from 'inquirer';
import path from 'path'

const PATH_TO_TASKS = 'tasks.json';

// Function to read tasks from the JSON file
async function readTasks() {
    try {
        const data = await fs.readFile(path.join(PATH_TO_TASKS), 'utf-8');
        return data ? JSON.parse(data) : null;
        // let tasks = JSON.parse(data);
        // // console.log(tasks[0]);
    } catch (error) {
        console.log(`Error: ${error}`);
    }

}

// Print the tasks to the console
async function displayTasks() {
    const tasks = await readTasks();
    if (!tasks || tasks.length === 0) {
        console.log('No tasks yet!');
        return;
    }
    console.log('\n--- Your To-Do List ---');
    tasks.forEach((task, index) => {
        const status = task.done ? '[x]' : '[ ]';
        // console.log(task.id);
        console.log(`${index + 1}. ${status} ${task.taskDescription}`);
    });
    console.log('------------------------\n');
}

async function getNewTaskData() {
    const { taskDescription }  = await inquirer.prompt([
        {
            type: 'input',
            name: 'taskDescription',
            message: 'What would you like the task to say?'
        }
    ]);
  
    if (taskDescription) {
        const tasks = await readTasks() ?? []; // If array is null (does not exist) set to empty array
        let taskId = tasks.length > 0 ? tasks[tasks.length-1].id + 1 : 1;
        tasks.push({id: taskId, taskDescription: taskDescription, done: false });
        await createTask(tasks);
        console.log('Task added successfully!');
    } else {
        console.log('Task description cannot be empty.');
    }


    // return task;
}

async function createTask(taskData) {
    await fs.writeFile(PATH_TO_TASKS, JSON.stringify(taskData, null, 2), 'utf8');
    console.log("See here:" + taskData);
}

// Use this function to show a prompt on which tasks to mark as complete
async function markTask(){ //TODO: Split into 3 functions →  promptTasksToMarkDone(tasks), updateTasksWithDoneStatus(tasks, tasksToMarkDone), saveUpdatedTasks(updatedTasks), 
    let tasks = await readTasks() ?? [];
    if(!tasks || tasks.length == 0){
        console.log("No tasks yet!");
        return;
    }
    const { tasksToMarkDone } = await inquirer.prompt([
        {
            type: 'checkbox',
            name: 'tasksToMarkDone',
            message: 'Choose a task to mark as complete - use arrow keys and <Space>',
            choices: tasks.map(task => task.taskDescription) // Extract from the json and return task descriptions only
        }
    ])

    const updatedArray = tasks.map(task => {
        if(tasksToMarkDone.includes(task.taskDescription)){
            return {...task, done: true} // Mark as done
        }
        return task;
    });

    console.log(updatedArray);

    // Update the tasks by marking as done
    await fs.writeFile(PATH_TO_TASKS, JSON.stringify(updatedArray, null, 2), 'utf-8');
}

async function deleteTask(){
    let tasks = await readTasks();
    if (tasks.length === 0) {
        console.log('No tasks yet!');
        return;
    }
    let { tasksToDelete } = await inquirer.prompt([
        {
            type: "checkbox",
            name: "tasksToDelete",
            message: "Choose which task(s) to delete - use arrow keys and space",
            choices: tasks.map(task => task.taskDescription)
        }
    ]);

    let newArr = tasks.filter((task) => {
        return !tasksToDelete.includes(task.taskDescription);
    });

    await createTask(newArr);
    console.log('Task(s) deleted')
}

async function main() {
    let running = true;
    // Continue running until user chooses to exit
    while (running) {
        // Find the chosen choice and destructure the object
        const { action } = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: [
                    'View Tasks',
                    'Add Task',
                    'Mark as Done',
                    'Delete Task',
                    'Exit',
                ],
            },
        ]);

        switch (action) {
            case "View Tasks":
                await displayTasks();
                break;
            case "Add Task":
                await getNewTaskData();
                break;
            case "Mark as Done":
                await markTask();
                break;
            case "Delete Task":
                await deleteTask();
                break;
            case "Exit":
                running = false; 
        }

    }
}
main();