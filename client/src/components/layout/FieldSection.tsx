import { margin as marginVariables } from "../../components/Variables";
import Stack from "@mui/material/Stack";
import { ReactNode } from "react";

export const FieldSection = ({ children }: { children: ReactNode }) => {
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
