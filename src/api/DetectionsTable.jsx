import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Button} from 'react-bootstrap'
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import './DetectionsTable.css'



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

class DetectionsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detections: [],
            detectionId: 0,
            audit: []
        }
    }
    componentDidMount() {
        fetch("http://localhost:8081/api/marketplacedetections/getAll")
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
                    <DataGrid
                        rows={this.state.detections}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        checkboxSelection
                        disableSelectionOnClick
                        experimentalFeatures={{ newEditingApi: true }}
                        onCellClick={detectionRow => {
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
                        }} 
                    />
                </Box>

                <Button variant="outlined" onClick={this.saveInDatabase}> Update </Button>
            
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={this.state.audit}
                        columns={columnsAudit}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        disableSelectionOnClick
                        experimentalFeatures={{ newEditingApi: true }}
                    />
                </Box>
            
            
            </>
    )}

    saveInDatabase(){
        console.log('Success')
        console.log('Success2')

    }
}


export default DetectionsTable
