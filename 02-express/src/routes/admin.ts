import express from 'express';
import path from 'path';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const router = express();

router.get('/add-product', (req, res, next) => {
	// res.send('<h1>Add New Product</h1>');
	res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'));
});

router.post('/add-product', (req, res, next) => {
	console.log(req.body);
	res.redirect('/');
});
