import {
  HeaderStack,
  SectionContainer,
  SectionHeading,
} from "../../components/layout";
import { Typography } from "@mui/material";

export const ChatPage = () => {
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
    </SectionContainer>
  );
};
