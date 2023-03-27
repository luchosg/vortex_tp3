import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchEmployees } from '../../actions';


import HomeIcon from '@mui/icons-material/Home';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

const NavBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [search, setSearch] = useState(null);
    const [isLoading, setLoading] = useState(false);

    useEffect(()=>{
        if(isLoading && search){
            dispatch(fetchEmployees({last_name: search}));
        }
        setLoading(false);
    }, [dispatch, isLoading])

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

    const handleSearch = () => {
        navigate('/');
        setLoading(true);
    }

    return(
        <Container maxWidth="100%" sx={{ bgcolor: '#cfe8fc', height: '7vh', alignItems: 'center', display: 'flex'}}>
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
                <TextField
                    id='search' 
                    label='Search by Last Name'
                    onChange={event => setSearch(event.target.value)}
                    value={search || ''}
                />
                <Button onClick={handleSearch}>
                    Search
                </Button> 
        </Container>
    )
}

export default NavBar;