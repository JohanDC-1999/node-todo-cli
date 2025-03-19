# node-todo-cli

A simple command-line To-Do List application built with Node.js.

## Description

This application allows you to manage your tasks directly from the command line. You can add, view, mark tasks as completed, and delete tasks. It utilizes a JSON file to persist your task data.

## Installation

1.  **Clone the Repository:**

    ```bash
    git clone https://github.com/JohanDC-1999/node-todo-cli.git
    ```

2.  **Navigate to the Project Directory:**

    ```bash
    cd node-todo-cli
    ```

3.  **Install Dependencies:**

    ```bash
    npm install
    ```

## Usage

1.  **Run the Application:**

    ```bash
    node app.js
    ```


2.  **Follow the Prompts:**

    The application will present a menu with options to view tasks, add tasks, mark tasks as done, delete tasks, or exit.

    * **View Tasks:** Displays the current list of tasks and their status.
    * **Add Task:** Prompts you to enter a new task description.
    * **Mark as Done:** Prompts you to enter the number of the task to mark as completed.
    * **Delete Task:** Prompts you to enter the number of the task to delete.
    * **Exit:** Closes the application.

## Dependencies

-   [`inquirer`](https://www.npmjs.com/package/inquirer): For interactive command-line prompts.

## Data Storage

Tasks are stored in a `tasks.json` file located in the project's root directory.

## Resources

- [Node.js `fs` documentation](https://nodejs.org/api/fs.html)
- [Writing files with Node.js](https://nodejs.org/en/learn/manipulating-files/writing-files-with-nodejs)
- [Node.js Tutorial - 60 - Interactive CLI Tools](https://youtu.be/sJdqdGxRbXY?si=OOQ6Fdnb-MvjBt6f) (Useful guide for seeing how to use `inquirer`)