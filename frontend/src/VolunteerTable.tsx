import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Stack from "@mui/material/Stack";
import { Volunteer, Response, deleteVolunteer, getVolunteers } from "./api";
import { useSnackbar } from "notistack";
import UpdateDialog from "./UpdateDialog";
import { Avatar, Tab } from "@mui/material";

export default function VolunteerTable() {
  const [currentVolunteer, setCurrentVolunteer] = useState<Volunteer>(
    {} as Volunteer
  );
  const [isUpdateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [rows, setRows] = useState<Volunteer[]>([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const getRows = async () => {
    const volunteers = await getVolunteers();
    setRows(volunteers);
  };

  useEffect(() => {
    getRows();
  }, []);

  const handleDelete = async (id: string) => {
    const response = await deleteVolunteer(id);
    enqueueSnackbar(response.message, {
      variant: response.success ? "success" : "error",
    });
    getRows();
  };

  const handleOpenUpdateDialog = (vol: Volunteer) => {
    setCurrentVolunteer(vol);
    setUpdateDialogOpen(true);
  };

  const handleCloseUpdateDialog = () => {
    setUpdateDialogOpen(false);
  };

  return (
    <>
      {rows.length > 0 && (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Photo</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Phone</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Rating</TableCell>
                  <TableCell align="left">Status</TableCell>
                  <TableCell align="left">Hero Project</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>
                      <Avatar src={row.avatar} alt={`${row.name}'s Profile`} />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="left">{row.phone}</TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">{row.rating}</TableCell>
                    <TableCell align="left">
                      {row.status ? "Active" : "Inactive"}
                    </TableCell>
                    <TableCell align="left">{row.hero_project}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        aria-label="delete"
                        color="error"
                        onClick={() => handleDelete(row.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="edit"
                        color="primary"
                        onClick={() => handleOpenUpdateDialog(row)}
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <UpdateDialog
            open={isUpdateDialogOpen}
            initialVolunteer={currentVolunteer}
            onClose={handleCloseUpdateDialog}
          />
        </>
      )}
    </>
  );
}
