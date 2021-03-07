const express    = require('express');        // call express
const app        = express();                 // define our app using express

const cors = require('cors');

// configure app to do body parsing
app.use(express.json());
// this will let us get the data from a POST

app.use(cors());
const port = process.env.PORT || 3000;        // set our port

const getPing = (req,res) => {
	res.send('server is running on port - ' + port);
}

const handlePost = (req,res) => {
	console.log(req.body);
	res.sendStatus(200);
}

// router
app.get('/api/ping', getPing);
app.post('/api/kafka', handlePost);
app.get('/', getPing);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('server is running - ' + port);