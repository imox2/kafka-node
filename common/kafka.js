const Kafka = require('kafka-node');
const config = require('../config/config')

const client = new Kafka.KafkaClient({kafkaHost: config.KafkaHost});
const producer = new Kafka.Producer(client);
const consumer1 =  new Kafka.Consumer(client,[ {topic: 'FIS', partition: 0}]);
const consumer2 =  new Kafka.Consumer(client,[ {topic: 'TSYS', partition: 0}]);
const consumer3 =  new Kafka.Consumer(client,[ {topic: 'AFS', partition: 0}]);


consumer1.on('message',(message) =>{
    console.log(11, message);
});
consumer2.on('message',(message) =>{
    console.log(22, message);
});
consumer3.on('message',(message) =>{
    console.log(33, message);
});

const api = {
	createTopics: async topicsToCreate => {
		client.createTopics(topicsToCreate, (error, result) => {
		  // result is an array of any errors if a given topic could not be created
		  console.log(result, 'topic created successfully');
		});
	},
	sendMessageToTopic: async (topic, message) => {
		producer.send([{topic:topic, messages: 'message'}], (err,data)=>{
        	console.log(err, '2 sent');
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