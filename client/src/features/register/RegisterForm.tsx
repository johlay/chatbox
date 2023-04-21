import { margin as marginVariables } from "../../components/Variables";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { ReactNode } from "react";

const FormSection = ({ children }: { children?: ReactNode }) => (
  <div>{children}</div>
);

const FieldSection = ({ children }: { children: ReactNode }) => {
  return (
    <Stack
      direction={"row"}
      justifyContent={"center"}
      spacing={2}
      sx={{ marginBottom: marginVariables.m16 }}
    >
      {children}
    </Stack>
  );
};

const FormButton = ({ text }: { text: string }) => {
  return (
    <Button type="submit" variant="contained">
      {text}
    </Button>
  );
};

const FormTextField = styled(TextField)(
  ({
    fontColor = "#fff",
    variant,
  }: {
    fontColor?: string;
    variant: "outlined";
  }) => ({
    variant,

    fieldset: {
      color: fontColor,
    },

    input: {
      color: fontColor,
    },

    "& .MuiInputLabel-root": {
      color: fontColor,
    },

    "& .MuiOutlinedInput-root": {
      color: fontColor,

      "& fieldset": {
        borderColor: fontColor,
      },
      "&:hover fieldset": {
        borderColor: fontColor,
      },
      "&.Mui-focused fieldset": {
        borderColor: fontColor,
      },
    },
  })
);

const RegisterForm = () => {
  return (
    <Box component="form" autoComplete="off">
      <FormSection>
        <FieldSection>
          <FormTextField
            fontColor={"#fff"}
            label="First name"
            size="medium"
            variant="outlined"
          />
        </FieldSection>

        <FieldSection>
          <FormTextField
            aria-required
            required
            label={"First name"}
            size="medium"
            type="text"
            variant="outlined"
          />
        </FieldSection>
        <FieldSection>
          <FormTextField
            aria-required
            required
            label={"Last name"}
            size="medium"
            type="text"
            variant="outlined"
          />
        </FieldSection>
        <FieldSection>
          <FormTextField
            aria-required
            required
            label={"Email"}
            size="medium"
            type="email"
            variant="outlined"
          />
        </FieldSection>
        <FieldSection>
          <FormTextField
            aria-required
            required
            label={"Password"}
            size="medium"
            type="password"
            variant="outlined"
          />
        </FieldSection>

        <FieldSection>
          <FormButton text="Continue" />
        </FieldSection>
      </FormSection>
    </Box>
  );
};

export default RegisterForm;
