import { SectionContainer } from "../../components/SectionContainer";
import { SectionHeading } from "../../components/SectionHeading";
import RegisterForm from "./RegisterForm";

const RegisterPage = () => {
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

export default RegisterPage;
