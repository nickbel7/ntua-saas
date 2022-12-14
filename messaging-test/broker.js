const { Kafka } = require ('kafkajs'); // Kafka instance

const clientId = 'my-app'; // it lets kafka know who produced the messages
const brokers = [
	'localhost:9092'
	// 'kafka2:9092'
]

// INITIALIZE A BROKER
const kafka = new Kafka({
	clientId: clientId,
	brokers: brokers
});

module.exports = { kafka, clientId };