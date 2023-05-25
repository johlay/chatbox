import { SectionContainer } from "../../../components/layout";
import { SectionHeading } from "../../../components/layout";
import { RegisterForm } from "./RegisterForm";

export const RegisterPage = () => {
  return (
    <SectionContainer>
      <SectionHeading
        text="Become a member today!"
        subtext="It's completely free to become a member."
      />
      <RegisterForm />
    </SectionContainer>
  );
};
