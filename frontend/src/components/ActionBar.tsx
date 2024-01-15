import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

interface ActionBarProps {
  openCreateDialog: () => void;
}

export default function ActionBar({ openCreateDialog }: ActionBarProps) {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              HaHa Heros
            </Typography>
            <Button
              variant="contained"
              color="success"
              onClick={() => openCreateDialog()}
            >
              Add Volunteer
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
