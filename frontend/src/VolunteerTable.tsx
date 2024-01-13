import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { Volunteer, getVolunteers } from "./api";
import VolunteerDialog from "./VolunteerDialog";
import VolunteerRow from "./VolunteerRow";

interface VolunteerTableProps {
  isDialogOpen: boolean;
  openUpdateDialog: () => void;
  volunteers: Volunteer[];
  setVolunteers: (volunteers: Volunteer[]) => void;
  setCurrentVolunteer: (volunteer: Volunteer) => void;
}

export default function VolunteerTable({
  isDialogOpen,
  openUpdateDialog,
  volunteers,
  setVolunteers,
  setCurrentVolunteer,
}: VolunteerTableProps) {
  return (
    <>
      {volunteers.length > 0 && (
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
                {volunteers.map((v) => (
                  <VolunteerRow
                    volunteer={v}
                    openUpdateDialog={openUpdateDialog}
                    setCurrentVolunteer={setCurrentVolunteer}
                    volunteers={volunteers}
                    setVolunteers={setVolunteers}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
}
