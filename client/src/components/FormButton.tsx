import Button from "@mui/material/Button";

export const FormButton = ({ text }: { text: string }) => {
  return (
    <Button type="submit" variant="contained">
      {text}
    </Button>
  );
};
