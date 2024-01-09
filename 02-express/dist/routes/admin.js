import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
export var router = express();
router.get('/add-product', function (req, res, next) {
    // res.send('<h1>Add New Product</h1>');
    res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'));
});
router.post('/add-product', function (req, res, next) {
    console.log(req.body);
    res.redirect('/');
});
