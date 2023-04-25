import { FormButton } from "../../components/";
import { FieldSection, FormSection } from "../../components/layout";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export const LoginForm = () => {
  return (
    <Box component="form" autoComplete="off">
      <FormSection>
        <FieldSection>
          <TextField
            aria-required
            aria-label="input email"
            required
            label="Email"
            size="medium"
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
            type="text"
            variant="outlined"
          />
        </FieldSection>
        <FieldSection>
          <FormButton text="Log in" />
        </FieldSection>
      </FormSection>
    </Box>
  );
};
