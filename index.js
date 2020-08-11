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

            connection.query(query, [answer.fName] ,function (error, results, fields) {
                console.log(cTable.getTable([results]));
                console.log(results);
            })
        })
}

const add = function () {
    console.log("not built yet");
    var query = "INSERT INTO employee ()"
}

const update = function () {
    console.log("not built yet");
}