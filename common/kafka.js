const Kafka = require('kafka-node');
const config = require('../config/config')

const client1 = new Kafka.KafkaClient({kafkaHost: config.KafkaHost});
const client2 = new Kafka.KafkaClient({kafkaHost: config.KafkaHost});
const client3 = new Kafka.KafkaClient({kafkaHost: config.KafkaHost});
const producer = new Kafka.Producer(client1);


client1.on('ready', function () { console.log('client1 ready!') })

const topicsToCreate = [{
    topic: 'FIS',
    partitions: 1,
    replicationFactor: 1
    },{
    topic: 'TSYS',
    partitions: 1,
    replicationFactor: 1
    },{
    topic: 'AFS',
    partitions: 1,
    replicationFactor: 1
    }
  ];

let consumer1;
let consumer2;
let consumer3;

const api = {
	createTopics: async topicsToCreate => {
		client1.createTopics(topicsToCreate, (error, result) => {
		  // result is an array of any errors if a given topic could not be created
		  console.log(result, 'topic created successfully');
		});
	},
	sendMessageToTopic: async (topic, message) => {
		producer.send([{topic:topic, messages: message}], (err,data)=>{
        	console.log(err, '2 sent');
    	});
	},
	attachConsumers: () => {
		consumer1 =  new Kafka.Consumer(client1,[{topic: 'FIS', partition: 0}]);
		consumer2 =  new Kafka.Consumer(client2,[{topic: 'TSYS', partition: 0}]);
		consumer3 =  new Kafka.Consumer(client3,[{topic: 'AFS', partition: 0}]);
		// consumer1.addTopics([ {topic: 'FIS', partition: 0}], () => console.log("topic FIS added"));
		// consumer2.addTopics([ {topic: 'TSYS', partition: 0}], () => console.log("topic TSYS added"));
		// consumer3.addTopics([ {topic: 'AFS', partition: 0}], () => console.log("topic AFS added"));
		consumer1.on('message',(message) =>{
		    console.log(11, message);
		});
		consumer2.on('message',(message) =>{
		    console.log(22, message);
		});
		consumer3.on('message',(message) =>{
		    console.log(33, message);
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

api.createTopics(topicsToCreate);
api.attachConsumers();

module.exports = api;