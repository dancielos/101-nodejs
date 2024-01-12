const mongodb = require('mongodb');
const { get } = require('../routes/shop');
const getDb = require('./../util/database').getDb;

class User {
	constructor(username, email, cart, id) {
		this.username = username;
		this.email = email;
		this.cart = cart;
		this._id = id;
	}

	save() {
		const db = getDb();

		return db.collection('users').insertOne(this);
	}

	addToCart(product) {
		// connect
		const db = getDb();

		// initiate in the chance that there's no item key inside the cart document
		if (!this.cart?.items) this.cart = { items: [] };

		// check whether product already exists
		const cartProductIndex =
			this.cart.items?.findIndex(
				(cp) => cp.productId.toString() === product._id.toString()
			) ?? -1;

		// create a copy of cart items
		const cartItems = [...this.cart.items];

		// const hasTotalQuantity =
		// 	this.cart?.totalQuantity && Number.isFinite(this.cart.totalQuantity);

		// let totalQuantity = hasTotalQuantity ? this.cart.totalQuantity : 0;

		if (cartProductIndex !== -1) {
			// found
			cartItems[cartProductIndex].quantity += 1;
		} else {
			cartItems.push({
				productId: new mongodb.ObjectId(product._id),
				// quantity: 1,
			});
		}

		// totalQuantity++;

		// this was my initial thought, but if there are too many
		// products inside the cart, it'll be too slow O(n)
		// rather than O(1)
		/* const totalQuantity = cartItems.reduce((acc, ci) => {
			acc += ci.quantity;
			return acc;
		}, 0); */

		return db
			.collection('users')
			.updateOne(
				{ _id: new mongodb.ObjectId(this._id) },
				{ $set: { cart: { items: cartItems } } }
			);
	}

	getCart() {
		const db = getDb();

		const productIds = this.cart.items.map((product) => product.productId);
		return db
			.collection('products')
			.find({ _id: { $in: productIds } })
			.toArray()
			.then((products) => {
				return products.map((product) => {
					return {
						...product,
						quantity: this.cart.items.find(
							(ci) => ci.productId.toString() === product._id.toString()
						).quantity,
					};
				});
			});
	}

	deleteItemFromCart(id) {
		const db = getDb();

		const updatedCartItems = this.cart.items.filter(
			(ci) => ci.productId.toString() !== id.toString()
		);
		return db
			.collection('users')
			.updateOne(
				{ _id: new mongodb.ObjectId(this._id) },
				{ $set: { cart: { items: updatedCartItems } } }
			);
	}

	addOrder() {
		const db = getDb();

		return db
			.collection('orders')
			.insertOne({ ...this.cart, userId: this._id })
			.then((result) => {
				this.cart = { items: [] };
				return db
					.collection('users')
					.updateOne(
						{ _id: new mongodb.ObjectId(this._id) },
						{ $set: { cart: { items: [] } } }
					);
			});
	}

	getOrders() {
		const db = getDb();

		return db.collection('orders').find();
	}

	static findById(id) {
		const db = getDb();
		return db.collection('users').findOne({ _id: new mongodb.ObjectId(id) });
	}
}

module.exports = User;
