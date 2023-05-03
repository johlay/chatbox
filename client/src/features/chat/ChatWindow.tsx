import { margin as marginVariables } from "../../components";
import styled from "@emotion/styled";
import SendIcon from "@mui/icons-material/Send";
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Divider from "@mui/material/Divider";

const StyledPaper = styled(Paper)`
  padding: ${marginVariables.m4};
`;

const MessageArea = () => {
  return (
    <>
      <TextField
        fullWidth
        placeholder="Type a message ..."
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton edge="end" color="primary">
                <SendIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};

const ChatReceiver = () => {
  return (
    // <Box>
    <StyledPaper variant="outlined" sx={{ marginBottom: "0.50rem" }}>
      <Grid container wrap="nowrap" spacing={1}>
        <Grid item>
          <Avatar sx={{ color: "red" }}>CL</Avatar>
        </Grid>
        <Grid item xs zeroMinWidth alignSelf="center">
          <Typography>Hello!</Typography>
        </Grid>
      </Grid>
    </StyledPaper>
    // </Box>
  );
};

const ChatSender = () => {
  return (
    // <Box>
    <StyledPaper variant="outlined" sx={{ marginBottom: "0.50rem" }}>
      <Grid container wrap="nowrap" spacing={1} flexDirection={"row-reverse"}>
        <Grid item>
          <Avatar sx={{ color: "red" }}>JL</Avatar>
        </Grid>
        <Grid item xs zeroMinWidth alignSelf="center">
          <Typography textAlign={"end"}>Hi!</Typography>
        </Grid>
      </Grid>
    </StyledPaper>
    // </Box>
  );
};

const ChatBox = () => {
  return (
    <>
      <Grid
        id="scroll"
        height={"380px"}
        padding={marginVariables.m8}
        sx={{ overflow: "hidden", overflowY: "scroll" }}
      >
        <ChatReceiver />
        <ChatSender />
      </Grid>
      <Grid
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        height={"15%"}
        paddingLeft={marginVariables.m8}
        paddingRight={marginVariables.m8}
      >
        <MessageArea />
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

const ChatRooms = () => {
  return (
    <Grid padding={marginVariables.m8}>
      <Typography variant="subtitle1">Chat Rooms</Typography>
      <Typography variant="body2">Room 1</Typography>
      <Typography variant="body2">Room 2</Typography>
    </Grid>
  );
};

export const ChatWindow = () => {
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
          <ChatRooms />
        </Grid>
        <Grid item xs={10} sx={{ backgroundColor: "" }}>
          <ChatBox />
        </Grid>
      </Grid>
    </Box>
  );
};
