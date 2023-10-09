var db = require("../config/db.config");
var User = db.user;

var config = require("../config/auth.config");
var globalFunctions = require('../config/global.functions.js');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


// Проверка данных пользователя
exports.login = (req, res) => {
	User.findOne({
		where: {
			login: req.body.login
		},
	})
	.then(user => {
		if (!user) {
			res.status(404).send({ message: "Неверно введенный логин и/или пароль" });
			return;
		}

		var passwordIsValid = bcrypt.compareSync(
			req.body.password,
			user.password
		);
		if (!passwordIsValid) {
			res.status(401).send({
				accessToken: null,
				message: "Неверно введенный логин и/или пароль"
			});
			return;
		}

		var token;
		if (user.role === "Пользователь"){
			token = jwt.sign({ id: user.id }, config.user.secret, {
				expiresIn: config.user.expiresIn
			});
			console.log("[USER] Токен при авторизации");
			console.log(token);
		}
		else if (user.role === "Администратор"){
			token = jwt.sign({ id: user.id }, config.admin.secret, {
				expiresIn: config.admin.expiresIn
			});
			console.log("[ADMIN] Токен при авторизации");
			console.log(token);
		}

		var object = {
			id: user.id,
			role: user.role,
			login: user.login,
			accessToken: token
		};
		globalFunctions.sendResult(res, object);
	})
	.catch(err => {
		globalFunctions.sendError(res, err);
	});
};

// Регистрация пользователя с предварительной проверкой существования логина
exports.register = (req, res) => {
	User.create({
		role: 1,
		login: req.body.login,
		password: bcrypt.hashSync(req.body.password, 10)
	})
	.then(() => {
		var object = {
			message: "Пользователь зарегистрирован"
		};
		globalFunctions.sendResult(res, object);
	})
	.catch(err => {
		globalFunctions.sendError(res, err);
	})
};

// Обновление токена jwt (когда срок действия текущего истекает)
exports.refreshToken = (req, res) => {
	User.findOne({
		where: {
			login: req.body.login
		}
	})
	.then(user => {
		if (!user) {
			globalFunctions.sendError(res, "Неверно введенный логин и/или пароль");
		}

		var token;
		if (user.role === "Пользователь"){
			token = jwt.sign({ id: user.id }, config.user.secret, {
				expiresIn: config.user.expiresIn
			});
			console.log("[USER] Новый токен");
			console.log(token);
		}
		else if (user.role === "Администратор"){
			token = jwt.sign({ id: user.id }, config.admin.secret, {
				expiresIn: config.admin.expiresIn
			});
			console.log("[ADMIN] Новый токен");
			console.log(token);
		}

		var object = {
			id: user.id,
			role: user.role,
			login: user.login,
			accessToken: token
		};
		globalFunctions.sendResult(res, object);
	})
	.catch(err => {
		globalFunctions.sendError(res, err);
	});
};