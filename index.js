const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

// set up connection to server
// =========================================================
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
// =========================================================
function questions(options) {
    return inquirer.prompt(options);
}

// main function to run program
// =========================================================
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

// query specific functions
// =========================================================
const employeeSearch = function () {
    questions({
        name: "fName",
        type: "input",
        message: "Please enter the first name of the employee you would like to view."
    })
        .then(function (answer) {
            var query = "SELECT * "
            query += "FROM employee "
            query += "WHERE first_name = ?"

            connection.query(query, [answer.fName], function (error, results, fields) {
                console.table(results)
            })
            start()
        })
}

const add = function () {
    questions([{
        name: "fName",
        type: "input",
        message: "Please enter the first name of the employee you would like to add"
    },
    {
        name: "lName",
        type: "input",
        message: "Please enter the last name of the employee you would like to add"
    },
    {
        name: "role",
        type: "input",
        message: "Please enter the role ID of the employee you would like to add"
    },
    {
        name: "manager",
        type: "input",
        message: "Please enter the manager ID of the employee you would like to add"
    }]
    )
        .then(function (answer) {
            console.log("questions answered")
            var query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) "
            query += "VALUES (?, ?, ?, ?)"

            connection.query(query, [answer.fName, answer.lName, answer.role, answer.manager], function (error, results, fields) {
                        console.table(results);
                    })
                    console.log("successfully added")
                    start()
                })
}

const update = function () {
    console.log("not built yet");
}