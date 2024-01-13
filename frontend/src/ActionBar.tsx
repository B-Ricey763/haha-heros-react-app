import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import VolunteerDialog from "./VolunteerDialog";
import { Volunteer } from "./api";

interface ActionBarProps {
  isDialogOpen: boolean;
  openCreateDialog: () => void;
  volunteers: Volunteer[];
  setVolunteers: (volunteers: Volunteer[]) => void;
}

export default function ActionBar({
  isDialogOpen,
  openCreateDialog,
  volunteers,
  setVolunteers,
}: ActionBarProps) {
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
