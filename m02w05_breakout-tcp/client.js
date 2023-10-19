const net = require('net');

const client = net.createConnection({ host: 'localhost', port: 3000 });

client.setEncoding('utf-8');

// Data handler
client.on('data', data => {
	console.log(data);
});

// Listen for keyboard inputs and send it to the server
process.stdin.on('data', data => {
	client.write(data);
});
