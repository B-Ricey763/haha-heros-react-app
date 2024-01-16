import { Delete, Edit } from "@mui/icons-material";
import { Avatar, Button, IconButton, TableCell, TableRow } from "@mui/material";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";
import { Volunteer, deleteVolunteer } from "../api";

interface RowProps {
  volunteer: Volunteer;
  setCurrentVolunteer: (volunteer: Volunteer) => void;
  openUpdateDialog: () => void;
  volunteers: Volunteer[];
  setVolunteers: (volunteers: Volunteer[]) => void;
  canEdit: boolean;
}

/**
 * The row for a volunteer in the table, responsible for notes, editing, and deleting.
 *
 * @param prop The props.
 * @returns The VolunteerRow component.
 */
export default function VolunteerRow({
  volunteer,
  setCurrentVolunteer,
  openUpdateDialog,
  volunteers,
  setVolunteers,
  canEdit,
}: RowProps) {
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = async (id: string) => {
    const response = await deleteVolunteer(id);
    if (response.success) {
      // Remove the deleted volunteer clientside so we don't call the server again
      setVolunteers(volunteers.filter((v) => v.id !== id));
    }
    enqueueSnackbar(response.message, {
      variant: response.success ? "success" : "error",
    });
  };

  const handleOpenUpdateDialog = (vol: Volunteer) => {
    setCurrentVolunteer(vol);
    openUpdateDialog();
  };

  return (
    <TableRow
      key={volunteer.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell>
        <Avatar src={volunteer.avatar} alt={`${volunteer.name}'s Profile`} />
      </TableCell>
      <TableCell component="th" scope="row">
        {volunteer.name}
      </TableCell>
      <TableCell align="left">{volunteer.phone}</TableCell>
      <TableCell align="left">{volunteer.email}</TableCell>
      <TableCell align="left">{volunteer.rating}</TableCell>
      <TableCell align="left">
        {volunteer.status ? "Active" : "Inactive"}
      </TableCell>
      <TableCell align="left">{volunteer.hero_project}</TableCell>
      <TableCell align="right">
        <Link to={`/${volunteer.id}/notes`} state={{ volunteer }}>
          <Button>Notes</Button>
        </Link>
        {canEdit && (
          <>
            <IconButton
              aria-label="delete"
              color="error"
              onClick={() => handleDelete(volunteer.id)}
            >
              <Delete />
            </IconButton>
            <IconButton
              aria-label="edit"
              color="primary"
              onClick={() => handleOpenUpdateDialog(volunteer)}
            >
              <Edit />
            </IconButton>
          </>
        )}
      </TableCell>
    </TableRow>
  );
}
