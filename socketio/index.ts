import http from "http";
import { Server } from "socket.io";
import {
  ChatMessages,
  ChatRoom,
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from "./types";
import { logger } from "../logger";

const CHAT_ROOMS: ChatRoom[] = [
  { id: "room1", room_name: "Room 1" },
  { id: "room2", room_name: "Room 2" },
];

let CHAT_MESSAGES: ChatMessages[] = [
  { id: "room1", messages: [], users: [] },
  { id: "room2", messages: [], users: [] },
];

const initSocketIO = (server: http.Server) => {
  const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >(server, {
    cors: {
      origin: process.env.CLIENT_PORT ?? "http://localhost:3000",
    },
  });

  io.on("connection", async (socket) => {
    logger.info("client connected: %s", socket.id);

    socket.on("chat_rooms", (_data) => {
      socket.emit("chat_rooms", CHAT_ROOMS);
    });

    socket.on("chat_room_messages", (roomId: string) => {
      if (roomId !== null) {
        const findRoom = CHAT_MESSAGES.find((room) => room.id === roomId);

        io.in(roomId).emit("receive_messages", findRoom);
      }
    });

    socket.on("join_room", (room: ChatRoom, userId) => {
      if (room != null) {
        socket.join(room.id);

        CHAT_MESSAGES.map((chatroom) => {
          if (chatroom.id === room.id) {
            chatroom.users.push(userId);
          }

          return chatroom;
        });
      }
    });

    socket.on(
      "send_message",
      ({
        msg,
        roomId,
        userId,
      }: {
        msg: string;
        roomId: string;
        userId: string;
      }) => {
        if (roomId === null || roomId === undefined) {
          return;
        }

        const saveMessages = CHAT_MESSAGES.map((room) => {
          if (room.id === roomId) {
            const newMessage = { message: msg, sender_user_id: userId };

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
      logger.info("client disconnected due to reason: %s", reason);
    });
  });
};

export { initSocketIO };
