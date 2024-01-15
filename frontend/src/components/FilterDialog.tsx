import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { ChangeEvent, useState } from "react";

interface FilterDialogProps {
  open: boolean;
  onClose: (filter: string) => void;
  currentFilter: string;
}

export default function FilterDialog({
  open,
  onClose,
  currentFilter,
}: FilterDialogProps) {
  const [filterInput, setFilterInput] = useState(currentFilter);

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilterInput(event.target.value);
  };

  const handleClear = () => {
    setFilterInput("");
    onClose("");
  };

  const handleApply = () => {
    onClose(filterInput);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Filter by Hero Project</DialogTitle>
      <DialogContent>
        <TextField
          id="hero_project"
          name="hero_project"
          label="Hero Project"
          defaultValue={currentFilter}
          value={filterInput}
          onInput={handleFilterChange}
          margin="normal"
        ></TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClear}>Clear</Button>
        <Button onClick={handleApply}>Apply</Button>
      </DialogActions>
    </Dialog>
  );
}
