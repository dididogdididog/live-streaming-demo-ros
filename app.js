const express = require('express');
const http = require('http');

const port = 4000;

const app = express();

app.use(express.json())

app.use('/', express.static(__dirname));


const server = http.createServer(app);

server.listen(port, '0.0.0.0', () => {
  console.log(`server running at http://localhost:${port}`);
});
