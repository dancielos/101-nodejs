import http from 'http';
import fs from 'fs';

const server = http.createServer((req, res) => {
	const { url, method } = req;

	if (url === '/') {
		res.write('<html>');
		res.write('<head><title>Hello World!</title></head>');
		res.write(`<body>
			<form action='/message' method='POST'>
				<input type='text' name='message'>
				<button type='submit'>Send</button>
			</form>
		</body>`);
		res.write('</html>');
		return res.end();
	}

	if (url === '/message' && method === 'POST') {
		const body: Buffer[] = [];

		req.on('data', (chunk) => {
			console.log(chunk);
			body.push(chunk);
		});
		req.on('end', () => {
			const parsedBody = Buffer.concat(body).toString();
			const message = parsedBody.split('=').at(1)!;
			fs.writeFile('message.txt', message, (err) => {
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
