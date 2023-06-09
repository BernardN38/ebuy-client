import { useState } from 'react'
import axios from "axios"
import { serverUrl } from '../../config';
import { useNavigate } from 'react-router-dom';


function NavbarLogic(setRefresh, refresh, userId) {
    const [source, setSource] = useState();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const getImage = () => {
    }
    return { source, navigate, handleClick, handleClose, setAnchorEl, anchorEl, open, getImage }
}

export default NavbarLogic;