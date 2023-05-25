import { SectionContainer, SectionHeading } from "../../../components/layout";
import { LoginForm } from "./LoginForm";

export const LoginPage = () => {
  return (
    <SectionContainer>
      <SectionHeading
        text="Login to your Chatbox account"
        subtext="Access your Chatbox profile using your email."
      />
      <LoginForm />
    </SectionContainer>
  );
};
