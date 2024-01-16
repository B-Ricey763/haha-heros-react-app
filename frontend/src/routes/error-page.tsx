import { ThemeProvider } from "@emotion/react";
import { Box, Container, Paper, Typography } from "@mui/material";
import { useRouteError } from "react-router-dom";
import { darkTheme } from "../theme";

export default function ErrorPage() {
  const error: any = useRouteError();

  return (
    <ThemeProvider theme={darkTheme}>
      <Box id="error-page">
        <Container>
          <Paper
            sx={{
              padding: 2,
            }}
          >
            <Typography variant="h1">Oops!</Typography>
            <Typography variant="body1">
              Sorry, an unexpected error has occurred.
            </Typography>
            <Typography variant="body1" component="p">
              <i>{error.statusText || error.message}</i>
            </Typography>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
