const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
	res.render('admin/edit-product', {
		pageTitle: 'Add Product',
		path: '/admin/add-product',
		editing: false,
	});
};

exports.postAddProduct = (req, res, next) => {
	const title = req.body.title;
	const imageUrl = req.body.imageUrl;
	const price = req.body.price;
	const description = req.body.description;
	const product = new Product({
		title,
		imageUrl,
		price,
		description,
		userId: req.user,
	});
	product
		.save()
		.then((result) => {
			// console.log(result);
			console.log('Created Product');
			res.redirect('/admin/products');
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getEditProduct = (req, res, next) => {
	const editMode = req.query.edit;
	if (!editMode) {
		return res.redirect('/');
	}
	const prodId = req.params.productId;
	Product.findById(prodId)
		// Product.findById(prodId)
		.then((product) => {
			if (!product) {
				return res.redirect('/');
			}
			res.render('admin/edit-product', {
				pageTitle: 'Edit Product',
				path: '/admin/edit-product',
				editing: editMode,
				product: product,
			});
		})
		.catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
	Product.findById(req.body.productId)
		.then((product) => {
			product.title = req.body.title;
			product.price = req.body.price;
			product.description = req.body.description;
			product.imageUrl = req.body.imageUrl;

			return product.save();
		})
		.then((result) => {
			console.log('UPDATED PRODUCT!');
			res.redirect('/admin/products');
		})
		.catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
	Product.find()
		// .populate('userId')
		.then((products) => {
			console.log(products);
			res.render('admin/products', {
				prods: products,
				pageTitle: 'Admin Products',
				path: '/admin/products',
			});
		})
		.catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
	const prodId = req.body.productId;
	Product.findByIdAndDelete(prodId)
		.then(() => {
			console.log('DESTROYED PRODUCT');
			res.redirect('/admin/products');
		})
		.catch((err) => console.log(err));
};
