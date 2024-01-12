import Dialog from "@mui/material/Dialog";
import { Volunteer, updateVolunteer } from "./api";
import {
  Button,
  Container,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  Slider,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { useSnackbar } from "notistack";

interface EditProps {
  open: boolean;
  initialVolunteer: Volunteer;
  onClose: () => void;
}

export default function UpdateDialog({
  open,
  initialVolunteer,
  onClose,
}: EditProps) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  // Ok, I know I should've used a useState hook here, but I tried really hard and couldn't get it to work, so I gave up, but this works
  let volunteer = initialVolunteer;

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const response = await updateVolunteer(volunteer);
    enqueueSnackbar(response.message, {
      variant: response.success ? "success" : "error",
    });
    onClose();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Coercing this type was pain. So I gave up.
    // @ts-ignore
    volunteer[e.target.id] = e.target.value;
  };

  const handleChange = (key: string, newValue: any) => {
    // @ts-ignore
    volunteer[key] = newValue;
  };
  return (
    <Dialog onClose={handleClose} open={open} fullWidth={true} maxWidth="sm">
      <DialogTitle>{`Update ${volunteer.name}'s Profile`}</DialogTitle>
      <Divider></Divider>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              defaultValue={volunteer.name}
              onInput={handleInputChange}
            />
            <TextField
              id="phone"
              label="Phone"
              variant="outlined"
              defaultValue={volunteer.phone}
              onInput={handleInputChange}
            />
            <Container>
              <Typography variant="subtitle1">Rating</Typography>
              <Slider
                id="rating"
                aria-label="Rating"
                defaultValue={parseInt(volunteer.rating)}
                onChange={(_, value) => handleChange("rating", value)}
                step={1}
                marks
                min={1}
                max={9}
              />
            </Container>
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              defaultValue={volunteer.email}
              onInput={handleInputChange}
            />
            <FormControlLabel
              value="Active"
              control={
                <Switch
                  id="status"
                  defaultChecked={volunteer.status}
                  onChange={(_, v) => handleChange("status", v)}
                />
              }
              label="Active"
            />
            <TextField
              id="hero_project"
              label="Hero Project"
              variant="outlined"
              defaultValue={volunteer.hero_project}
              onInput={handleInputChange}
            />
            <Button type="submit" color="success">
              Update
            </Button>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
}
