import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { DataGridPro } from '@mui/x-data-grid-pro';
import Box from '@mui/material/Box';
import {Button} from "@mui/material";
import './pagesCSS/DetectionsTable.css';

const columns = [
    { field: 'id', headerName: 'ID', width: 40 },
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
      headerName: 'Detection Image',
      sortable: false,
      width: 150,
      renderCell: (params) =><img src={params.value} alt="" className="image" height="50px"/>,
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
      width: 130,
    },
    {
      field: 'capture_date',
      headerName: 'Capture DateTime',
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
      valueOptions: ['test','test2']
    },
    {
      field: 'state',
      headerName: 'State',
      width: 110,
      editable: true,
    },
    {
      field: 'reason_codes',
      headerName: 'Reason',
      sortable: false,
      width: 160,
      editable: true,
    },
  ];
  
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


export default class DetectionsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detections: [],
            detectionId: 0,
            audit: []
        }
    }
    
    componentDidMount() {
        fetch("http://localhost:8008/api/marketplacedetections/getAll")
        .then(res => res.json())
        .then(
            (detections) => {
                this.setState({ detections: detections });
            },
            (error) => {
                alert(error);
            }
        )
    }

    render() {
        return (
            <>
                <Box sx={{ height: 650, width: '100%' }}>
                    <DataGridPro
                        rows={this.state.detections}
                        columns={columns}
                        pagination
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        checkboxSelection
                        disableSelectionOnClick
                        experimentalFeatures={{ newEditingApi: true }}
                        /*onCellClick={detectionRow => {
                            this.state.detectionId= detectionRow.id;
                            fetch(`Colocar isto com o detectionId/${this.state.detectionId}`)
                            .then(res => res.json())
                            .then(
                            (detectionAudit) => {
                                this.setState({ detectionAudit : detectionAudit });
                            },
                            (error) => {
                                alert(error);
                            }
                            )
                        }}*/
                        onSelectionModelChange = {id => {
                            this.setState({
                                detectionId: id
                            })
                          console.log(this.state.detectionId)
                        }}
                    />

                </Box>

                <Button variant="outlined" onClick={this.saveInDatabase}> Update </Button>
            
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGridPro
                        rows={this.state.audit}
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
    )}
    
    /*useEffect(){
      // PUT request using fetch with error handling
      const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: 'React Hooks PUT Request Example' })
      };
      fetch('https://jsonplaceholder.typicode.com/invalid-url', requestOptions)
          .then(async response => {
              const data = await response.json();
  
              // check for error response
              if (!response.ok) {
                  // get error message from body or default to response status
                  const error = (data && data.message) || response.status;
                  return Promise.reject(error);
              }
  
              setPostId(data.id);
          })
          .catch(error => {
              setErrorMessage(error);
              console.error('There was an error!', error);
          });
    }*/

    saveInDatabase(){
        console.log('Success')
        console.log('Success2')

    }



}