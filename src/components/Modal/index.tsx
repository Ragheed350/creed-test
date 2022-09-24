import React, { ReactNode } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface props {
  title: string;
  open: boolean;
  footer?: boolean;
  handleClose?: () => void;
  handleOk?: () => void;
  children: ReactNode | ReactNode[];
}

export const ModalC: React.FC<props> = ({ title, open = false, footer = true, handleClose, handleOk, children }) => {
  return (
    <Dialog
      sx={{ "& .MuiPaper-root": { maxWidth: "initial" } }}
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      {footer && (
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleOk} color="error">
            {title.split(" ")[0]}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};
