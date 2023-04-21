import { SectionContainer } from "../../components/SectionContainer";
import { SectionHeading } from "../../components/SectionHeading";

const LoginPage = () => {
  return (
    <SectionContainer>
      <SectionHeading
        text="Login to your Helpchat account"
        subtext="Access your Helpchat profile using your email."
      ></SectionHeading>
    </SectionContainer>
  );
};

export default LoginPage;
