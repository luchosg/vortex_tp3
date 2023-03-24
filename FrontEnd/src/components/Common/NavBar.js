import React from 'react';
import {useNavigate} from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

const NavBar = () => {
    const navigate = useNavigate();

    const handleHome = () => {
        navigate('/')
    }

    const handleNewEmployee = () => {
        navigate('/new')
    }

    const handleAssets = () => {
        navigate('/assets')
    }

    const handleNewAsset = () => {
        navigate('/assets/new')
    }

    return(
        <Container maxWidth="100%" sx={{ bgcolor: '#cfe8fc', height: '4vh' }}>
                <Button onClick={handleHome} startIcon={<HomeIcon />}>
                    Home
                </Button>
                <Button onClick={handleNewEmployee}>
                    New Employee
                </Button>
                <Button onClick={handleAssets}>
                    Assets
                </Button>
                <Button onClick={handleNewAsset}>
                    New Asset
                </Button>
        </Container>
    )
}

export default NavBar;