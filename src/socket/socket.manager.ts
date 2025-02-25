// const io = new Server(httpServer, {
//     cors: {
//         origin: "http://localhost:4200",
//         methods: ["GET", "POST"],
//     }
// });

// io.on('connection', (socket) => {
//     console.log('a user connected');

//     socket.on('disconnect', () => {
//         console.log('user disconnected');
//     })

//     socket.on('message', (msg: string) => {
//         socket.emit('message', msg);
//         socket.broadcast.emit('message', msg);
//     })
// })