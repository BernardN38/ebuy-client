import React, { useState, useEffect } from 'react';
import { useOutletContext } from "react-router-dom";
import { AppBar, Toolbar, Box, styled, Typography, InputBase, Badge, Avatar, Menu, MenuItem } from "@mui/material";
import StorefrontIcon from '@mui/icons-material/Storefront';
import NavbarLogic from './NavbarLogic';
import { serverUrl } from '../../config';


function Navbar({ userId }) {
    const { navigate, handleClick, handleClose, setAnchorEl, anchorEl, open, source } = NavbarLogic();
    return (
        <AppBar position='sticky'>
            <SyledToolbar>
                <Typography variant="h6" sx={{ display: { xs: "none", ms: "block" } }}>SocialSphere</Typography>
                <StorefrontIcon style={linkStyles} sx={{ display: { xs: "block", ms: "none" } }} onClick={e => navigate(`/users/${userId}`)} />
                <Icons>
                    <Avatar sx={{ width: "30", height: "30" }} src={source} />
                </Icons>
                <UserBox >
                    <Avatar sx={{ width: "30", height: "30" }} src={source} onClick={handleClick} />
                </UserBox>
            </SyledToolbar>
            <Menu
                id="positioned-menu"
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                anchorEl={anchorEl}
            >
                {userId && LoggedinMenu}
                {userId ?
                    (<MenuItem>Logout</MenuItem>)
                    :
                    (<MenuItem onClick={(e) => {
                        navigate("/login");
                        setAnchorEl(null)
                    }}>Login</MenuItem>)}
            </Menu>

        </AppBar>
    )
}

export default Navbar;

const LoggedinMenu = () => {
    return (
        <>
            <MenuItem onClick={(e) => {
                navigate(`/users/${userId}`);
                setAnchorEl(null)
            }
            }>Profile</MenuItem>
            <MenuItem onClick={(e) => {
                navigate("/account");
                setAnchorEl(null)
            }}>My account</MenuItem>
        </>
    )
}


const SyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between"
})

const Icons = styled(Box)(({ theme }) => ({
    display: "none",
    gap: "20px",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
        display: "flex"
    }
}))

const UserBox = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: "10px",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
        display: "none"
    }
}))


const linkStyles = {
    textDecoration: 'none',
    cursor: 'pointer',
    '&:hover': {
        textDecoration: 'underline',
    },
}