import { AuthProvider } from "./authorization/AuthProvider";
import { Header } from "./components/";
import { LoginPage } from "./features/auth/login/LoginPage";
import { RegisterPage } from "./features/auth/register/RegisterPage";
import { ChatPage } from "./features/chat/ChatPage";
import { theme } from "./theme/Theme";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { SnackbarProvider } from "notistack";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const App = () => {
  return (
    <AuthProvider>
      <SnackbarProvider maxSnack={1}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <Header />
            <Routes>
              <Route path="/" element={<ChatPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="*" element={<Navigate to={"/"} />} />
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </SnackbarProvider>
    </AuthProvider>
  );
};

export default App;
