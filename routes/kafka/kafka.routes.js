const kafka = require('../../common/kafka');

const api = router => {
    const handleRequestForKafka = async (req, res) => {
      const data = req.body;
      console.log(data);
      const help = await kafka.doesTopicExists('dd');
      console.log("help:",help);
      res.sendStatus(200);
    } 
    const handlecreateTopics = async (req, res) => {
      // create topics
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
      await kafka.createTopics(topicsToCreate);
      res.sendStatus(200);
    }
    return router
    // NO CRUD
        .post('/kafka',[],handleRequestForKafka)
        .post('/kafka/createTopics',[],handlecreateTopics);
  };
  
  
  module.exports = api;
  