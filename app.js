// Importing the 'fs/promises' module directly
import fs from 'fs/promises';

// Importing the 'inquirer' module
import inquirer from 'inquirer';
import path from 'path'
// const inquirer = require('inquirer');
// import inquirer from "inquirer";
// const fs = require('fs').promises;
// import fs from "fs/promises";
// const fs = require('fs');
// const path = require('path');
const PATH_TO_TASKS = 'tasks.json';

// Function to read tasks from the JSON file
async function readTasks() {
    try {
        const data = await fs.readFile(path.join(PATH_TO_TASKS), 'utf-8');
        return JSON.parse(data);
        // let tasks = JSON.parse(data);
        // // console.log(tasks[0]);
    } catch (error) {
        console.log(`Error: ${error}`);
    }

}

// Print the tasks to the console
async function displayTasks() {
    const tasks = await readTasks();
    if (tasks.length === 0) {
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
        const tasks = await readTasks();
        tasks.push({id: tasks[tasks.length-1].id + 1, taskDescription: taskDescription, done: false });
        await createTask(tasks);
        console.log('Task added successfully!');
    } else {
        console.log('Task description cannot be empty.');
    }


    // return task;
}

async function createTask(taskData) {

    await fs.writeFile(PATH_TO_TASKS, JSON.stringify(taskData, null, 2), 'utf8');
   /* let taskToCreate = await createTask();
    try {
        const content = 'Some content!';
        await fs.writeFile('/Users/joe/test.txt', content);
    } catch (err) {
        console.log(err);
    }
        */
    console.log("See here:" + taskData);
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
            case "Exit":
                running = false; 
        }

    }
}
main();