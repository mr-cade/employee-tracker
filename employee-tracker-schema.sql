DROP DATABASE IF EXISTS employeeTracker_DB;
CREATE DATABASE employeeTracker_DB;

USE employeeTracker_DB;

CREATE TABLE employee(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT default 0,
  manager_id INT default 0,
  PRIMARY KEY (id)
);

CREATE TABLE roles(
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10, 2) NOT NULL,
  department_id INT default 0,
  PRIMARY KEY (id)
);

CREATE TABLE department(
  id INT NOT NULL AUTO_INCREMENT, 
  department_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

-- seed data
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sterling", "Archer", 1, 2), ("Lana", "Kane", 2, 5), ("Algernon", "Krieger", 3, 2), ("Mallory", "Archer", 4, NULL), ("Cyrill", "Figgis", 5, 4);

INSERT INTO roles (title, salary, department_id)
VALUES ("Engineer", 40000, 1), ("Manager", 100000, 2), ("Researcher", 120000, 3), ("CEO", 1000000, 2), ("CFO", 800000, 2);

INSERT INTO department (department_name)
VALUES ("Engineering"), ("Management"), ("Research and Development");

-- select everything
SELECT * FROM employee;
SELECT * FROM roles;
SELECT * FROM department;