const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

// set up connection to server
// =========================================================
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    PORT: 3306,

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
            "View all employees",
            "View all employees by manager",
            "View all departments",
            "View all roles",
            "Search Employees",
            "Add employees",
            "Add departments",
            "Add roles",
            "Update an employee's data"
        ]
    })
        .then(function (answer) {
            switch (answer.action) {
                case "View all employees":
                    allEmployees();
                    break;
                
                case "View all employees by manager":
                    employeesByManager();
                    break;

                case "View all departments":
                    allDepartments();
                    break;

                case "View all roles":
                    allRoles();
                    break;

                case "Search Employees":
                    employeeSearch();
                    break;

                case "Add employees":
                    addEmployee();
                    break;

                case "Add roles":
                    addRole();
                    break;

                case "Add departments":
                    addDepartment();
                    break;

                case "Update an employee's data":
                    update();
                    break;
            }
        })
}

// query specific functions used above in main program
// =========================================================
const allEmployees = function () {
    var query = "SELECT * "
    query += "FROM employee "
    query += "LEFT JOIN roles ON (employee.role_id = roles.id) "
    query += "LEFT JOIN department ON (employee.id = department.id)"

    connection.query(query, function (error, results, fields) {
        console.log("");
        console.table(results);
    })
    start()
}

const allDepartments = function () {
    var query = "SELECT * "
    query += "FROM department "

    connection.query(query, function (error, results, fields) {
        console.log("");
        console.table(results);
    })
    start();
}

const allRoles = function () {
    var query = "SELECT * "
    query += "FROM roles "
    query += "INNER JOIN department ON (roles.department_id = department.id)"

    connection.query(query, function (error, results, fields) {
        console.log("");
        console.table(results);
    })
    start();
}

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

// Add Functions =====
const addEmployee = function () {
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

const addDepartment = function () {
    questions([{
        name: "name",
        type: "input",
        message: "Please enter the name of the department you would like to add"
    }]
    )
        .then(function (answer) {
            var query = "INSERT INTO department (department_name) "
            query += "VALUES (?)"

            connection.query(query, [answer.name], function (error, results, fields) {
                console.table(results);
                if (error) throw error;
            })
            console.log("successfully added")
            start()
        })
}

const addRole = function () {
        questions([{
            name: "title",
            type: "input",
            message: "Please enter the title of the role you would like to add"
        },
        {
            name: "salary",
            type: "input",
            message: "Please enter the salary of the role you would like to add"
        },
        {
            name: "department_id",
            type: "input",
            message: "Please enter the department ID of the role you would like to add"
        }]
        )
            .then(function (answer) {
                var query = "INSERT INTO roles (title, salary, department_id) "
                query += "VALUES (?, ?, ?)"
    
                connection.query(query, [answer.title, answer.salary, answer.department_id], function (error, results, fields) {
                    console.table(results);
                    if (error) throw error;
                })
                console.log("successfully added")
                start()
            })
}
// ===================

// update function ====
const update = function () {
    questions([{
        name: "id",
        type: "input",
        message: "Please enter the ID of the employee you would like to update"
    },
    {
        name: "employeeAttribute",
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
        name: "employeeValue",
        type: "input",
        message: "Please enter the updated value of the employee you would like to update"
    }
    ])
        .then(function (answer) {
            console.log(answer);
            switch (answer.employeeAttribute) {
                case "first_name":
                    var query = "UPDATE employee SET first_name = ? WHERE id = ?"
                    connection.query(query, [answer.employeeValue, Number(answer.id)], function (error, results, fields) {
                        console.table(results);
                        if (error) {
                            return console.log(error);
                        }
                    })
                    console.log("successfully updated");
                    start();
                    break;

                case "last_name":
                    var query = "UPDATE employee SET last_name = ? WHERE id = ?"
                    connection.query(query, [answer.employeeValue, Number(answer.id)], function (error, results, fields) {
                        console.table(results);
                        if (error) {
                            return console.log(error);
                        }
                    })
                    console.log("successfully updated");
                    start();
                    break;

                case "role_id":
                    var query = "UPDATE employee SET role_id = ? WHERE id = ?"
                    connection.query(query, [answer.employeeValue, Number(answer.id)], function (error, results, fields) {
                        console.table(results);
                        if (error) {
                            return console.log(error);
                        }
                    })
                    console.log("successfully updated");
                    start();
                    break;

                case "manager_id":
                    var query = "UPDATE employee SET manager_id = ? WHERE id = ?"
                    connection.query(query, [answer.employeeValue, Number(answer.id)], function (error, results, fields) {
                        console.table(results);
                        if (error) {
                            return console.log(error);
                        }
                    })
                    console.log("successfully updated");
                    start();
                    break;
            }
})}