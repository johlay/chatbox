import { NavItem } from "./NavMenu";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import MuiDrawer, { DrawerProps } from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

type MobileDrawerProps = {
  MobileProps: {
    heading: string;
    items: NavItem[];
    onClick: () => void;
  };
};

export const Drawer = ({
  children,
  MobileProps,
  ...props
}: DrawerProps & MobileDrawerProps) => {
  const mobileDrawer = (
    <Box onClick={MobileProps.onClick} sx={{ textAlign: "center" }}>
      <Typography color={"#fff"} variant="h6" sx={{ my: 2 }}>
        {MobileProps.heading}
      </Typography>
      <Divider sx={{ bgcolor: "#fff" }} />
      <List>
        {MobileProps.items.map((item) => (
          <ListItem key={item.text.toLowerCase()} disablePadding>
            <ListItemButton href={item.url} sx={{ textAlign: "center" }}>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <MuiDrawer {...props}>
      {children}
      {mobileDrawer}
    </MuiDrawer>
  );
};
