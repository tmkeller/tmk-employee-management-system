USE employee_db;

INSERT INTO department (name) VALUE ("Engineering");
INSERT INTO department (name) VALUE ("Marketing");
INSERT INTO department (name) VALUE ("Human Resources");
INSERT INTO department (name) VALUE ("Testing");

INSERT INTO role (title, salary, department_id) VALUE ("Lead Developer", "153482.99", 1);
INSERT INTO role (title, salary, department_id) VALUE ("Developer", "91340.32", 1);
INSERT INTO role (title, salary, department_id) VALUE ("Director of Sales", "190040.84", 2);
INSERT INTO role (title, salary, department_id) VALUE ("Account Specialist", "62010.01", 2);
INSERT INTO role (title, salary, department_id) VALUE ("Secretary", "32000", 2);
INSERT INTO role (title, salary, department_id) VALUE ("Director of Talent Acquisition", "85002.00", 3);
INSERT INTO role (title, salary, department_id) VALUE ("Recruiter", "55000.70", 3);
INSERT INTO role (title, salary, department_id) VALUE ("Analyst", "44322.55", 3);
INSERT INTO role (title, salary, department_id) VALUE ("Test Engineer", "31300.77", 4);
INSERT INTO role (title, salary, department_id) VALUE ("Director of Test", "88030", 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ("Chomie", "Usaneerungrueng", 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ("Tim", "Keller", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ("Samuel", "Fox", 2, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ("Chad", "Salesdunker", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ("Sandy", "Sweetsale", 4, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ("Joel", "Domenico", 5, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ("Mandy", "Resourcegött", 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ("Sebille", "Sickayerbs", 2, 7);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ("Sally", "Smartsource", 2, 7);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ("Dan", "Von Testington", 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ("Bobby", "Testling", 2, 10);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ("Alice", "Testler", 2, 10);

-- SELECT * FROM department;
-- SELECT * FROM role;
-- SELECT * FROM employee;