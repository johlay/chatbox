import { useAuth } from "../../../authorization/AuthProvider";
import { FormButton } from "../../../components";
import { FieldSection, FormSection } from "../../../components/layout";
import { useToast } from "../../../hooks/useToast";
import { checkFormInput } from "../utils";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";

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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const firstnameError = useState<boolean>(false);
  const lastnameError = useState<boolean>(false);
  const emailError = useState<boolean>(false);
  const passwordError = useState<boolean>(false);

  const { register } = useAuth();
  const { updateToast } = useToast();

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    };

    if (checkFormInput(payload)) {
      const { message, status } = await register(payload);

      switch (status) {
        case 201: {
          updateToast({ message, variant: "success" });
          break;
        }

        case 409: {
          updateToast({ message });
          break;
        }
      }
    }
  };

  return (
    <Box component="form" autoComplete="off" onSubmit={(e) => onFormSubmit(e)}>
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
            onChange={(e) => setFirstName(e.target.value)}
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
            onChange={(e) => setLastName(e.target.value)}
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
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
          />
        </FieldSection>

        <FieldSection>
          <FormButton text="Continue" />
        </FieldSection>
      </FormSection>
    </Box>
  );
};
