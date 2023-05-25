import { margin as marginVariables } from "../Variables";
import { Container } from "@mui/material";
import Stack, { StackProps } from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ReactNode } from "react";

type TSectionHeading = {
  text: string;
  children?: ReactNode;
  subtext?: string;
};

export const HeaderStack = ({ children, ...props }: StackProps) => {
  return (
    <Stack
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      direction={props.direction ?? "row"}
      justifyContent={props.justifyContent ?? "center"}
      sx={{ marginBottom: marginVariables.m16 }}
    >
      {children}
    </Stack>
  );
};

export const Subtext = ({ subtext }: { subtext: string }) => {
  return <Typography variant={"subtitle1"}>{subtext}</Typography>;
};

export const SectionHeading = ({
  children,
  text,
  subtext,
}: TSectionHeading) => {
  return (
    <Container>
      <HeaderStack>
        <Typography variant={"h6"}>{text}</Typography>
      </HeaderStack>
      <HeaderStack>{subtext && <Subtext subtext={subtext} />}</HeaderStack>
      {children}
    </Container>
  );
};
