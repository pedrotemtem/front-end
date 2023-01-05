import React, {useState} from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from "@mui/material/Box";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    registerables
} from "chart.js";
import {Bar} from "react-chartjs-2";

import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


import "./pagesCSS/Metrics.css";

// to register all the chart.js elements imported
ChartJS.register(...registerables);

export default function Metrics (props) {
    const [date, setDate] = useState(new Date());
    const [timeInterval, setTimeInterval] = useState(7);
    
    const getXLabels = () => {
        let internalDate = new Date(date);
        let day;
        let month;
        let year;
        let xLabels = []

        for (let dayCount = 0; dayCount < timeInterval; dayCount++) {
            day = internalDate.getDate();

            // we add 1 to get months in an 1-12 range
            month = internalDate.getMonth() + 1;

            year = internalDate.getFullYear();

            xLabels.push(day + "/" + month + "/" + year);

            internalDate = new Date(internalDate.setDate(internalDate.getDate() + 1));

        }

        return xLabels
    }
    
    const [xLabels, setXLabels] = useState(getXLabels);

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
        labels: getXLabels(),
        datasets: [
            {
                label: "Number of detections",
                data: [3,6,9,12,10,24,10,10,2],
                backgroundColor: "#DD929D",
                borderColor: "white",
                borderWidth: 2,
            }
        ]
    }

    const numFailuresData = {
        labels: getXLabels(),
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

    const timeIntervalSetter = (event) => {
        setTimeInterval(event.target.value);
        updateXLabelsState();
    }

    // creates a new copy oh the xLabels array (in a new memory position)
    // react will check that state was updated (due to the memory position being changed) ...
    // ... and rerender the component
    const updateXLabelsState = () => {
        let newXLabelsArray = getXLabels().slice();
        setXLabels(newXLabelsArray);
    }


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
                updateXLabelsState();
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

        </>
    )
}