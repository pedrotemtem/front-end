import {Outlet, Link} from "react-router-dom";
import { AppBar, Toolbar, Typography, Stack, Button } from "@mui/material";
import "./pagesCSS/Navbar.css";

export default function Navbar () {
    return (
        <div>
            <AppBar position="static" className="appbar">
                <Toolbar className="toolbar">
                    <Typography variant="h6" component="div" sx={{flexGrow:1}}>
                        Tracer Portal
                    </Typography>
                    <Stack direction="row" spacing={2}>
                        <Button color="inherit"><Link className="navLink" to="/login">Login</Link></Button>
                    </Stack>
                </Toolbar>
            </AppBar>
            <Outlet/>
        </div>
    )
}


