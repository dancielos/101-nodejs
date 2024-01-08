import http from 'http';
import fs from 'fs';
var server = http.createServer(function (req, res) {
    var url = req.url, method = req.method;
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Hello World!</title></head>');
        res.write("<body>\n\t\t\t<form action='/message' method='POST'>\n\t\t\t\t<input type='text' name='message'>\n\t\t\t\t<button type='submit'>Send</button>\n\t\t\t</form>\n\t\t</body>");
        res.write('</html>');
        return res.end();
    }
    if (url === '/message' && method === 'POST') {
        var body_1 = [];
        req.on('data', function (chunk) {
            console.log(chunk);
            body_1.push(chunk);
        });
        req.on('end', function () {
            var parsedBody = Buffer.concat(body_1).toString();
            var message = parsedBody.split('=').at(1);
            fs.writeFile('message.txt', message, function (err) {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<p>Hello World!</p>');
    res.write('</html>');
    res.end();
});
server.listen(3000);
console.log('test');
//# sourceMappingURL=app.js.map