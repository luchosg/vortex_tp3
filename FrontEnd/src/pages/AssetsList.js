import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteEmployee, fetchAssets } from '../actions';

import {Box, Alert, AlertTitle, Container, Button, Stack, Fab, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';


const AssetsList = () => {
    //------------------------ HOOKS --------------------------------

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [openDialog, setOpenDialog] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const fetched_assets = useSelector(state => state.resources.fetched_assets);

    useEffect(()=>{
        if(isLoading){
            dispatch(fetchAssets());
        }
        setLoading(false);
    }, [dispatch, fetched_assets, isLoading])

    //------------------------ HANDLERS ------------------------------

    const handleDelete = id => {
        setOpenDialog(true);
        setIdToDelete(id);
    }

    const handleAcceptDelete = ()=> {
        setOpenDialog(false);
        dispatch(deleteEmployee(Number(idToDelete)));
        setLoading(true);
        setIdToDelete(null);
    }

    const handleCancelDelete = () => {
        setOpenDialog(false);
    }

    //------------------------ TABLA/PAGINACION -----------------------

    const createData = (id, name, employee_id, description) => {
        return { id, name, employee_id, description };
      }

    const rows = [];
    if(fetched_assets){
        fetched_assets.map(asset => rows.push(createData(asset.id, asset.name, asset.employee_id, asset.description)));
    }
    
    const renderOptionButtons = ({id}) => { 
        return(
            <Stack direction="row" spacing={2} display='flex' justifyContent='center' alignItems='center'>
                <Button 
                    id={id} 
                    onClick={() => navigate(`/assets/${id}`)} 
                    variant="contained"
                    startIcon={<VisibilityIcon />}
                    >More Info
                </Button>
                <Button 
                    id={id} 
                    onClick={() => handleDelete(id)} 
                    variant="contained"
                    startIcon={<DeleteIcon />}
                    >Delete
                </Button>
            </Stack>
        )
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'name',
            headerName: 'Name',
            width: 150,
        },
        {
            field: 'employee_id',
            headerName: 'Owner ID',
            width: 150,
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 220,
        },
        {
          field: 'options',
          headerName: 'Options',
          sortable: false,
          width: 320,
          renderCell: renderOptionButtons
        },
      ];
    
    //------------------------------ RENDERS ---------------------------------------------

    const renderTable = () => {
        if(rows.length === 0){
            return (
              <Alert severity="warning">
                <AlertTitle>No hay mas empleados</AlertTitle>
                <strong>Agrega un nuevo empleado</strong>
              </Alert>
            )
        } else { return(
            <Box sx={{ height: 400, width: 940 }}>
                <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
                />
            </Box>
            )
        }
    }

    const renderInit = () => {
        return (
            <div>
                Loading...
            </div>
        )
    }

    const renderDialog = () => {
        return (
            <Dialog
                open={openDialog}
                onClose={handleCancelDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {`Esta seguro de eliminar al empleado ${idToDelete}?`}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        De aceptar la informacion del empleado se borrara definitivamente
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' color='secondary' onClick={handleCancelDelete}>Cancel</Button>
                    <Button id={idToDelete} variant='contained' onClick={handleAcceptDelete} autoFocus>Accept</Button>
                </DialogActions>
            </Dialog>
        )
    }

    return (
        <Container >
            <Stack direction='column' spacing={2} mt='100px' display='flex' justifyContent='center' alignItems='center'>
                <div>
                    <h1>Lista de activos</h1>
                </div>
                <div width= '100%'>
                    {fetched_assets ? renderTable() : renderInit()}
                </div>
                <div>
                    <Fab color="primary" aria-label="add">
                        <AddIcon onClick={() => navigate(`/assets/new`)} />
                    </Fab>
                </div>
                <div>
                    {renderDialog()}
                </div>
            </Stack>
        </Container>
    )    
}

export default AssetsList;