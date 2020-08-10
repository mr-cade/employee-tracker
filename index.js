const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "20164Runner",
    database: "employeeTracker_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    start();
});

// Function to run inquirer
function questions(options) {
    return inquirer.prompt(options);
}

// main function to run program
const start = function () {
    questions({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
            "View Employees",
            "Add departments, roles, and employees",
            "Update an employee's role",
        ]
    })
    .then(function (answer) {
        switch (answer.action) {
            case "View Employees":
                employeeSearch();
                break;

            case "Add departments, roles, and employees":
                add();
                break;

            case "Update an employee's role":
                update();
                break;
        }
    })
}

const employeeSearch = function () {

}

const add = function () {
    
}

const update = function () {
    
}