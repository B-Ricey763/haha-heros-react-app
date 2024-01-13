import "./App.css";
import VolunteerTable from "./VolunteerTable";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ActionBar from "./ActionBar";
import { useEffect, useState } from "react";
import { Volunteer, getVolunteers } from "./api";
import VolunteerDialog from "./VolunteerDialog";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentVolunteer, setCurrentVolunteer] = useState<Volunteer>(
    {} as Volunteer
  );

  useEffect(() => {
    const getRows = async () => {
      const volunteers = await getVolunteers();
      setVolunteers(volunteers);
    };
    getRows();
  }, []);

  const openCreateDialog = () => {
    setIsUpdate(false);
    setDialogOpen(true);
  };

  const openUpdateDialog = () => {
    setIsUpdate(true);
    setDialogOpen(true);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <>
        <CssBaseline />
        <ActionBar
          isDialogOpen={isDialogOpen}
          openCreateDialog={openCreateDialog}
          volunteers={volunteers}
          setVolunteers={setVolunteers}
        ></ActionBar>
        <VolunteerTable
          isDialogOpen={isDialogOpen}
          openUpdateDialog={openUpdateDialog}
          volunteers={volunteers}
          setVolunteers={setVolunteers}
          setCurrentVolunteer={setCurrentVolunteer}
        />
        <VolunteerDialog
          open={isDialogOpen}
          initialVolunteer={isUpdate ? currentVolunteer : ({} as Volunteer)}
          onClose={() => setDialogOpen(false)}
          isUpdate={isUpdate}
          volunteers={volunteers}
          setVolunteers={setVolunteers}
        />
      </>
    </ThemeProvider>
  );
}

export default App;
