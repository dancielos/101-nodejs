import { Router } from 'express';
import path from 'path';
import { getCurrentPath } from './../util/path.js';
var __dirname = getCurrentPath();
export var router = Router();
export var products = [];
router.get('/add-product', function (req, res, next) {
    // res.send('<h1>Add New Product</h1>');
    res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'));
});
router.post('/add-product', function (req, res, next) {
    products.push({ title: req.body.title });
    res.redirect('/');
});
