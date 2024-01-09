import { Router } from 'express';
import path from 'path';
import { getCurrentPath } from './../util/path.js';
import { products } from './admin.js';

const __dirname = getCurrentPath();

export const router = Router();

router.get('/', (req, res, next) => {
	res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'));
	console.log(products);
});
