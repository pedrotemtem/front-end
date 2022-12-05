import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { DialogContentText } from '@mui/material';
import TextField from '@mui/material/TextField';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[600],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function RegistrationForm() {
  const [open, setOpen] = React.useState(false);
  const [brand, setBrand] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleWindowClose = () => {
    setOpen(false);
    setBrand("");
  };
  const handleSaveClose = () => {
    setOpen(false);
    if (brand.length > 0) {
        /* API call to save account in the db */
    }
    /* after saving, set this field back to empty */
    setBrand("")

  };
  const handleBrandChange = (event) => {
    setBrand(event.target.value)
  }

  return (
    <div>
      <Button variant="contained" color="success" size="large" onClick={handleClickOpen}>
        Create Account
      </Button>
      <BootstrapDialog
        onClose={handleWindowClose}
        aria-labelledby="customized-dialog-title"
        TransitionComponent={Transition}
        open={open} >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleWindowClose}>
          Register new client account
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            Please use this form to register a new customer account, so that we can start protecting your brand.
          </DialogContentText>
          <br />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Brand name (account name)"
            type="text"
            fullWidth
            variant="filled"
            onChange={handleBrandChange}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSaveClose} >
            Save account
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
