import Container, { ContainerProps } from "@mui/material/Container";

export const SectionContainer = ({ children, ...props }: ContainerProps) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Container {...props}>{children}</Container>;
};
