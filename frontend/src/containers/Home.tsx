import React from 'react';
import {Outlet} from "react-router-dom";
import AppToolbar from "../components/UI/AppToolbar";
import {Container} from "@mui/material";

const Home = () => {
    return (
        <>
            <AppToolbar/>
            <Container maxWidth='lg'>
                <Outlet/>
            </Container>
        </>
    );
};

export default Home;