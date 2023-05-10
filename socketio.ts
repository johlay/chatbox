import http from "http";
import { Server } from "socket.io";

type ChatRoom = {
  id: string;
  room_name: string;
};

type Message = {
  message: string;
  sender_socket_id: string;
};

type ChatMessages = {
  id: string;
  messages: Message[];
};

const CHAT_ROOMS: ChatRoom[] = [
  { id: "room1", room_name: "Room 1" },
  { id: "room2", room_name: "Room 2" },
];

let CHAT_MESSAGES: ChatMessages[] = [
  { id: "room1", messages: [] },
  { id: "room2", messages: [] },
];

const initSocketIO = (server: http.Server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_PORT ?? "http://localhost:3000",
    },
  });

  io.on("connection", async (socket) => {
    console.info("client connected:", socket.id);

    socket.on("chat_rooms", (_data) => {
      socket.emit("chat_rooms", CHAT_ROOMS);
    });

    socket.on("join_room", (data: ChatRoom) => {
      if (data != null) {
        socket.join(data.id);
      }
    });

    socket.on("chat_room_messages", (roomId: string) => {
      if (roomId !== null) {
        const findRoom = CHAT_MESSAGES.find((room) => room.id === roomId);

        io.in(roomId).emit("receive_messages", findRoom);
      }
    });

    socket.on(
      "send_message",
      ({ msg, roomId }: { msg: string; roomId: string }) => {
        if (roomId === null || roomId === undefined) {
          return;
        }

        const saveMessages = CHAT_MESSAGES.map((room) => {
          if (room.id === roomId) {
            const newMessage = { message: msg, sender_socket_id: socket.id };

            room.messages.push(newMessage);
            return room;
          }

          return room;
        });

        CHAT_MESSAGES = saveMessages;

        const findRoom = CHAT_MESSAGES.find((room) => room.id === roomId);

        io.in(roomId).emit("receive_messages", findRoom);
      }
    );

    socket.on("disconnect", (reason) => {
      console.info("client disconnected due to reason:", reason);
    });
  });
};

export { initSocketIO };
