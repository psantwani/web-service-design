module.exports = {
	app: 'APPNAME',
	port: 3000,
	sampleDBConfig: {
		type: 'mongo',
		host: '127.0.0.1',
		port: '27017',
		db: 'sample',
		auth: null
	},
	cache: {
		type: 'redis',
		host: 'localhost',
		port: 6379,
		db: ''
	}
};
