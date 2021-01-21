const mysql = require('mysql');
const inquirer = require( 'inquirer' );

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employee_db'
})

init();

function init() {

    sandCatGreeting();

    inquirer.prompt(
        [
            {
                type: 'list',
                message: 'What would you like to do?',
                name: "option",
                choices: [ 
                    'Add a department', 'Add a role', 
                    'Add an employee', 'View departments', 
                    'View roles', 'View employees', 
                    'Update employee role', 'Quit'
                ]
            }
        ]
    ).then(( response ) => {
        switch ( response.option ) {

            case 'Add a department':
                console.log( "\nAdd a department:\n" );

                inquirer.prompt(
                    [
                        {
                            type: 'input',
                            message: 'Enter the name of the new department: ',
                            name: 'department_name'
                        }
                    ]
                ).then(( response ) => {
                    addToTable( "department", response.department_name );
                    init();
                });
                break;
                
            case 'Add a role':
                console.log( "\nAdd a role:\n" );

                // TODO: Get a list of all departments from SQL database
                // TODO: Put them all in an array assigned to the roleDept variable.
                const roleDept = [ "Engineering", "Human resources", "Sales" ];

                inquirer.prompt(
                    [
                        {
                            type: 'input',
                            message: 'Enter the name of the new role: ',
                            name: 'role_name'
                        },                    
                        {
                            type: 'input',
                            message: 'Enter the salary of the new role: ',
                            name: 'role_salary'
                        },                    
                        {
                            type: 'list',
                            message: 'Role\'s associated department: ',
                            name: 'role_department',
                            choices: roleDept
                        }
                    ]
                ).then(( response ) => {
                    const roleArr = [
                        response.role_name,
                        response.role_salary,
                        response.role_department
                    ]
                    addToTable( "role", roleArr );
                    init();
                });
                break;
                
            case 'Add an employee':
                console.log( "\nAdd an employee:\n" );

                // TODO: Get a list of all roles from SQL database
                // TODO: Put them all in an array assigned to the rolesEmployee variable.
                const rolesEmployee = [ "Technologist", "Knowledgeist", "Cat trainer" ];

                // TODO: Get a list of all managers from SQL database
                // TODO: Put them all in an array assigned to the managersEmployee variable.
                const managersEmployee = [ "Fred Johnson, ID#1", "Isabel Bellais, ID#23" ];
                managersEmployee.push( "Quit" );

                inquirer.prompt(
                    [
                        {
                            type: 'input',
                            message: 'First name: ',
                            name: 'first_name'
                        },
                        {
                            type: 'input',
                            message: 'Last name: ',
                            name: 'last_name'
                        },
                        {
                            type: 'list',
                            message: 'Employee role: ',
                            name: 'employee_role',
                            choices: rolesEmployee
                        },
                        {
                            type: 'list',
                            message: 'Select a manager: ',
                            name: 'managers_list',
                            choices: managersEmployee
                        }
                    ]
                ).then(( response ) => {
                    const employeeArr = [
                        response.first_name, 
                        response.last_name, 
                        response.employee_role, 
                        response.managers_list
                    ]
                    addToTable( "employee", employeeArr );
                    init();
                });
                break;
                
            case 'View departments':
                console.log( "\nView departments:\n" );

                // TODO: Get a list of all departments from SQL database
                // TODO: Put them all in an array assigned to the departments variable.
                const departments = []
                departments.push( 'All' );

                inquirer.prompt(
                    [
                        {
                            type: 'list',
                            message: '\nDepartment name: ',
                            name: 'department',
                            choices: departments
                        }
                    ]
                ).then(( response ) => {
                    viewTable( 'department', response.department );
                    init();
                });
                break;
                
            case 'View roles':
                console.log( "\nView roles:\n" );

                // TODO: Get a list of all roles from SQL database
                // TODO: Put them all in an array assigned to the roles variable.
                const roles = []
                roles.push( 'All' );

                inquirer.prompt(
                    [
                        {
                            type: 'list',
                            message: '\nRole to view: ',
                            name: 'role',
                            choices: roles
                        }
                    ]
                ).then(( response ) => {
                    viewTable( "role", response.role );
                    init();
                });
                break;
                
            case 'View employees':
                console.log( "\nView employees:\n" );

                // TODO: Get a list of all employees from SQL database
                // TODO: Put them all in an array assigned to the employees variable.
                const employeesView = []
                employeesView.push( 'All' );

                inquirer.prompt(
                    [
                        {
                            type: 'list',
                            message: 'Select an employee: ',
                            name: 'employees',
                            choices: employeesView
                        }
                    ]
                ).then(( response ) => {
                    viewTable( 'employee', response.employees );
                    init();
                });
                break;
                
            case 'Update employee role':
                console.log( "\nUpdate employee role:\n" );

                // TODO: Get a list of all employees from SQL database
                // TODO: Put them all in an array assigned to the employees variable.
                const employeesUpdate = [ "Bob", "Joe", "Jane" ];

                // TODO: Get a list of all roles from SQL database
                // TODO: Put them all in an array assigned to the roles variable.
                const rolesUpdate = [];
                rolesUpdate.push( 'Add new' );

                inquirer.prompt(
                    [   
                        {
                            type: 'list',
                            message: 'Select an employee: ',
                            name: 'employee',
                            choices: employeesUpdate
                        },
                        {
                            type: 'list',
                            message: 'Select a role: ',
                            name: 'role',
                            choices: rolesUpdate
                        }
                    ]
                ).then(( response ) => {
                    updateEmployeeRole( response.employee, response.role );
                    init();
                });
                break;
                
            default: // Quit selection
                sandCatLogOff();
                break;
        }
    });
}

function sandCatGreeting() {
    console.log("\nWelcome to SandCaT industries!\n");
}

function sandCatLogOff() {
    console.log("\nLogging off. Have a nice day!\n" );
}

// TODO: 1st priority, add code to add a department, role, or employee.
function addToTable( table, row ) {
    console.log( "addToTable", table, row );
}
// TODO: 1st priority, add code to view a department, role, or employee.
function viewTable( table, row ) {
    console.log( "viewTable", table, row );
}
// TODO: 1st priority, add code to update an employee's role.
function updateEmployeeRole( employee, role ) {
    console.log( "updateEmployeeRole", employee, role );
}
// TODO: 2nd priority, add code to update an employee manager.
function updateEmployeeManager( employee, manager ) {
    console.log( "updateEmployeeManager", employee, manager );
}
// TODO: 2nd priority, add code to view employees by manager.
function viewEmployeesByManager( manager ) {
    console.log( "viewEmployeesByManager", manager );
}
// TODO: 2nd priority, add code to delete a department, role, or employee.
function deleteRow( table, row ) {
    console.log( "deleteRow", table, row );
}
// TODO: 2nd priority, add code to view a department's budget.
function viewDepartmentBudget( department ) {
    console.log( "viewDepartmentBudget", department );
}