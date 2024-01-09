import { Router } from 'express';
import path from 'path';
import { getCurrentPath } from './../util/path.js';

const __dirname = getCurrentPath();

type product = {
	title: string;
};

export const router = Router();
export const products: product[] = [];

router.get('/add-product', (req, res, next) => {
	// res.send('<h1>Add New Product</h1>');
	res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'));
});

router.post('/add-product', (req, res, next) => {
	products.push({ title: req.body.title });
	res.redirect('/');
});
