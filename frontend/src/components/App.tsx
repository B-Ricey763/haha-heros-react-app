import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Volunteer, getVolunteers } from "../api";
import { darkTheme } from "../theme";
import ActionBar from "./ActionBar";
import VolunteerDialog from "./VolunteerDialog";
import VolunteerTable from "./VolunteerTable";

interface AppProps {
  canEdit: boolean;
}

/**
 * React router loader that just forwards a call to the api
 *
 * @returns List of volunteers
 */
export async function volunteersLoader() {
  const volunteers = await getVolunteers();
  return volunteers;
}

/**
 * The entire application.
 *
 * @param {string} canEdit whether or not the component has edit privelges
 * @returns App component
 */
function App({ canEdit }: AppProps) {
  const loadedVolunteers = useLoaderData() as Volunteer[];
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [volunteers, setVolunteers] = useState<Volunteer[]>(loadedVolunteers);
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentVolunteer, setCurrentVolunteer] = useState<Volunteer>(
    {} as Volunteer
  );

  const openCreateDialog = () => {
    setIsUpdate(false);
    setDialogOpen(true);
  };

  const openUpdateDialog = () => {
    setIsUpdate(true);
    setDialogOpen(true);
  };

  return (
    <SnackbarProvider>
      <ThemeProvider theme={darkTheme}>
        <>
          <CssBaseline />
          <ActionBar openCreateDialog={openCreateDialog} canEdit={canEdit} />
          <VolunteerTable
            isDialogOpen={isDialogOpen}
            openUpdateDialog={openUpdateDialog}
            volunteers={volunteers}
            setVolunteers={setVolunteers}
            setCurrentVolunteer={setCurrentVolunteer}
            canEdit={canEdit}
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
    </SnackbarProvider>
  );
}

export default App;
