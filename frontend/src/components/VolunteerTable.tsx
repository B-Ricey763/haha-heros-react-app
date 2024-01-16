import { FilterList } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  IconButton,
  TablePagination,
  TableSortLabel,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { ChangeEvent, useMemo, useState } from "react";
import { Volunteer } from "../api";
import FilterDialog from "./FilterDialog";
import VolunteerRow from "./VolunteerRow";

interface VolunteerTableProps {
  isDialogOpen: boolean;
  openUpdateDialog: () => void;
  volunteers: Volunteer[];
  setVolunteers: (volunteers: Volunteer[]) => void;
  setCurrentVolunteer: (volunteer: Volunteer) => void;
  canEdit: boolean;
}

type Order = "asc" | "desc";

function getComparator(order: Order): (a: Volunteer, b: Volunteer) => number {
  return order === "desc"
    ? (a, b) => -a.hero_project.localeCompare(b.hero_project)
    : (a, b) => a.hero_project.localeCompare(b.hero_project);
}

/**
 * A table with all volunteer data as well as the dialogs and pagination that
 * allow users to edit and cycle through volunteers
 *
 * @param {VolunteerTableProps} props the props
 * @returns Volunteer Table component
 */
export default function VolunteerTable({
  isDialogOpen,
  openUpdateDialog,
  volunteers,
  setVolunteers,
  setCurrentVolunteer,
  canEdit,
}: VolunteerTableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState<Order>("asc");
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [heroProjectFilter, setHeroProjectFilter] = useState("");
  const [filteredVolunteers, setFilteredVolunteers] = useState(volunteers);

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const rowsPerPage = parseInt(event.target.value);
    setRowsPerPage(rowsPerPage);
    setPage(0);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleSort = () => {
    setOrder(order === "asc" ? "desc" : "asc");
  };

  const visibleRows = useMemo(
    () =>
      filteredVolunteers
        // Only trigger filter when an actual valid filter is set
        .sort(getComparator(order))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, rowsPerPage, order, filteredVolunteers]
  );

  useMemo(
    () =>
      setFilteredVolunteers(
        volunteers.filter((v) =>
          heroProjectFilter !== "" ? v.hero_project === heroProjectFilter : true
        )
      ),
    [heroProjectFilter, volunteers]
  );

  const handleFilterOpen = () => {
    setFilterOpen(true);
  };

  const onFilterClose = (filter: string) => {
    setFilterOpen(false);
    setHeroProjectFilter(filter);
  };

  return (
    <>
      {volunteers.length > 0 ? (
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow key={0}>
                    <TableCell>Photo</TableCell>
                    <TableCell align="left">Name</TableCell>
                    <TableCell align="left">Phone</TableCell>
                    <TableCell align="left">Email</TableCell>
                    <TableCell align="left">Rating</TableCell>
                    <TableCell align="left">Status</TableCell>
                    <TableCell align="left">
                      <TableSortLabel
                        active={true}
                        direction={order}
                        onClick={handleSort}
                      >
                        Hero Project
                      </TableSortLabel>
                      <IconButton onClick={handleFilterOpen}>
                        <FilterList />
                      </IconButton>
                    </TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredVolunteers.length > 0 ? (
                    visibleRows.map((v: Volunteer) => (
                      <VolunteerRow
                        volunteer={v}
                        openUpdateDialog={openUpdateDialog}
                        setCurrentVolunteer={setCurrentVolunteer}
                        volunteers={volunteers}
                        setVolunteers={setVolunteers}
                        canEdit={canEdit}
                      />
                    ))
                  ) : (
                    <Typography
                      sx={{
                        textAlign: "center",
                        margin: 2,
                      }}
                    >
                      No Volunteers matching filter.
                    </Typography>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={filteredVolunteers.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <FilterDialog
              open={isFilterOpen}
              onClose={onFilterClose}
              currentFilter={heroProjectFilter}
            />
          </Paper>
        </Box>
      ) : (
        <CircularProgress />
      )}
    </>
  );
}
