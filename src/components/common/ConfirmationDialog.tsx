import { FC } from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

interface ConfirmDialogProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

/**
 * Dialog component for confirming deletion.
 * @param param0
 * @returns
 */
const ConfirmationDialog: FC<ConfirmDialogProps> = ({ open, onCancel, onConfirm }) => (
  <Dialog open={open} onClose={onCancel} aria-labelledby="confirm-dialog-title" aria-describedby="confirm-dialog-description">
    <DialogTitle id="confirm-dialog-title">Delete Product</DialogTitle>
    <DialogContent>
      <DialogContentText id="confirm-dialog-description">Are you sure you want to delete this product?</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel} color="primary" variant="outlined">
        Cancel
      </Button>
      <Button onClick={onConfirm} color="error" autoFocus variant="outlined">
        Delete
      </Button>
    </DialogActions>
  </Dialog>
);

export default ConfirmationDialog;
