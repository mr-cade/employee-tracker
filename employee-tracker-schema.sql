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
  id INT PRIMARY KEY
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10, 2) NOT NULL,
  department_id INT default 0,
  PRIMARY KEY (id)
);

CREATE TABLE department(
  department_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

-- seed data
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sterling", "Archer", 1, 1), ("Lana", "Kane", 2, 2), ("Algernon", "Krieger", 3, 3);
