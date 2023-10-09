var db = require('../config/db.config.js');
var User = db.user;

var globalFunctions = require('../config/global.functions.js');
var bcrypt = require("bcryptjs");


// Получение списка всех пользователей
exports.findAll = (req, res) => {
	User.findAll()
		.then(objects => {
			globalFunctions.sendResult(res, objects);
		})
		.catch(err => {
			globalFunctions.sendError(res, err);
		})
};

// Получение данных пользователя по id
exports.findById = (req, res) => {
	User.findByPk(req.params.id)
		.then(object => {
			if (object === null){
				object = {};
			}
			globalFunctions.sendResult(res, object);
		})
		.catch(err => {
			globalFunctions.sendError(res, err);
		})
};