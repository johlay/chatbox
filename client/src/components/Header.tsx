import logo from "../assets/logo.png";
import { Drawer } from "./Drawer";
import { drawer as drawerVariables } from "./Variables";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useState } from "react";

type HeaderProps = {
  window?: () => Window;
};

type Url = "/" | "/register" | "/login";

export type NavItem = {
  url: Url;
  text: string;
};

const navItems: NavItem[] = [
  { url: "/", text: "Home" },
  { url: "/register", text: "Register" },
  { url: "/login", text: "Login" },
];

const Header = (props: HeaderProps) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="static" component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <Box component={"span"} sx={{ paddingRight: "0.2rem" }}>
              Helpchat
            </Box>
            <Box component={"img"} src={logo} alt="logo" />
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                key={item.text.toLocaleLowerCase()}
                href={item.url}
                sx={{ color: "#fff" }}
              >
                {item.text}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          MobileProps={{
            onClick: handleDrawerToggle,
            items: navItems,
            heading: "Helpchat",
          }}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: {
              backgroundColor: "primary.main",
              color: "#fff",
            },
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerVariables.width,
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Header;
