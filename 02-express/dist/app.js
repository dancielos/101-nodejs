import express from 'express';
import { router as adminRouter } from './routes/admin.js';
import { router as shopRouter } from './routes/shop.js';
import path from 'path';
import { __dirname } from './util/path.js';
var app = express();
app.use(express.urlencoded({ extended: false }));
app.use('/admin', adminRouter);
app.use(shopRouter);
app.use(function (req, res, next) {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});
app.listen(3000);
