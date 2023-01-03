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
import DatePicker from "react-date-picker";

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

    const numDetectionsOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
            },
            title: {
                display: true,
                text: "Number of detections harvested by day"
            }
        }
    }

    const numDetectionsData = {
        labels: getXLabels(),
        datasets: [
            {
                label: "Number of detections",
                data: [3,6,9,12,10,24,10,10,2],
                backgroundColor: "purple",
                borderColor: "white",
                borderWidth: 2,
            }
        ]
    }

    const timeIntervalSetter = (event) => {
        setTimeInterval(event.target.value)
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
        </Select> <br /><br />
        <DatePicker
                calendarAriaLabel="Toggle Calendar"
                clearAriaLabel="Clear value"
                dayAriaLabel="Day"
                monthAriaLabel="Month"
                yearAriaLabel="Year"
                nativeInputAriaLabel="Date"
                value = {date}
                onChange = {setDate}
            />
        </Box>
        <br></br>
            <div style={{}}>
                <div></div>
            <Bar options={numDetectionsOptions} data={numDetectionsData} />
            </div>

        </>
    )
}