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

export default function FullFeaturedCrudGrid(props) {
  const [rows = [], setRows] =useState();
  const [rows2= [], setRows2] = useState();

  var initialAudit = {rowsAudit: {id: 0, date_time: null, parameter: null, marketplaceDetectionsId: 0, analysts_id: 0}}

  const [rowModesModel, setRowModesModel] = React.useState({});
  const [rowsId= [], setRowsId] = useState();
  const [rowsAudit, setRowsAudit]= useState(initialAudit);
  const [allData =[], setAllData]=useState();

  var rowsIdforAudit= 0;

  var rowToSave = {id: 0, state: "", status: "", reason_code: "", analystId: 2}

  var newStatus= ""
  var newState= ""
  var newReasonCode=""
  var analystId= props.analystID

  const getAllDetections = async () => {
    const response = await fetch("http://localhost:8008/api/marketplacedetections/getAll")
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

        fetch('http://localhost:8008/api/marketplacedetections/update', {
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
        headerName: 'Audit ID',
        width: 110,
    },

    {
        field: 'date_time',
        headerName: 'Date time',
        width: 160,
    },

    {
        field: 'parameter',
        headerName: 'Parameter',
        width: 110,
    },

    {
        field: 'marketplaceDetectionsId',
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
              pagination
              pageSize={7}
              rowsPerPageOptions={[5]}
              checkboxSelection
              disableSelectionOnClick
              rowModesModel={rowModesModel}
              onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
              onRowEditStart={handleRowEditStart}
              onRowEditStop={handleRowEditStop}
              processRowUpdate={processRowUpdate}
              onCellClick={detectionRow => {
                  rowsIdforAudit = detectionRow.id;
                  fetch(`http://localhost:8008/api/audit/getByMarketplaceDetection/${rowsIdforAudit}`)
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
              onSelectionModelChange={rowsId => {setRowsId(rowsId); console.log(rowsId)}}
              experimentalFeatures={{ newEditingApi: true }}
              />
      </Box>

      <Box textAlign="center"> 
        <Button  size="large" variant="outlined" onClick={()=> {updateDetection();}}> Update </Button>
      </Box>

          <Box sx={{ height: 400, width: '35%', minWidth:600 ,marginLeft: "auto", marginRight: "auto" }}>
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