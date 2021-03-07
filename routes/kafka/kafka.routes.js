const kafka = require('../../common/kafka');

const api = router => {
    const handleRequestForKafka = async (req, res) => {
      const data = req.body;
      let responseCode = 200;
      let responseMessage = ''
      let institution = (data.data && data.data.institution) ?
        data.data.institution : '';
      const message = (data.data && data.message) ?
        data.message : '';

      if(institution && message) {
        institution = institution.toUpperCase();
        responseMessage = 'Message received for topic: ' + institution;
        await kafka.sendMessageToTopic(institution, message);
      } else {
        responseMessage = 'Please pass both message and institution. eg: ' +
          JSON.stringify({
            abc: 'aasd',
            id: '1234',
            message: 'message',
            data: { payment: 'payment 1', institution: 'afs' }
          });
        responseCode = 400;
      }
      res.status(responseCode).send(responseMessage);
    } 
    const handlecreateTopics = async (req, res) => {
      // create topics
      // const topicsToCreate = [{
      //   topic: 'FIS',
      //   partitions: 1,
      //   replicationFactor: 1
      //   },{
      //   topic: 'TSYS',
      //   partitions: 1,
      //   replicationFactor: 1
      //   },{
      //   topic: 'AFS',
      //   partitions: 1,
      //   replicationFactor: 1
      //   }
      // ];
      // await kafka.createTopics(topicsToCreate);
      res.sendStatus(200);
    }
    return router
    // NO CRUD
        .post('/kafka',[],handleRequestForKafka)
        .post('/kafka/createTopics',[],handlecreateTopics);
  };
  
  
  module.exports = api;
  