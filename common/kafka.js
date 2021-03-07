const Kafka = require('kafka-node');
const config = require('../config/config')

const client = new Kafka.KafkaClient({kafkaHost: config.KafkaHost});

const api = {
	createTopics: async topicsToCreate => {
		client.createTopics(topicsToCreate, (error, result) => {
		  // result is an array of any errors if a given topic could not be created
		  console.log(result, 'topic created successfully');
		});
	},
	doesTopicExists: name => {
		return new Promise((resolve, reject) => {
			client.loadMetadataForTopics([name], (err, resp) => {
				if(err) {
					reject(new Error('Topic retrieval failed'));
				} else {
					resolve(JSON.stringify(resp));
				}
			});
		});
	}
}

module.exports = api;