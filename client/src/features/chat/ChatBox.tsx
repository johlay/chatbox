import { User, useAuth } from "../../authorization/AuthProvider";
import { margin as marginVariables } from "../../components";
import { Message, ChatMessages, ChatRoom } from "./types";
import { getNameInitials } from "./utils";
import styled from "@emotion/styled";
import SendIcon from "@mui/icons-material/Send";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:8000", { autoConnect: false });

const StyledPaper = styled(Paper)`
  padding: ${marginVariables.m4};
`;

const MessageField = ({
  selectedRoom,
  setChatMessages,
}: {
  selectedRoom: ChatRoom | null;
  setChatMessages: (roomMessages: ChatMessages["messages"]) => void;
}) => {
  const [messageToSend, setMessageToSend] = useState("");

  useEffect(() => {
    setMessageToSend("");
  }, [selectedRoom]);

  if (!selectedRoom) {
    return null;
  }

  const handleMessageToSend = (
    e: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    if (messageToSend.length < 1) {
      return;
    }

    socket.emit("send_message", {
      msg: messageToSend,
      roomId: selectedRoom.id,
    });

    socket.on("receive_messages", (roomMessages: ChatMessages) => {
      setChatMessages(roomMessages.messages);
    });

    resetMessageToSend();
  };

  const resetMessageToSend = () => setMessageToSend("");

  return (
    <>
      <TextField
        autoComplete="off"
        fullWidth
        value={messageToSend}
        placeholder="Type a message ..."
        onChange={(e) => setMessageToSend(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleMessageToSend(e)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={(e) => handleMessageToSend(e)}
                edge="end"
                color="primary"
              >
                <SendIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};

const ChatReceiver = ({
  message,
  userNameInitials = "",
}: {
  message: string;
  userNameInitials: string;
}) => {
  return (
    // <Box>
    <StyledPaper variant="outlined" sx={{ marginBottom: "0.50rem" }}>
      <Grid container wrap="nowrap" spacing={1}>
        <Grid item>
          <Avatar sx={{ color: "red" }}>{userNameInitials}</Avatar>
        </Grid>
        <Grid item xs zeroMinWidth alignSelf="center">
          <Typography>{message}</Typography>
        </Grid>
      </Grid>
    </StyledPaper>
    // </Box>
  );
};

const ChatSender = ({
  message,
  userNameInitials = "",
}: {
  message: string;
  userNameInitials: string;
}) => {
  return (
    // <Box>
    <StyledPaper variant="outlined" sx={{ marginBottom: "0.50rem" }}>
      <Grid container wrap="nowrap" spacing={1} flexDirection={"row-reverse"}>
        <Grid item>
          <Avatar sx={{ color: "red" }}>{userNameInitials}</Avatar>
        </Grid>
        <Grid item xs zeroMinWidth alignSelf="center">
          <Typography textAlign={"end"}>{message}</Typography>
        </Grid>
      </Grid>
    </StyledPaper>
    // </Box>
  );
};

const ChatWindow = ({
  chatMessages,
  setChatMessages,
  selectedRoom,
  user,
}: {
  chatMessages: ChatMessages["messages"] | undefined;
  setChatMessages: (messages: Message[]) => void;
  selectedRoom: ChatRoom | null;
  user: User | null;
}) => {
  useEffect(() => {
    if (isEmpty(!selectedRoom)) {
      joinChatRoom();
    }
  }, [selectedRoom]);

  const joinChatRoom = () => {
    socket.emit("join_room", selectedRoom);
  };

  const renderChatMessages =
    chatMessages &&
    chatMessages.map(
      ({ message, sender_socket_id }: Message, index: number) => {
        if (sender_socket_id === socket.id) {
          return (
            <ChatSender
              userNameInitials={
                user ? getNameInitials(user.first_name, user.last_name) : ""
              }
              message={message}
              key={index}
            />
          );
        } else {
          return (
            <ChatReceiver
              userNameInitials={
                user ? getNameInitials(user.first_name, user.last_name) : ""
              }
              message={message}
              key={index}
            />
          );
        }
      }
    );

  return (
    <>
      <Grid
        id="scroll"
        height={"380px"}
        padding={marginVariables.m8}
        sx={{ overflow: "hidden", overflowY: "scroll" }}
      >
        {renderChatMessages}
      </Grid>
      <Grid
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        height={"15%"}
        paddingLeft={marginVariables.m8}
        paddingRight={marginVariables.m8}
      >
        <MessageField
          setChatMessages={setChatMessages}
          selectedRoom={selectedRoom}
        />
      </Grid>
    </>
  );
};

const ChatHeader = () => {
  return (
    <Stack justifyContent={"center"} height={"10%"}>
      <Typography align="center" gutterBottom={false} variant="h6">
        Welcome to Helpchat!
      </Typography>
    </Stack>
  );
};

const ChatRooms = ({
  selectRoom,
  selectedRoom,
}: {
  selectedRoom: ChatRoom | null;
  selectRoom: (room: ChatRoom) => void;
}) => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    (() => {
      getChatRooms();
    })();
  }, []);

  const getChatRooms = () => {
    socket.emit("chat_rooms");

    socket.on("chat_rooms", (data) => {
      setRooms(data);
    });
  };

  return (
    <List component="nav" sx={{ padding: marginVariables.m8 }}>
      <Typography variant="subtitle1">Chat Rooms</Typography>
      {!isEmpty(rooms) &&
        rooms.map((room: any) => (
          <ListItemButton
            id={room.id}
            key={room.id}
            component={Typography}
            variant="body2"
            selected={selectedRoom?.id === room.id}
            sx={{ padding: marginVariables.m4 }}
            onClick={() => selectRoom(room)}
          >
            {room.room_name}
          </ListItemButton>
        ))}
    </List>
  );
};

export const ChatBox = () => {
  const [socketId, setSocketId] = useState<string>("");
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessages["messages"]>();

  const { user } = useAuth();

  const selectRoom = (chatroom: ChatRoom) => setSelectedRoom(chatroom);

  useEffect(() => {
    if (socket.id) {
      setSocketId(socket.id);
    }
  }, [socket]);

  useEffect(() => {
    if (selectedRoom) {
      socket.emit("chat_room_messages", selectedRoom?.id);

      socket.on("receive_messages", (roomMessages: ChatMessages) => {
        setChatMessages(roomMessages.messages);
      });
    }
  }, [selectedRoom]);

  return (
    <Box
      component="div"
      sx={{
        border: "1px solid black",
        borderRadius: 1,
        height: "500px",
      }}
    >
      <ChatHeader />
      <Divider sx={{ backgroundColor: "black" }} />
      <Grid height={"90%"} container columns={16}>
        <Grid
          item
          xs={6}
          sx={{ backgroundColor: "", borderRight: "1px solid black" }}
        >
          <ChatRooms selectedRoom={selectedRoom} selectRoom={selectRoom} />
        </Grid>
        <Grid item xs={10} sx={{ backgroundColor: "" }}>
          <ChatWindow
            chatMessages={chatMessages}
            // socketId={socketId}
            selectedRoom={selectedRoom}
            setChatMessages={setChatMessages}
            user={user}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
