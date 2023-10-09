var express = require('express');
var bodyParser = require('body-parser');

// Основное приложение
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Подключение БД
var db = require('./app/config/db.config.js');
db.sequelize.sync({force: false});

// Подключение cors
var cors = require('cors');
var corsOptions = {
	origin: 'http://localhost:4200',	// указываем, откуда будут приходить запросы
	credentials: true,					// разрешаем обрабатывать запросы
	optionSuccessStatus: 200			// при успешной обработке запроса будет возвращён статус 200
};
app.use(cors(corsOptions));

// Подключение роутеров
var user = require('./app/route/user.route.js')
user(app);

var auth = require('./app/route/auth.route.js')
auth(app);

app.listen(3000);