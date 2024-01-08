import http from 'http';

const server = http.createServer((req, res) => {
	const { url, method } = req;

	if (url === '/') {
		res.write('<html>');
		res.write('<head><title>Hello World!</title></head>');
		res.write(`<body><h1>Hello World!</h1>
      <form action='create-user' method='POST'>
        <input type='text' name='username'>
        <input type='submit'>
      </form>
    </body>`);
		res.write('</html>');
		return res.end();
	} else if (url === '/users') {
		res.write('<html>');
		res.write('<head><title>List of Users</title></head>');
		res.write(`<body><ul>
      <li>Dan</li>
      <li>Max</li>
      <li>Crissy</li>
      <li>Who</li>
    </ul</body>`);
		res.write('</html>');
		return res.end();
	} else if (url === '/create-user' && method === 'POST') {
		const body: Buffer[] = [];

		req.on('data', (chunk) => {
			// console.log(chunk);
			body.push(chunk);
		});

		req.on('end', () => {
			const parsedBody = Buffer.concat(body).toString();
			const username = parsedBody.split('=').at(1)!;
			console.log(username);
			return res.end();
		});
	}
});

server.listen(3000);
