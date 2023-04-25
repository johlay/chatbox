import { FormButton } from "../../components/";
import { FieldSection, FormSection } from "../../components/layout";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const _FormTextField = styled(TextField)(
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

export const RegisterForm = () => {
  return (
    <Box component="form" autoComplete="off">
      <FormSection>
        <FieldSection>
          <TextField
            aria-required
            aria-label="input first name"
            required
            label="First name"
            size="medium"
            type="text"
            variant="outlined"
          />
        </FieldSection>
        <FieldSection>
          <TextField
            aria-required
            aria-label="input last name"
            required
            label="Last name"
            size="medium"
            type="text"
            variant="outlined"
          />
        </FieldSection>
        <FieldSection>
          <TextField
            aria-required
            aria-label="input user email"
            required
            label="Email"
            size="medium"
            type="email"
            variant="outlined"
          />
        </FieldSection>
        <FieldSection>
          <TextField
            aria-required
            aria-label="input user password"
            required
            label="Password"
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
