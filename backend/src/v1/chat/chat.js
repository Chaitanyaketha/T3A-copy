// const { Server } = require("socket.io");

// let users = {};

// function initializeSocket(server) {
//     const io = new Server(server, {
//         cors: {
//             origin: "http://localhost:4200", // Change to your Angular frontend URL if needed (e.g., "http://localhost:4200")
//             methods: ["GET", "POST"],
//             allowedHeaders: ["Content-Type", "Authorization"]
//         }
//     });

//     io.on("connection", (socket) => {
//         console.log(`User connected: ${socket.id}`);

//         // Join Room
//         socket.on("joinRoom", ({ username, room }) => {
//             if (!username || !room) return;

//             socket.join(room);
//             users[socket.id] = { username, room };

//             io.to(room).emit("message", { sender: "System", text: `${username} joined ${room}` });
//             console.log(`${username} joined room: ${room}`);
//         });

//         // Private Chat
//         socket.on("privateMessage", ({ sender, receiver, message }) => {
//             if (!receiver || !message) return;
//             io.to(receiver).emit("privateMessage", { sender, message });
//             console.log(`Private message from ${sender} to ${receiver}: ${message}`);
//         });

//         // Group Chat
//         socket.on("groupMessage", ({ room, sender, message }) => {
//             if (!room || !message) return;
//             io.to(room).emit("groupMessage", { sender, message });
//             console.log(`Group message in ${room} from ${sender}: ${message}`);
//         });

//         // Leave Room
//         socket.on("leaveRoom", ({ username, room }) => {
//             if (!username || !room) return;
//             socket.leave(room);
//             io.to(room).emit("message", { sender: "System", text: `${username} left ${room}` });

//             console.log(`${username} left room: ${room}`);
//         });

//         // Handle Disconnection
//         socket.on("disconnect", () => {
//             if (users[socket.id]) {
//                 const { username, room } = users[socket.id];
//                 io.to(room).emit("message", { sender: "System", text: `${username} left the chat` });
//                 delete users[socket.id];
//                 console.log(`User disconnected: ${socket.id}`);
//             }
//         });
//     });

//     return io;
// }

// module.exports = { initializeSocket };

const { Server } = require("socket.io");
let users = {};

function initializeSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:4200", // Change to your Angular frontend URL if needed
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type", "Authorization"]
    }
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Join Room
    socket.on("joinRoom", ({ username, room }) => {
      if (!username || !room) return;

      socket.join(room);
      users[socket.id] = { username, room };

      io.to(room).emit("message", { sender: "System", text: `${username} joined ${room}` });
      console.log(`${username} joined room: ${room}`);
    });

    // Private Chat
    socket.on("privateMessage", ({ sender, receiver, message }) => {
      if (!receiver || !message) return;

      io.to(receiver).emit("privateMessage", { sender, message });
      console.log(`Private message from ${sender} to ${receiver}: ${message}`);
    });

    // Group Chat
    socket.on("groupMessage", ({ room, sender, message }) => {
      if (!room || !message) return;

      io.to(room).emit("groupMessage", { sender, message });
      console.log(`Group message in ${room} from ${sender}: ${message}`);
    });

    // Leave Room
    socket.on("leaveRoom", ({ username, room }) => {
      if (!username || !room) return;

      socket.leave(room);
      io.to(room).emit("message", { sender: "System", text: `${username} left ${room}` });
      console.log(`${username} left room: ${room}`);
    });

    // Handle Disconnection
    socket.on("disconnect", () => {
      if (users[socket.id]) {
        const { username, room } = users[socket.id];
        io.to(room).emit("message", { sender: "System", text: `${username} left the chat` });
        delete users[socket.id];
        console.log(`User disconnected: ${socket.id}`);
      }
    });
  });

  return io;
}

module.exports = { initializeSocket };
