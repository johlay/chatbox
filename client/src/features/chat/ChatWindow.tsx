import { margin as marginVariables } from "../../components";
import { SectionHeading } from "../../components/layout";
import styled from "@emotion/styled";
import { Avatar, Box, Grid, Paper, Stack, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";

const MessageArea = () => {
  return <div>Message Area</div>;
};

const StyledPaper = styled(Paper)`
  padding: ${marginVariables.m4};
`;

const ChatReceiver = () => {
  return (
    <Box sx={{ overflow: "hidden" }}>
      <StyledPaper variant="outlined">
        <Grid container wrap="nowrap" spacing={1}>
          <Grid item>
            <Avatar sx={{ color: "red" }}>CL</Avatar>
          </Grid>
          <Grid item xs zeroMinWidth alignSelf="center">
            <Typography>Hello!</Typography>
          </Grid>
        </Grid>
      </StyledPaper>
    </Box>
  );
};

const ChatSender = () => {
  return (
    <Box sx={{ overflow: "hidden" }}>
      <StyledPaper variant="outlined">
        <Grid container wrap="nowrap" spacing={1} flexDirection={"row-reverse"}>
          <Grid item>
            <Avatar sx={{ color: "red" }}>JL</Avatar>
          </Grid>
          <Grid item xs zeroMinWidth alignSelf="center">
            <Typography textAlign={"end"}>Hi!</Typography>
          </Grid>
        </Grid>
      </StyledPaper>
    </Box>
  );
};

const ChatBox = () => {
  return (
    <>
      <Grid height="100%" container flexDirection={"column"} spacing={1}>
        <Grid item>
          <ChatReceiver />
        </Grid>
        <Grid item>
          <ChatSender />
        </Grid>
      </Grid>
      <Grid>
        <MessageArea />
      </Grid>
    </>
  );
};

const ChatHeader = () => {
  return (
    <Stack height={"10%"}>
      <SectionHeading text="Welcome to Helpchat!"></SectionHeading>
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
      <Grid
        height={"90%"}
        container
        columns={16}
        // direction={"row"}
        // sx={{ flexGrow: 1 }}
      >
        <Grid item xs={6} sx={{ backgroundColor: "" }}>
          <ChatRooms />
        </Grid>
        <Grid item xs={10} sx={{ backgroundColor: "" }}>
          <ChatBox />
        </Grid>
      </Grid>
    </Box>
  );
};
