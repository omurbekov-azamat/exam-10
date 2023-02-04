import React from 'react';
import {AppBar, Container, Toolbar, Typography} from '@mui/material';
import {NavLink} from "react-router-dom";

const AppToolbar = () => {
    return (
        <AppBar position="sticky" sx={{mb: 2}}>
            <Container maxWidth='lg'>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        <NavLink to='news'>
                            News
                        </NavLink>
                        <NavLink to='/add-newPost' style={{marginLeft: '200px'}}>
                            Add new post
                        </NavLink>
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default AppToolbar;