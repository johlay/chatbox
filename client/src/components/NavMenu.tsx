import { useAuth } from "../authorization/AuthProvider";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Url = "/" | "/register" | "/login" | "/logout" | "/profile";

export type NavItem = {
  url: Url;
  text: string;
};

export const mobileNavItemsLoggedIn: NavItem[] = [
  { url: "/", text: "Home" },
  { url: "/profile", text: "Profile" },
  { url: "/logout", text: "Log out" },
];

export const navItemsLoggedIn: NavItem[] = [{ url: "/", text: "Home" }];

export const navItemsLoggedOut: NavItem[] = [
  { url: "/", text: "Home" },
  { url: "/register", text: "Register" },
  { url: "/login", text: "Login" },
];

export const renderNavItems = (navItems: NavItem[]) => {
  return navItems.map((item) => {
    return (
      <Button
        key={item.text.toLocaleLowerCase()}
        href={item.url}
        sx={{ color: "#fff" }}
      >
        {item.text}
      </Button>
    );
  });
};

export const NavMenuLoggedIn = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleMenu = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(e.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    logout();
    handleClose();
    navigate("/", { replace: true });
  };

  const handleNavigation = (url: Url) => {
    handleClose();
    navigate(url, { replace: true });
  };

  return (
    <>
      {renderNavItems(navItemsLoggedIn)}
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleNavigation("/profile")}>
          Profile
        </MenuItem>
        <MenuItem onClick={() => handleLogout()}>Log out</MenuItem>
      </Menu>
    </>
  );
};

export const NavMenuLoggedOut = () => {
  return <>{renderNavItems(navItemsLoggedOut)}</>;
};
