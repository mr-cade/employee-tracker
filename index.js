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
    password: "",
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
            "Update an employee's data",
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

                case "Update an employee's data":
                    update();
                    break;
            }
        })
}

// query specific functions used above
// =========================================================
const employeeSearch = function () {
    questions({
        name: "id",
        type: "input",
        message: "Please enter the id of the employee you would like to view."
    })
        .then(function (answer) {
            var query = "SELECT * "
            query += "FROM employee "
            query += "INNER JOIN roles ON (employee.id = roles.id) "
            query += "INNER JOIN department ON (employee.id = department.id) "
            query += "WHERE employee.id = ?"

            connection.query(query, [answer.id], function (error, results, fields) {
                console.log("");
                console.table(results);
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
            var query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) "
            query += "VALUES (?, ?, ?, ?)"

            connection.query(query, [answer.fName, answer.lName, answer.role, answer.manager], function (error, results, fields) {
                console.table(results);
                if (error) throw error;
            })
            console.log("successfully added")
            start()
        })
}

const update = function () {
    questions([{
        name: "id",
        type: "input",
        message: "Please enter the ID of the employee you would like to update"
    },
    {
        name: "key",
        type: "rawlist",
        message: "Please choose the data of the employee you would like to update",
        choices: [
            "first_name",
            "last_name",
            "role_id",
            "manager_id"
        ]
    },
    {
        name: "value",
        type: "input",
        message: "Please enter the updated value of the employee you would like to update"
    }
    ])
        .then(function (answer) {
            var query = "UPDATE employee "
            query += "SET ? = ? "
            query += "WHERE employee.id = ?"

            connection.query(query, [answer.key, answer.value, answer.id], function (error, results, fields) {
                console.table(results);
                if (error) {
                    return console.log("unable to update as requested")
                }
            })
            console.log("successfully updated");
            start();
        })
}