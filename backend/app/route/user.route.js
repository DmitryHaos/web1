module.exports = (app) => {
	const user = require('../controller/user.controller');
	var { authJwt } = require("../middleware");

	// Получение списка всех пользователей
	app.get('/api/users', [authJwt.verifyUserToken], user.findAll);

	// Получение данных пользователя по id
	app.get('/api/user/:id', [authJwt.verifyUserToken], user.findById);
}