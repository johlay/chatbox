import Header from "./components/Header";
import { theme } from "./theme/Theme";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Header />
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/login" element={<h1>Login</h1>} />
          <Route path="/register" element={<h1>Register</h1>} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
