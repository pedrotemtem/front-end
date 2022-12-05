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
  const [brandList, setBrandList] = React.useState([]);

  var isNewBrand = true;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleWindowClose = () => {
    setOpen(false);
    setBrand("");
  };

  // to load existing brands the first time this component is rendered
  React.useEffect(() => {
    fetch("http://localhost:8008/api/account/getAll")
    .then((response) => response.json())
    .then((data) => {
        setBrandList(data)
        }
        )
  }, [])

  const handleSaveClose = () => {
    setOpen(false);
    if (brand.length > 0) {
        // check if the brand is already in the db
        brandList.forEach((brandObject) => {
            if (brand.toUpperCase() === brandObject.name.toUpperCase()) {
                isNewBrand = false;
                alert("This brand is already being protected by us! :)")
            }
        })

        if (isNewBrand) {
            var account = {name: brand}
                fetch('http://localhost:8008/api/account/create', {
                method: 'POST',
                body: JSON.stringify(account),
                headers: {
                  'Content-Type': 'application/json',
                  "Access-Control-Allow-Origin": "*",
                }
            })
            alert("Congrats! Your brand was added!")

            // to ensure that the brandList state is up to date with the new brand
            fetch("http://localhost:8008/api/account/getAll")
                .then((response) => response.json())
                .then((data) => {
                    setBrandList(data)
                }
                )
            
        }

    }
  };

  const handleBrandChange = (event) => {
    setBrand(event.target.value)
  };

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
          <hr></hr>
          <br />
          <TextField
            autoFocus
            fullWidth
            margin="dense"
            id="name"
            label="Brand name (account name)"
            type="text"
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
