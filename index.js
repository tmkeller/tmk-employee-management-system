const mysql = require('mysql');
const inquirer = require( 'inquirer' );
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employee_db'
})

connection.connect( function( err ) {
    if ( err ) throw err;
    console.log( "Connected to database." );
    init();
});

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
                    const department = {
                        name: response.department_name
                    }
                    addToTable( "department", department );
                });
                break;
                
            case 'Add a role':
                console.log( "\nAdd a role:\n" );

                // Get a list of all departments from SQL database
                // Put them all in an array assigned to the roleDept variable.
                connection.query( `SELECT id, name FROM department`, function( err, res ) {
                    if ( err ) throw err;
                    // Build an array of objects with name/value pairs to use for the list of departments,
                    // So we can have the user select names, but enter IDs into the database.
                    let roleDept = res.map( function( roleObj ) { return { name: roleObj.name, value: roleObj.id } } );

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
                        const roleArr = {
                            title: response.role_name,
                            salary: response.role_salary,
                            department_id: response.role_department
                        }
                        addToTable( "role", roleArr );
                    });
                })
                break;
                
            case 'Add an employee':
                console.log( "\nAdd an employee:\n" );

                connection.query( `SELECT id, title FROM role`, function( err1, res1 ) {
                    if ( err1 ) throw err1;
                    // Build an array of objects with name/value pairs to use for the list of roles,
                    // So we can have the user select names, but enter IDs into the database.
                    let empRole = res1.map( function( roleObj ) { return { name: roleObj.title, value: roleObj.id } } );

                    // Get a list of all managers from SQL database
                    // Put them all in an array assigned to the managersEmployee variable.
                    connection.query( `SELECT id, first_name, last_name, manager_id FROM employee WHERE manager_id IS null`, function( err2, res2 ) {
                        if ( err2 ) throw err2;

                        let empMan = res2.map( function( roleObj ) { return {
                            name: `${ roleObj.last_name }, ${ roleObj.first_name}`,
                            value: roleObj.id
                        }});

                        empMan.push({ name: "None", value: null });

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
                                    choices: empRole
                                },
                                {
                                    type: 'list',
                                    message: 'Select a manager: ',
                                    name: 'managers_list',
                                    choices: empMan
                                }
                            ]
                        ).then(( response ) => {
                            const employeeArr = {
                                first_name: response.first_name, 
                                last_name: response.last_name, 
                                role_id: response.employee_role, 
                                manager_id: response.managers_list
                            }
                            addToTable( "employee", employeeArr );
                        })
                    })
                })
                break;
                
            case 'View departments':
                console.log( "\nView departments:\n" );

                // Get a list of all departments from SQL database
                // Put them all in an array assigned to the departments variable.
                connection.query( `SELECT id, name FROM department`, function( err, res ) {
                    if ( err ) throw err;
                    viewTable( "'department'", res );
                });
                break;
                
            case 'View roles':
                console.log( "\nView roles:\n" );
                let rolesQuery = `SELECT role.title AS 'Title', role.salary AS 'Salary', department.name
                    AS 'Department' FROM role INNER JOIN department ON role.department_id=department.id`
                connection.query( rolesQuery, function( err, res ) {
                    if ( err ) throw err;
                    viewTable( 'role', res );
                });
                break;
                
            case 'View employees':
                console.log( "\nView employees:\n" );

                // Build query.
                let query = `SELECT employee.id AS 'ID', employee.first_name AS 'First Name', 
                            employee.last_name AS 'Last Name', role.title AS 'Title', 
                            role.salary AS 'Salary', department.name AS 'Department',
                            employee.manager_id AS 'Manager ID' 
                            FROM employee LEFT JOIN role ON employee.role_id=role.id 
                            LEFT JOIN department ON role.department_id=department.id`;
                connection.query( query, function( err, res ) {
                    if ( err ) throw err;
                    viewTable( 'employee', res );
                });
                break;
                
            case 'Update employee role':
                console.log( "\nUpdate employee role:\n" );

                // Get a list of all employees from SQL database.
                let employeeQuery = `SELECT * FROM employee ORDER BY last_name DESC`;
                connection.query( employeeQuery, function( empErr, empRes ) {
                    if ( empErr ) throw empErr;

                    let empList = empRes.map( function( empObj ) { return {
                        name: `${ empObj.last_name }, ${ empObj.first_name}`,
                        value: empObj.id
                    }});

                    let rolesQuery = `SELECT * FROM role ORDER BY title DESC`;
                    connection.query( rolesQuery, function( roleErr, roleRes ) {
                        if ( roleErr ) throw roleErr;

                        let roleList = roleRes.map( function( roleObj ) { return {
                            name: roleObj.title,
                            value: roleObj.id
                        }});

                        inquirer.prompt(
                            [   
                                {
                                    type: 'list',
                                    message: 'Select an employee: ',
                                    name: 'employee',
                                    choices: empList
                                },
                                {
                                    type: 'list',
                                    message: 'Select a role: ',
                                    name: 'role',
                                    choices: roleList
                                }
                            ]
                        ).then(( response ) => {
                            updateEmployeeRole( response.employee, response.role );
                        });
                    })
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
    connection.end();
}

// Add a department, role, or employee.
function addToTable( table, row ) {
    connection.query( `INSERT INTO ${ table } SET ?`, row, function( err, res ) {
        if ( err ) throw err;
        console.log( `${ res.affectedRows } new entry added to ${ table }!` );
        init();
    })
}
// View a department, role, or employee.
function viewTable( table, row ) {
    console.log( `Viewing ${ table } table:\n` );
    console.table( row );
    init();
}
// Update an employee's role.
function updateEmployeeRole( employee, role ) {
    const query = `UPDATE employee SET role_id = ${ role } WHERE id = ${ employee }`
    connection.query( query, function ( err, res ) {
        if ( err ) throw err;
        console.log( `\n${ res.affectedRows } new entry added to employee table!\n` )
        init();
    })
}