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
import Dialog from "@mui/material/Dialog";
import { useSnackbar } from "notistack";
import { ChangeEvent, SyntheticEvent } from "react";
import { Volunteer, createVolunteer, updateVolunteer } from "../api";

interface EditProps {
  open: boolean;
  initialVolunteer: Volunteer;
  onClose: () => void;
  isUpdate: boolean;
  volunteers: Volunteer[];
  setVolunteers: (volunteers: Volunteer[]) => void;
}

/**
 * The dialog for editing and creating a volunteer entry.
 *
 * @param props the props.
 * @returns The volunteer dialog
 */
export default function VolunteerDialog({
  open,
  initialVolunteer,
  onClose,
  isUpdate,
  volunteers,
  setVolunteers,
}: EditProps) {
  const { enqueueSnackbar } = useSnackbar();
  // Ok, I know I should've used a useState hook here, but I tried really hard and couldn't get it to work, so I gave up, but this works
  let volunteer = initialVolunteer;

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const apiCall = isUpdate ? updateVolunteer : createVolunteer;
    const response = await apiCall(volunteer);
    // In order to keep database calls to a minimum,
    // We only update the single entry in the volunteer array
    // This does lead to issues for the create method, and so
    // it has to have a custom VolunteerResponse with a payload attribute
    if (response.success && isUpdate) {
      const newVolunteers = volunteers.map((v) =>
        v.id === volunteer.id ? volunteer : v
      );
      setVolunteers(newVolunteers);
    } else if (response.success && response.payload) {
      const newVolunteers = volunteers.slice();
      newVolunteers.push(response.payload);
      setVolunteers(newVolunteers);
    }
    onClose();
    enqueueSnackbar(response.message, {
      variant: response.success ? "success" : "error",
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const key = e.target.id as keyof Omit<Volunteer, "status">;
    volunteer[key] = e.target.value;
  };

  const handleChange = <K extends keyof Volunteer>(key: K, newValue: any) => {
    volunteer[key] = newValue;
  };
  return (
    <Dialog onClose={handleClose} open={open} fullWidth={true} maxWidth="sm">
      <DialogTitle>
        {isUpdate ? `Update ${volunteer.name}'s Profile` : "Create Volunteer"}
      </DialogTitle>
      <Divider></Divider>
      <DialogContent>
        <form onSubmit={handleSubmit} autoComplete="off">
          <Stack spacing={3}>
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              defaultValue={volunteer.name}
              onInput={handleInputChange}
              data-lpignore="true"
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
              {isUpdate ? "Update" : "Create"}
            </Button>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
}
