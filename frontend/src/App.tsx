import "./App.css";
import VolunteerTable from "./VolunteerTable";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ActionBar from "./ActionBar";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <>
        <CssBaseline />
        <ActionBar></ActionBar>
        <VolunteerTable />
      </>
    </ThemeProvider>
  );
}

export default App;
