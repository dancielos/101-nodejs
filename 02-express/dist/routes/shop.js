import { Router } from 'express';
import path from 'path';
import { getCurrentPath } from './../util/path.js';
import { products } from './admin.js';
var __dirname = getCurrentPath();
export var router = Router();
router.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'));
    console.log(products);
});
