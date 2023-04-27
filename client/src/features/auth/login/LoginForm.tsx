import { useAuth } from "../../../authorization/AuthProvider";
import { FormButton } from "../../../components";
import { FieldSection, FormSection } from "../../../components/layout";
import { useToast } from "../../../hooks/useToast";
import { checkFormInput } from "../utils";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();
  const { updateToast } = useToast();

  const onFormLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      email,
      password,
    };

    if (checkFormInput(payload)) {
      const { message, status } = await login(payload);

      switch (status) {
        case 200: {
          updateToast({ autoHideDuration: 2000, message, variant: "success" });
          setTimeout(() => {
            navigate("/");
          }, 3000);
          break;
        }
        case 401:
        case 403: {
          updateToast({ message });
          break;
        }
      }
    }
  };

  return (
    <Box component="form" autoComplete="off" onSubmit={(e) => onFormLogin(e)}>
      <FormSection>
        <FieldSection>
          <TextField
            aria-required
            aria-label="input email"
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
          <FormButton text="Log in" />
        </FieldSection>
      </FormSection>
    </Box>
  );
};
