const net = require('net');
const rocketsData = require('./data.json');

const PORT = 3000;

const server = net.createServer();

server.on('connection', connection => {
	console.log('A client has connected to the server');
	connection.setEncoding('utf-8');

	// Server sends a welcome message to the client
	connection.write(
		'Welcome to the SpaceX Rocket Database\nPlease select a rocket from the list below to learn more about it:\n'
	);

	// Server send options of what the client can input
	rocketsData.forEach((rocket, index) => {
		connection.write(`Press ${index + 1} for ${rocket.name}\n`);
	});

	// When receiving data from client, sends back description of rocket
	connection.on('data', data => {
		const selectedRocket = Number(data) - 1;

		if (
			selectedRocket >= rocketsData.length ||
			selectedRocket < 0 ||
			Number.isNaN(selectedRocket)
		) {
			// Server sends error message to the client
			connection.write(
				'Invalid rocket number, please select from the options above.'
			);
		} else {
			// Server sends the data of the selected rocket
			connection.write(rocketsData[selectedRocket].description);
		}
	});
});

server.listen(PORT, () => {
	console.log(`Server is running and listenning on port ${PORT}`);
});
