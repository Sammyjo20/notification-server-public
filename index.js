import express from 'express';
import { createServer } from 'node:http';
import bodyParser from 'body-parser';
import { Server } from 'socket.io';
import NodeCache from 'node-cache';

const app = express();
const server = createServer(app);
const io = new Server(server);
const cache = new NodeCache();

app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('👋');
});

app.post('/event', function (req, res) {
    if (! req.body.event) {
        res.send('Missing Event');
        return;
    }

    io.emit('local-event', req.body.event);

    res.send('👍');
});

io.on('connection', (socket) => {
    console.log('Client Connected');
});

server.listen(8888, () => {
    console.log('HTTP server and Socket.IO running at http://localhost:8888');
});
