import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(process.env['MYSQL_DATABASE']!, process.env['MYSQL_USER']!, process.env['MYSQL_PASSWORD']!, {
	dialect: 'mysql',
	host: 'host.docker.internal',
});

try {
	sequelize.authenticate();
	console.log('Connected to db');
} catch (error) {
	console.error('Unable to connect to the db', error);
}

require('./schema');
