import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import { useEffect, useState } from "react";
import { Volunteer, getVolunteers } from "../api";
import { darkTheme } from "../theme";
import ActionBar from "./ActionBar";
import VolunteerDialog from "./VolunteerDialog";
import VolunteerTable from "./VolunteerTable";

interface AppProps {
  canEdit: boolean;
}

export async function loader() {
  const volunteers = await getVolunteers();
  return { volunteers };
}

function App({ canEdit }: AppProps) {
  // I couldn't get this to work, so I gave up
  // const { loadedVolunteers }: any = useLoaderData();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentVolunteer, setCurrentVolunteer] = useState<Volunteer>(
    {} as Volunteer
  );

  useEffect(() => {
    const getVols = async () => {
      const { volunteers } = await loader();
      setVolunteers(volunteers);
    };
    getVols();
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
    <SnackbarProvider>
      <ThemeProvider theme={darkTheme}>
        <>
          <CssBaseline />
          <ActionBar openCreateDialog={openCreateDialog}></ActionBar>
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
