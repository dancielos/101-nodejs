import express from 'express';
import path from 'path';
import { __dirname } from './../util/path.js';
export var router = express();
router.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'));
});
