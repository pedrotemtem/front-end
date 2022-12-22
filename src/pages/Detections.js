import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import {
  GridRowModes,
  DataGridPro,
  GridActionsCellItem,
} from '@mui/x-data-grid-pro';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import "./pagesCSS/Detections.css";
import BrandTracks from "../components/BrandTracks.js";

export default function FullFeaturedCrudGrid(props) {
  const [rows = [], setRows] =useState();
  const [rows2= [], setRows2] = useState();

  var initialAudit = {rowsAudit: {id: 0, dateTime: null, parameter: null, detectionId: 0, userId: 0}}

  const [rowModesModel, setRowModesModel] = React.useState({});
  const [rowsId= [], setRowsId] = useState();
  const [rowsAudit, setRowsAudit]= useState(initialAudit);
  
  const [accountsList, setAccountsList] = useState([]);
  const [currentAccount, setCurrentAccount] = useState("");
  const [currentAccountID, setCurrentAccountID] = useState(0);

  var rowsIdforAudit= 0;

  var rowToSave = {id: 0, state: "", status: "", reasonCode: "", userId: 2}

  var newStatus= ""
  var newState= ""
  var newReasonCode=""
  var userId= props.userID

  /* only show the update database button when there are selected rows */
  var areRowsSelected = false
  if (rowsId.length > 0) {
    areRowsSelected = true;
  }

  /* prompts user to confirm if he wants to leave the page (on reload) */
  window.onbeforeunload = function () {
    return "";
 }

  const getDetectionsByID = async (id) => {
    const response = await fetch(`http://localhost:8008/api/detections/getByAccount/${id}`)
    .then((response) => response.json());

    setRows(response)
    setRows2(response)
  }

  const getAllAccounts = () => {
    fetch("http://localhost:8008/api/accounts/getAll")
      .then((response) => response.json())
      .then((data) => {
        setAccountsList(data)
        }
        )
  }

  const handleAccountsChange = (event) => {
    setCurrentAccount(event.target.value)
    //getting the account ID
    var accountID = event.target.value.charAt(0)
    setCurrentAccountID(accountID)
    /* load detections by account ID */
    getDetectionsByID(accountID)
  }
  
  useEffect(() => {
    getAllAccounts();
    },[])

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });    
    }

    const updateDetection=() => rowsId.forEach(element =>{
        const detect= rows.find(detectionElement =>{
            return detectionElement.id === element
        })

        const detect2 = rows2.find(detectionElement =>{
            return detectionElement.id === element
        })

        if (detect2.state === detect.state) {
            newState = ""
        }

        else{ newState= detect.state}

        if (detect2.status === detect.status) {
            newStatus = ""
        }
        else{ newStatus = detect.status;}

        if (detect2.reasonCode === detect.reasonCode) {
            newReasonCode = "";
        }
        else{ newReasonCode= detect.reasonCode;}
        
        rowToSave = {id: element, state: newState, status: newStatus, reasonCode: newReasonCode, userId: userId};

        console.log(rowToSave)

        fetch('http://localhost:8008/api/detections/update', {
            method: 'PUT',
            body: JSON.stringify(rowToSave),
            headers: {
              'Content-Type': 'application/json',
              "Access-Control-Allow-Origin": "*",
            }
        })

        // to avoid creating an audit record of an attribute that was already recorded in the audit table
        setRows(rows2);
    });  


  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const columnsAudit = [
    {
        field: 'id',
        headerName: 'Audit ID',
        width: 90,
    },

    {
        field: 'dateTime',
        headerName: 'Date time',
        width: 160,
    },

    {
        field: 'parameter',
        headerName: 'Parameter',
        width: 100,
    },
    {
        field: "oldValue",
        headerName: "Previous Value",
        width: 110,
        sortable: false,
    },
    {
      field: "newValue",
      headerName: "New Value",
      width: 110,
      sortable: false,
    },
    {
        field: 'detectionId',
        headerName: 'Detection Id',
        width: 110,
    },
    
    {
        field: 'userId',
        headerName: 'User Id',
        width: 85,
    },

    ];

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'title',
        headerName: 'Title',
        width: 150,
    },
    {
        field: 'description',
        headerName: 'Description',
        width: 150,
        description: 'This column has a value getter and is not sortable.',
    },
    {
        field: 'url',
        headerName: 'Url',
        type: 'number',
        width: 110,
    },
    {
        field: 'imageUrl',
        headerName: 'Image Url',
        sortable: false,
        width: 200,
        renderCell: (params) =><img src= {params.value} className="image" height="50px" alt=""/>,
    },
    {
        field: 'price',
        headerName: 'Price',
        width: 150,
    },
    {
        field: 'paidSearch',
        headerName: 'Paid Search',
        width: 110,
    },
    {
        field: 'orderOnPage',
        headerName: 'Order On Page',
        sortable: true,
        type: 'number',
        width: 160,
    },
    {
        field: 'captureDate',
        headerName: 'Capture Date',
        width: 150,
    },
    {
        field: 'seller',
        headerName: 'Seller',
        width: 110,
    },
    {
        field: 'marketplace',
        headerName: 'Marketplace',
        sortable: false,
        width: 160,
    },
    {
        field:"searchTerm",
        headerName: "Brand Track",
        width: 100,
    },
    {
        field: 'status',
        headerName: 'Status',
        sortable: true,
        width: 160,
        editable: true,
        type: 'singleSelect',
        valueOptions: ['open','closed']
    },
    {
        field: 'state',
        headerName: 'State',
        width: 110,
        editable: true,
        type: 'singleSelect',
        valueOptions: ['new','benign','enforce','']
    },
    {
        field: 'reasonCode',
        headerName: 'Reason Code',
        sortable: false,
        width: 160,
        editable: true,
        type: 'singleSelect',
        valueOptions: ['brand misuse','trademark infringement', 'phishing','fair-use']
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />
        ];
      },
    },
  ];


  return (
    <>
    <div className='flex-container'>
      <div className="flex-item-1">
        <Box sx={{minWidth: 180}} className="account-selector">
          <InputLabel sx={{fontWeight: "bold"}} className="account-label">Customer Account:</InputLabel>
          <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currentAccount}
          label="Account"
          onChange={handleAccountsChange}
          >
          {accountsList.map((brandAccount) =>
            <MenuItem key={brandAccount.id} value={brandAccount.id + "." + brandAccount.name}>{brandAccount.id} - {brandAccount.name}</MenuItem>
          )}
          </Select>
        </Box>
      </div>
      <div className="flex-item-2">
      {areRowsSelected && <Button size="large" variant="outlined" onClick={()=> {updateDetection();}}> Update Database</Button>}
      {!areRowsSelected && <Button size="large" variant="outlined" disabled> Select Rows to Update</Button>}
      <br/><br />
      <BrandTracks accountId={currentAccountID}/>
      </div>
    </div>        
    <br/>
    <Box className="info-table"
          sx={{
              height: 500,
              width: '100%',
              '& .actions': {
                  color: 'text.secondary',
              },
              '& .textPrimary': {
                  color: 'text.primary',
              },
          }}
      >
          <DataGridPro
              rows={rows}
              columns={columns}
              editMode="row"
              pagination
              pageSize={7}
              checkboxSelection
              disableSelectionOnClick
              rowModesModel={rowModesModel}
              onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
              onRowEditStart={handleRowEditStart}
              onRowEditStop={handleRowEditStop}
              processRowUpdate={processRowUpdate}
              onCellClick={detectionRow => {
                  rowsIdforAudit = detectionRow.id;
                  fetch(`http://localhost:8008/api/audit/getByDetection/${rowsIdforAudit}`)
                      .then(res => res.json())
                      .then(
                          (detectionAudit) => {
                              setRowsAudit({ rowsAudit: detectionAudit });
                          },
                          (error) => {
                              alert(error);
                          }
                      );
              } }
              onSelectionModelChange={rowsId => {setRowsId(rowsId)}}
              experimentalFeatures={{ newEditingApi: true }}
              />
      </Box>

          <Box className="info-table" sx={{ height: 400, width: '80%', minWidth: 450, maxWidth: 800,marginLeft: "auto", marginRight: "auto"}}>
            <DataGridPro
                rows={rowsAudit["rowsAudit"]}
                columns={columnsAudit}
                pagination
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
                initialState={{
                  sorting: {
                    sortModel: [{ field: 'id', sort: 'desc' }],
                  },
                }}
                experimentalFeatures={{ newEditingApi: true }}
            />
        </Box>
    </>
  );
}