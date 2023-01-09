import React, {useEffect, useState} from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from "@mui/material/Box";
import {
    Chart as ChartJS,
    registerables
} from "chart.js";
import {Bar} from "react-chartjs-2";

import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { AgGridReact } from 'ag-grid-react';

import "./pagesCSS/Metrics.css";

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';


// to register all the chart.js elements imported
ChartJS.register(...registerables);

export default function Metrics (props) {
    const [date, setDate] = useState(new Date());
    const [timeInterval, setTimeInterval] = useState(7);

    const [amazonESGraphData, setAmazonESGraphData] = useState([]);
    const [decathlonPTGraphData, setDecathlonPTGraphData] = useState([]);
    const [mercadoLivreBRGraphData, setMercadoLivreBRGraphData] = useState([]);
    
    var amazonESData = [];
    var decathlonPTData = [];
    var mercadoLivreBRData = [];

    const getXLabels = () => {
        let internalDate = new Date(date);
        let day;
        let month;
        let year;
        let xLabels = []

        for (var dayCount = 0; dayCount < timeInterval; dayCount++) {
            day = internalDate.getDate();

            // we add 1 to get months in an 1-12 range
            month = internalDate.getMonth() + 1;

            year = internalDate.getFullYear();

            xLabels.push(day + "/" + month + "/" + year);

            internalDate = new Date(internalDate.setDate(internalDate.getDate() + 1));

        }

        return xLabels
    }
    
    const [xLabels, setXLabels] = useState(getXLabels());

    const numDetectionsOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
            },
            title: {
                display: false,
                text: "Number of detections harvested by day",
                align: "center",
            }
        },
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            }
        },
    }

    const numFailuresOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
            },
            title: {
                display: false,
                text: "Number of failures by day",
            }
        },
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
    }


    const numDetectionsData = {
        labels: xLabels,
        datasets: [
            {
                label: "Amazon ES",
                data: amazonESGraphData,
            },
            {
                label: "Decathlon PT",
                data: decathlonPTGraphData,
            },
            {
                label: "Mercado Livre BR",
                data: mercadoLivreBRGraphData,
            }
        ]
    }

    const numFailuresData = {
        labels: xLabels,
        datasets: [
            {
                label: "400 Bad Request",
                data: [3,2,4,6,3,6,7,2,5,6,2,6,7,3],
            },
            {
                label: "500 Internal Server Error",
                data: [2,5,7,7,3,2,5,8,4,2,2,6,8,3],
            }

        ]
    }

    const harvestMetricsColumns = [
        {field: "HarvestProcess", width: 170, lockPosition: "left"},
        {field: "Max", width: 90},
        {field: "Min", width: 90},
        {field: "Average", width: 120},
    ]

    const harvestMetricsData = [
        {HarvestProcess: 1, Max: 12, Min: 3, Average: 7},
        {HarvestProcess: 2, Max: 19, Min: 6, Average: 12}
    ]

    const defaultColDef = [
        {suppressMovable: true}
    ]



    const updateData = async () => {

        var initialDateCopy = new Date(date)

        var initialDate = initialDateCopy.getFullYear() + "-" + (initialDateCopy.getMonth()+1) + "-" + initialDateCopy.getDate()
        
        var endDate = new Date(initialDateCopy.setDate(initialDateCopy.getDate() + timeInterval - 1))
        
        endDate = endDate.getFullYear() + "-" + (endDate.getMonth()+1) + "-" + endDate.getDate() 

        var response = await fetch("http://localhost:8008/api/detections/numberByDay/"+ initialDate + "/" + endDate);

        var data = await response.text();

        data = JSON.parse(data)

        cleanArray(data)
        
    }

    const cleanArray = (data) => {

        let intermediateArray = []

        for (let index = 0; index < data.length; index++) {
            intermediateArray.push(data[index].split(","))
        }

        let day;
        let month;
        let year;

        for (let index = 0; index < intermediateArray.length; index++) {
            intermediateArray[index][2] = parseInt(intermediateArray[index][2])
            day = parseInt(intermediateArray[index][0].slice(8,10))
            month = parseInt(intermediateArray[index][0].slice(5,7))
            year = parseInt(intermediateArray[index][0].slice(0,4))

            intermediateArray[index][0] = new Date(year, month-1, day)
        }

        loadDataArray(intermediateArray)
    }

    const loadDataArray = (intermediateArray) => {
        for (let index = 0; index < intermediateArray.length; index++) {
            if (intermediateArray[index][1] === "AmazonES") {
                amazonESData.push(intermediateArray[index])
            } else if (intermediateArray[index][1] === "DecathlonPT") {
                decathlonPTData.push(intermediateArray[index])
            } else if (intermediateArray[index][1] === "MercadoLivreBR") {
                mercadoLivreBRData.push(intermediateArray[index])
            } else {
                console.log("This one failed...")
            }
        }

        loadGraphDataArray("AmazonES")
        loadGraphDataArray("MercadoLivreBR")
        loadGraphDataArray("DecathlonPT")
    }

    const loadGraphDataArray = (marketplace) => {

        var dataArrayToUpdate = []
        var dataArrayToCheck;

        if (marketplace === "AmazonES") {
            dataArrayToCheck = amazonESData;
        } else if (marketplace === "MercadoLivreBR") {
            dataArrayToCheck = mercadoLivreBRData;
        } else if (marketplace === "DecathlonPT") {
            dataArrayToCheck = decathlonPTData;
        }

        var xLabelsIndex = 0
        var dataArrayIndex;
        var dataPointFound;
        var splitXLabels = []
        var xLabelsDate;

        // dates represented as [day, month, year]
        for (let index = 0; index < xLabels.length; index++) {
            splitXLabels.push(xLabels[index].split("/"))
        }

        while (xLabelsIndex < splitXLabels.length) {

            dataArrayIndex = 0;
            dataPointFound = false;

            while (dataArrayIndex < dataArrayToCheck.length) {

                xLabelsDate = new Date(parseInt(splitXLabels[xLabelsIndex][2]),parseInt(splitXLabels[xLabelsIndex][1])-1,parseInt(splitXLabels[xLabelsIndex][0]))

                if (xLabelsDate.getTime() === dataArrayToCheck[dataArrayIndex][0].getTime()) {
                    dataArrayToUpdate.push(dataArrayToCheck[dataArrayIndex][2])
                    dataPointFound = true;
                }
                dataArrayIndex++;
            }

            if (!dataPointFound) {
                dataArrayToUpdate.push(0)
            }

            xLabelsIndex++;
        }
        
        if (marketplace === "AmazonES") {
            setAmazonESGraphData(dataArrayToUpdate);
        } else if (marketplace === "MercadoLivreBR") {
            setMercadoLivreBRGraphData(dataArrayToUpdate);
        } else if (marketplace === "DecathlonPT") {
            setDecathlonPTGraphData(dataArrayToUpdate);
        }

    }

    const timeIntervalSetter = (event) => {
        setTimeInterval(event.target.value);
    }

    const updateXLabels = () => {
        let xLabelArray = getXLabels();
        // Creating a deep copy of XLabels array, so that react can detect when it's changed.
        let newXLabelsArray = JSON.parse(JSON.stringify(xLabelArray));
        setXLabels(newXLabelsArray);
    }
    
    // by setting a state (date or time interval) react will re-render the component
    // when re-rendering, it will set the state of XLabels, causing it to re-render again
    // to prevent continuous re-rendering, we apply the condition: this only runs
    // if there was a state change to date or time interval.

    useEffect(() => {
        updateXLabels();
    }, [date])

    useEffect(() => {
        updateXLabels();
    }, [timeInterval])

    useEffect(() => {
        updateData();
    },[xLabels])


    return(
        <>
            <Box sx={{minWidth: 180}} className="time-interval-box">
            <InputLabel sx={{fontWeight: "bold"}} className="account-label">Time Interval from selected date:</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={timeInterval}
                label="Time Interval"
                onChange={timeIntervalSetter}
            >
            <MenuItem key={7} value={7}>7 days</MenuItem>
            <MenuItem key={14} value={14}>14 days</MenuItem>
            <MenuItem key={30} value={30}>30 days </MenuItem>
            <MenuItem key={60} value={60}>60 days</MenuItem>
        </Select> <br /><br />

        <LocalizationProvider dateAdapter={AdapterDayjs} >
        <DatePicker
            className="date-picker"
            label="Initial Date"
            value={date}
            onChange={(newDate) => {
                setDate(newDate);
            }}
            inputFormat="DD/MM/YYYY"
            renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
        
        </Box>
        <br></br>
            <div>
                <div className="title"><h3>Number of detections harvested by day</h3></div>
                <div className="plot"><Bar options={numDetectionsOptions} data={numDetectionsData}/></div>
            </div>
            <div>
                <div className="title"><h3>Number of harvest failures by day</h3></div>
                <div className="plot"><Bar options={numFailuresOptions} data={numFailuresData}></Bar></div>
            </div>
            <div>
                <div className="title"><h3>Harvest Processes Metrics (Time in Seconds)</h3></div>
                <div className="ag-theme-material" style={{maxWidth: 450, height: 400, marginLeft: "auto", marginRight: "auto"}}>
                    <AgGridReact rowData={harvestMetricsData} columnDefs={harvestMetricsColumns} defaultColDef={defaultColDef} />
                </div>
            </div>

        </>
    )
}