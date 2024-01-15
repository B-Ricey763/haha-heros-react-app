import { ThemeProvider } from "@emotion/react";
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";
import { Volunteer } from "../api";
import { darkTheme } from "../theme";

export default function NotesPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const volunteer = location.state.volunteer as Volunteer;

  // So the state needs to persist between component mounts/unmounts,
  // but I don't know an easy way to do this on a seperate page in reacter router
  // I should just elevate the state to the parent component, but in this case
  // there is no parent, and since the requirements only dictate keeping track of
  // this one thing, I think it'll do
  const numClicked = useMemo(
    () =>
      parseInt(sessionStorage.getItem(`${volunteer.id}-notes-clicked`) || "1"),
    [volunteer]
  );

  useEffect(() => {
    sessionStorage.setItem(
      `${volunteer.id}-notes-clicked`,
      (numClicked + 1).toString()
    );
  }, [volunteer, numClicked]);

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: "flex", flexWrap: "wrap", padding: "10%" }}>
        <Container>
          <Paper elevation={3}>
            <Container
              sx={{
                padding: 1,
              }}
            >
              <Typography variant="h3">{volunteer.name}'s Notes</Typography>
              <Typography variant="body1">{volunteer.notes}</Typography>
              <Divider></Divider>
              <Typography variant="overline">
                This page has been visited {numClicked} times
              </Typography>
              <Button onClick={() => navigate(-1)}>Back</Button>
            </Container>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
