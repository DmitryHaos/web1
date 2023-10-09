module.exports = (sequelize, Sequelize) => {
	var User = sequelize.define(
		"user",
		{
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false
			},
			role:{
				type: Sequelize.ENUM,
				values: ["Пользователь", "Администратор"],
				allowNull: false
			},
			login: {
				type: Sequelize.STRING(64),
				allowNull: false
			},
			password: {
				type: Sequelize.STRING(200),
				allowNull: false
			}
		});

	return User;
};