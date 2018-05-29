// Require
const redis = require('redis');
const RedisClient = redis.createClient;

class Redis {
	constructor(params) {
		// Connects
		const client = new RedisClient({
			host: params.host,
			db: '0',
			port: params.port,
			max_attempts: 5
		});

		// Auth
		if (params.password) {
			client.auth(params.password);
		}

		// Assigns
		this.type = 'redis';
		this.config = params;
		this.client = client;

		// Adds event listener
		client.on('error', err => {
			console.log('Error ' + err);
		});
	}

	insert(params) {
		return new Promise(async (resolve, reject) => {
			// code here

			// Returns
			return resolve({ message: 'Record inserted successfully', key });
		});
	}

	fetch(params) {
		return new Promise(async (resolve, reject) => {
			// code here

			// Returns
			return resolve({ message: 'Record fetched successfully', key });
		});
	}

	remove(params) {
		return new Promise(async (resolve, reject) => {
			// code here

			// Returns
			return resolve({ message: 'Record removed successfully', key });
		});
	}

	incr(params) {
		return new Promise(async (resolve, reject) => {
			// code here

			// Returns
			return resolve({ message: 'Record incremented successfully', key });
		});
	}

	decr(params) {
		return new Promise(async (resolve, reject) => {
			// code here

			// Returns
			return resolve({ message: 'Record decremented successfully', key });
		});
	}

	ttl(params) {
		return new Promise(async (resolve, reject) => {
			// code here

			// Returns
			return resolve({ message: 'ttl set successfully', key });
		});
	}
}

// Exports
module.exports = Redis;
