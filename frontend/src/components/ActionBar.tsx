import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

interface ActionBarProps {
  openCreateDialog: () => void;
  canEdit: boolean;
}

/**
 * Top bar with the name and 'Add Volunteer' Button
 *
 * @param props Props
 * @returns The ActionBar Component
 */
export default function ActionBar({
  openCreateDialog,
  canEdit,
}: ActionBarProps) {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              HaHa Heros
            </Typography>
            {canEdit && (
              <Button
                variant="contained"
                color="success"
                onClick={() => openCreateDialog()}
              >
                Add Volunteer
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
