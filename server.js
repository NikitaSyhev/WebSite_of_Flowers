const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const Database = require('./Database');

const config = require('./config');
const { compile } = require('ejs');



//НАСТРОЙКА СЕРВЕРА
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));

let port = 3001;

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
})

app.listen(port, ()=> {
    console.log(`Server starts at port ${port}`);
});


//ВОТ ЭТУ ЧАСТЬ НУЭНО ПЕРЕДЕЛАТЬ
// const db = new Database()

// db.connect();


//НАСТРОЙКА БАЗЫ ДАННЫХ
const connection = mysql.createConnection({
    host: config.host,
    user: "root",
    database: "Flowers_Website",
    password:config.password,
});

//открыли соединение
connection.connect(function(err) {
    if(err) {
        return console.error("Error: " + err.message);
    }
    else {
        console.log("Database connected");
    }
})

//вывели данные в консоль для теста
connection.query("SELECT * FROM Users",
    function(err, results, fields) {
        console.log(results); // вывели данные из БД в консоль
    
    }
);

// НАСТРОЙКА ОБРАБОТКИ ДАННЫХ С ФОРМЫ
app.post('/login', (req, res) => {

    const {email, password} = req.body;

    connection.query("SELECT * FROM Users WHERE email = ? AND password = ?", [email, password], (err, result) => {
            if(err) {
                console.error('Ошибка выполения запроса', err);
                return res.status(500).json({message: "Ошибка сервера"});
            }
            if(result.length > 0) {
                return res.json({message: "Авторизация успешна"});
            }
            else {
                return res.status(400).json({message:"Неверный пользователь или пароль"});
            }
        }
    )
})