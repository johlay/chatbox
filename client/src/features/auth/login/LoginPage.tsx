import { SectionContainer, SectionHeading } from "../../../components/layout";
import { LoginForm } from "./LoginForm";

export const LoginPage = () => {
  return (
    <SectionContainer>
      <SectionHeading
        text="Login to your Helpchat account"
        subtext="Access your Helpchat profile using your email."
      />
      <LoginForm />
    </SectionContainer>
  );
};
