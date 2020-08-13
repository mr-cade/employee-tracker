# employee-tracker
This is a command line application and is a solution for managing a company's employees using node, inquirer, and MySQL. Tables are displayed in console using console.table npm package.

The database schema contains three tables:

* **department**:

  * **id** - INT PRIMARY KEY
  * **name** - VARCHAR(30) to hold department name

* **roles**:

  * **id** - INT PRIMARY KEY
  * **title** -  VARCHAR(30) to hold role title
  * **salary** -  DECIMAL to hold role salary
  * **department_id** -  INT to hold reference to department role belongs to

* **employee**:

  * **id** - INT PRIMARY KEY
  * **first_name** - VARCHAR(30) to hold employee first name
  * **last_name** - VARCHAR(30) to hold employee last name
  * **role_id** - INT to hold reference to role employee has
  * **manager_id** - INT to hold reference to another employee that manager of the current employee. This field may be null if the employee has no manager
  
The application allows the user to:

  * Add departments, roles, employees

  * View departments, roles, employees

  * Update employee roles, names, and managers

  ### Questions 

Please contact me via email at <cadelpetersen@gmail.com>
