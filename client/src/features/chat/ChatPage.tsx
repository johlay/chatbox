import { useAuth } from "../../authorization/AuthProvider";
import {
  HeaderStack,
  SectionContainer,
  SectionHeading,
} from "../../components/layout";
import { ChatBox } from "./ChatBox";
import Typography from "@mui/material/Typography";

export const ChatPage = () => {
  const { user } = useAuth();
  return (
    <SectionContainer>
      <SectionHeading
        text="Helpchat"
        subtext="A real-time chat application that allows users to send and receive messages from several users on the application."
      />
      <HeaderStack>
        <Typography variant="subtitle2">
          Services are only available for members.
        </Typography>
      </HeaderStack>
      {user && <ChatBox />}
    </SectionContainer>
  );
};
