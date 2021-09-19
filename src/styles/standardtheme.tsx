import { createTheme } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import "./fonts/porcelain/style.css";
import "./fonts/Roboto/stylesheet.css";
// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#641c14",
    },
    secondary: {
      main: "#ffffff",
      dark: "#000000",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
  typography: {
    fontFamily: "Roboto",
  },
});

export default theme;
