import http from 'http';
var server = http.createServer(function (req, res) {
    var url = req.url, method = req.method;
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Hello World!</title></head>');
        res.write("<body><h1>Hello World!</h1>\n      <form action='create-user' method='POST'>\n        <input type='text' name='username'>\n        <input type='submit'>\n      </form>\n    </body>");
        res.write('</html>');
        return res.end();
    }
    else if (url === '/users') {
        res.write('<html>');
        res.write('<head><title>List of Users</title></head>');
        res.write("<body><ul>\n      <li>Dan</li>\n      <li>Max</li>\n      <li>Crissy</li>\n      <li>Who</li>\n    </ul</body>");
        res.write('</html>');
        return res.end();
    }
    else if (url === '/create-user' && method === 'POST') {
        var body_1 = [];
        req.on('data', function (chunk) {
            // console.log(chunk);
            body_1.push(chunk);
        });
        req.on('end', function () {
            var parsedBody = Buffer.concat(body_1).toString();
            var username = parsedBody.split('=').at(1);
            console.log(username);
            return res.end();
        });
    }
});
server.listen(3000);
//# sourceMappingURL=01-assignment.js.map