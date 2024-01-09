import express from 'express';
import path from 'path';
import { __dirname } from './../util/path.js';

export const router = express();

router.get('/', (req, res, next) => {
	res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'));
});
