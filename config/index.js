/** Configuration manager */

const config = {
	development: require('./env/development'),
	production: require('./env/production'),
	sit: require('./env/sit')
};

module.exports = env => {
	return config[env];
};
