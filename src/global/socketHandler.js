import openSocket from 'socket.io-client';
const port = 8000;
const socket = openSocket("http://localhost:${port}");

