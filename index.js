const mysql = require('mysql');
const inquirer = require( 'inquirer' );

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employee_db'
})

inquirer.prompt(
    [
        {
            type: 'input',
            message: 'Message here: ',
            name: 'variable-name'
        }
    ]
).then(( response ) => {
    console.log( response );
});