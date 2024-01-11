const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = async (callback) => {
	try {
		const client = await MongoClient.connect(
			'mongodb+srv://dan:ru0NE5EUJsYzKGBS@101.ywu0txw.mongodb.net/?retryWrites=true&w=majority'
		);

		console.log('Connected');

		_db = client.db(); // this will keep on running
		callback(client);
	} catch (err) {
		console.log(err);
		throw err;
	}
};

const getDb = () => {
	if (_db) return _db;

	throw 'No database found';
};

// module.exports = mongoConnect;

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
