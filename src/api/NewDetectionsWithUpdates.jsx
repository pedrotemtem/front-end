import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import {
  GridRowModes,
  DataGridPro,
  GridToolbarContainer,
  GridActionsCellItem,
} from '@mui/x-data-grid-pro';

export default function FullFeaturedCrudGrid(props) {
  const [rows = [], setRows] =useState();
  const [rows2= [], setRows2] = useState();

  const [rowModesModel, setRowModesModel] = React.useState({});
  const [rowsId= [], setRowsId] = useState();
  const [rowsAudit=[], setRowsAudit]= useState();
  const [allData =[], setAllData]=useState();

  var rowsIdforAudit= 0;

  var rowToSave = {id: 0, state: "", status: "", reason_code: "", analystId: 2}

  var newStatus= ""
  var newState= ""
  var newReasonCode=""
  var analystId= 2

  const getAllDetections = async () => {
    const response = await fetch("http://localhost:8081/api/marketplacedetections/getAll")
    .then((response) => response.json());

    setRows(response)
    setRows2(response)
  }
  

  useEffect(() => {
    getAllDetections();
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
    /* call api update detection*/
    
    }

    const updateDetection=() => rowsId.forEach(element =>{
        const detect= rows.find(detectionElement =>{
            return detectionElement.id === element
        })

        const detect2= rows2.find(detectionElement =>{
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

        if (detect2.reason_code === detect.reason_code) {
            newReasonCode = "";
        }
        else{ newReasonCode= detect.reason_code;}
        
        rowToSave = {id: element, state: newState, status: newStatus, reason_code: newReasonCode, analystId: analystId};

        fetch('http://localhost:8081/api/marketplacedetections/update', {
            method: 'PUT',
            body: JSON.stringify(rowToSave),
            headers: {
              'Content-Type': 'application/json',
              "Access-Control-Allow-Origin": "*",
            }
        })
        console.log(rowToSave);
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
        headerName: 'ID',
        width: 110,
    },

    {
        field: 'date_time',
        headerName: 'Date time',
        width: 110,
    },

    {
        field: 'parameter',
        headerName: 'Parameter',
        width: 110,
    },

    {
        field: 'marketplace_detections_id',
        headerName: 'Detection Id',
        width: 110,
    },
    
    {
        field: 'analysts_id',
        headerName: 'Analyst Id',
        width: 110,
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
        field: 'image_url',
        headerName: 'Image Url',
        sortable: false,
        width: 200,
        renderCell: (params) =><img src= {params.value} className="image" height="50px"/>,
    },
    {
        field: 'price',
        headerName: 'Price',
        width: 150,
    },
    {
        field: 'paid_search',
        headerName: 'Paid Search',
        width: 110,
    },
    {
        field: 'order_on_page',
        headerName: 'Order On Page',
        sortable: true,
        type: 'number',
        width: 160,
    },
    {
        field: 'capture_date',
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
        field: 'reason_code',
        headerName: 'Reason Code',
        sortable: false,
        width: 160,
        editable: true,
        type: 'singleSelect',
        valueOptions: ['test','test2']
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
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <><Box
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
              checkboxSelection
              disableSelectionOnClick
              rowModesModel={rowModesModel}
              onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
              onRowEditStart={handleRowEditStart}
              onRowEditStop={handleRowEditStop}
              processRowUpdate={processRowUpdate}
              onCellClick={detectionRow => {
                    rowsIdforAudit = detectionRow.id;
                    const res= fetch(`Colocar isto com o detectionId/${rowsIdforAudit}`)
                        .then(res => res.json());
                        setRowsAudit(res);
                    console.log(rowsAudit);
              } }
              onSelectionModelChange={rowsId => {setRowsId(rowsId); console.log(rowsId)}}
              experimentalFeatures={{ newEditingApi: true }}
              />
      </Box>

      <Button variant="outlined" onClick={()=> {console.log(allData);
                                            updateDetection();}}> Update </Button>
        
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGridPro
                rows={rowsAudit}
                columns={columnsAudit}
                pagination
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
            />
        </Box>
    </>
  );
}
