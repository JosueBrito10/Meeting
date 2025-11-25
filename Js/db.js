const mysql = require('mysq12');

const connection = mysql.createConnection({
    host: 'localhost',   
    port: 3306,          
    user: 'root',
    password: '123abc',
    database: 'login_db'
});

connection.connect((err) => {
    if (err) {
        console.log('Erro ao conectar ao MySQL:', err);
    } else {
        console.log('Conectado ao MySQL');
    }
});

module.exports = connection;