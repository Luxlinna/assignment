import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

type NavbarProps = {
  onLogout?: () => Promise<void>;
};

export default function Navbar({ onLogout }: NavbarProps) {
  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" fontWeight="bold">Book App</Typography>
        {onLogout && (
          <Button
            color="inherit"
            variant="outlined"
            onClick={onLogout}
            sx={{ borderColor: "white", "&:hover": { borderColor: "white", backgroundColor: "rgba(255,255,255,0.1)" } }}
          >
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}



