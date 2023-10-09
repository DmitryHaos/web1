module.exports = (app) => {
	const auth = require('../controller/auth.controller');
	var { authJwt, verifySignUp } = require("../middleware");

	app.use((req, res, next) => {
		// подключаем заголовки для авторизации
		res.header(
			"Access-Control-Allow-Headers",
			"x-access-token, Origin, Content-Type, Accept"
		);
		next();
	});

	// Проверка данных пользователя
	app.post('/api/login', auth.login);

	// Регистрация пользователя с предварительной проверкой существования логина
	app.post("/api/register", [verifySignUp.checkDuplicateUsername], auth.register);

	// Обновление токена jwt (когда срок действия текущего истекает)
	app.post('/api/refreshToken', auth.refreshToken);
}