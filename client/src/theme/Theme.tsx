import { blueGrey, grey } from "@mui/material/colors";
import createTheme from "@mui/material/styles/createTheme";

export const theme = createTheme({
  palette: {
    background: {
      default: grey["A200"],
    },
    primary: {
      main: blueGrey[500],
      // main: grey[800],
    },
  },
});
