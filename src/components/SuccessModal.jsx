import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";

export default function SuccessModal({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className="successModal"
    >
      <DialogTitle id="alert-dialog-title">
        <Typography variant="h6" component="span">
          Success
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography
          id="success-dialog-description"
          variant="body1"
          gutterBottom
        >
          Your form has been submitted successfully!
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
