import { margin as marginVariables } from "../../components";
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

const StyledPaper = styled(Paper)`
  padding: ${marginVariables.m4};
`;

const MessageField = () => {
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

const ChatWindow = () => {
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
        <MessageField />
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
    <List component="nav" sx={{ padding: marginVariables.m8 }}>
      <Typography variant="subtitle1">Chat Rooms</Typography>
      <ListItemButton
        component={Typography}
        variant="body2"
        sx={{ padding: marginVariables.m4 }}
      >
        Room 1
      </ListItemButton>
      <ListItemButton
        component={Typography}
        variant="body2"
        sx={{ padding: marginVariables.m4 }}
      >
        Room 2
      </ListItemButton>
    </List>
  );
};

export const ChatBox = () => {
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
          <ChatWindow />
        </Grid>
      </Grid>
    </Box>
  );
};
