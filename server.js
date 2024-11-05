const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql2');



//НАСТРОЙКА СЕРВЕРА
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));


//логировние
app.use((req, res, next) => {
    console.log(`Получен запрос: ${req.method} ${req.url}`);
    next();
});

//выводит Получен запрос: POST /login
// Получен POST-запрос на /login с телом: { email: 'admin@admin.ru', password: '1234' }
// Данные: admin@admin.ru, 1234


let port = 3001;

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
})

app.listen(port, ()=> {
    console.log(`Server starts at port ${port}`);
});


// НАСТРОЙКА БАЗЫ ДАННЫХ
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "Flowers_Website",
    password:"",
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

// //вывели данные в консоль для теста
// connection.query("SELECT * FROM Users",
//     function(err, results, fields) {
//         console.log(results); // вывели данные из БД в консоль
    
//     }
// );

// //закрыли соединение
// connection.end(function(err) {
//     if(err) {
//         return console.error("Error: " + err.message);
//     }
//     else {
//         console.log("Database disconnected");
//     }
// })


// НАСТРОЙКА ОБРАБОТКИ ДАННЫХ С ФОРМЫ
app.post('/login', (req, res) => {

    console.log("Получен POST-запрос на /login с телом:", req.body);

    const {email, password} = req.body;
    console.log(`Данные: ${email}, ${password}`);
    connection.query("SELECT * FROM Users WHERE email = ? AND password = ?",
        [email, password],
        (err, result) => {
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