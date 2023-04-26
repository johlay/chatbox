import { AuthProvider } from "./authorization/AuthProvider";
import { Header } from "./components/";
import { LoginPage } from "./features/login/LoginPage";
import { RegisterPage } from "./features/register/RegisterPage";
import { theme } from "./theme/Theme";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { SnackbarProvider } from "notistack";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <AuthProvider>
      <SnackbarProvider maxSnack={1}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <Header />
            <Routes>
              <Route path="/" element={<h1>Home</h1>} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </SnackbarProvider>
    </AuthProvider>
  );
};

export default App;
