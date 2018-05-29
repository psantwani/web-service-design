/** Requires */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const helpers = require('../../libs/helpers');

/** Class Definition */

class Mongo {
	pseudoConstructor(params) {
		return new Promise(async (resolve, reject) => {
			// Forms Connection URI
			let uri;
			if (params.auth !== null) {
				uri = `mongodb://${params.auth.user}:${params.auth.password}@${params.host}:${params.port}/${params.db}`;
			} else {
				uri = `mongodb://${params.host}:${params.port}/${params.db}`;
			}

			// Connects
			const { err } = await helpers.invoker(mongoose.connect(uri));

			if (err) {
				return reject(err);
			}

			// Returns
			return resolve({
				description: 'Connected to DB successfully'
			});
		});
	}

	createModel(params) {
		// Forms table
		const table = params.table.charAt(0).toUpperCase() + params.table.slice(1);

		// Modifies Schema
		params.schema._id = params.schema.id;

		// Creates Mongoose Schema
		const schema = new Schema(params.schema);

		// toObject method on mongoose schema object
		schema.set('toObject', {
			versionKey: false,
			transform: (doc, ret) => {
				delete ret.__v;
				return ret;
			}
		});

		// Creates Mongoose Model
		const model = mongoose.model(table, schema);

		// Returns
		return {
			err: null,
			result: { description: 'Model created successfully', model }
		};
	}

	insert(params) {
		return new Promise(async (resolve, reject) => {
			// DB call
			const { err } = await helpers.invoker(params.model(params).save());
			if (err) {
				return reject(err);
			}

			// Returns
			return resolve({
				description: 'Record inserted successfully',
				inserted: true
			});
		});
	}

	fetch(params) {
		return new Promise(async (resolve, reject) => {
			// DB call
			const { err, result } = await helpers.invoker(params.model.findById(params.id));
			if (err) {
				return reject(err);
			}
			const record = result;

			// Returns
			return resolve({
				description: 'Record fetched successfully',
				record
			});
		});
	}

	modify(params) {
		return new Promise(async (resolve, reject) => {
			// DB call
			const { err } = await helpers.invoker(params.model.findByIdAndUpdate(params.id, params, { upsert: true, new: true }));
			if (err) {
				return reject(err);
			}

			// Returns
			return resolve({
				description: 'Record updated successfully',
				id: params.id,
				modified: true
			});
		});
	}
}

/** Exports */
module.exports = Mongo;
