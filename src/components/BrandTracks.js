import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import {DataGrid} from "@mui/x-data-grid";
import Box from '@mui/material/Box';

const columns = [
    {
        field: "id",
        headerName: "Track ID",
        width: 80,
        editable: false,
    },
    {
        field: "search_term",
        headerName: "Brand Track",
        width: 150,
        editable: false,
    },
];

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='down' ref={ref} {...props} />;
});

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

export default function BrandTracks(props) {
  const [open, setOpen] = React.useState(false);
  const [brandTrack, setBrandTrack] = React.useState("");
  const [brandTrackList, setBrandTrackList] = React.useState([{id:0, search_term: null}]);
  const [selectedRows, setSelectedRows] = React.useState([]);

  // only enable the manage brand tracks button when an account was selected
  var showBrandTrackButton = false;
  if (props.accountId > 0) {
    showBrandTrackButton = true;
  }

  const handleClickOpen = () => {
    setOpen(true);
    fetch(`http://localhost:8008/api/brandtracks/getByAccount/${props.accountId}`)
    .then((response) => response.json())
    .then((data) => {
        setBrandTrackList(data)
        }
        )
  };

  const handleWindowClose = () => {
    setOpen(false);
    setBrandTrack("");
  };

  const handleSave = () => {
    var alreadyExists = false;

    if (brandTrack.length > 0) {

        brandTrackList.forEach((brandTrackObj) => {
            if (brandTrackObj.search_term.toUpperCase() === brandTrack.toUpperCase()) {
                alreadyExists = true;
            } }
        )

        if (alreadyExists) {
            alert("Oops... this brand track alread exists!")
        } else {
            setOpen(false)
            var newBrandTrack = {search_term: brandTrack, account_id: props.accountId}
            fetch('http://localhost:8008/api/brandtracks/create', {
            method: 'POST',
            body: JSON.stringify(newBrandTrack),
            headers: {
              'Content-Type': 'application/json',
              "Access-Control-Allow-Origin": "*",
            }
        })

        fetch(`http://localhost:8008/api/brandtracks/getByAccount/${props.accountId}`)
        .then((response) => response.json())
        .then((data) => {
            setBrandTrackList(data)
        }
        )
        alert("Brand track added successfully")
    }
    } else {
        alert("No brand track was added")
    }
  };

  const handleBrandTrack = (event) => {
    setBrandTrack(event.target.value)
  };

  const handleDeleteRows = () => {
    selectedRows.forEach((id) => {
        fetch(`http://localhost:8008/api/brandtracks/delete/${id}`, {
        method: 'DELETE'}) 
    })
    setBrandTrackList((current) => current.filter((track) => !selectedRows.includes(track.id)))
  }

  return (
    <div>
      {showBrandTrackButton && <Button variant="contained" color="success" size="large" onClick={handleClickOpen}>
        Manage Brand Tracks
      </Button>}
      {!showBrandTrackButton && <Button disabled variant="contained" color="success" size="large" >
        Select Customer Account
      </Button>}
      
      <Dialog
        onClose={handleWindowClose}
        aria-labelledby="customized-dialog-title"
        TransitionComponent={Transition}
        open={open}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleWindowClose}>
          Managing Brand Tracks
        </BootstrapDialogTitle>
        <DialogContent dividers>

        <Box sx={{ height: 400, width: 322 }}>
            <DataGrid
                rows={brandTrackList}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
                onSelectionModelChange={(row) => {setSelectedRows(row)}}
                experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
          <hr></hr>
          <br />
          <TextField
            autoFocus
            fullWidth
            margin="dense"
            id="name"
            label="Brand Track to add"
            type="text"
            variant="filled"
            onChange={handleBrandTrack}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleDeleteRows}>
            Delete Selected Rows
          </Button>
          <Button autoFocus onClick={handleSave} >
            Add Brand Track
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}