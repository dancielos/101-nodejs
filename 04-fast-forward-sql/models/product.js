const mongodb = require('mongodb');
const getDb = require('./../util/database').getDb;

class Product {
	constructor(title, price, description, imageUrl, id) {
		this.title = title;
		this.price = price;
		this.description = description;
		this.imageUrl = imageUrl;
		this._id = id;
	}

	// async save() {
	// 	try {
	// 		const db = getDb();
	// 		let dbOp;
	// 		if (this._id) {
	// 			dbOp = await db
	// 				.collection('products')
	// 				.updateOne({ _id: new mongodb.ObjectId(this._id) }, { set: this });
	// 		} else {
	// 			dbOp = await db.collection('products').insertOne(this);
	// 		}

	// 		// console.log(res);
	// 		return dbOp;
	// 	} catch (err) {
	// 		console.log(err);
	// 		throw err;
	// 	}
	// }

	save() {
		const db = getDb();
		let dbOp;

		if (this._id) {
			dbOp = db
				.collection('products')
				.updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
		} else {
			dbOp = db.collection('products').insertOne(this);
		}

		return dbOp
			.then((result) => console.log(result))
			.catch((err) => console.log(err));
	}

	static fetchAll() {
		const db = getDb();
		return db
			.collection('products')
			.find()
			.toArray()
			.then((products) => {
				// console.log(products);
				return products;
			})
			.catch(console.log);
	}

	static findById(id) {
		// console.log('find by id', id);
		const db = getDb();
		return db
			.collection('products')
			.find({ _id: new mongodb.ObjectId(id) })
			.next()
			.then((product) => {
				console.log(product);
				return product;
			})
			.catch(console.log);
	}
}

module.exports = Product;
