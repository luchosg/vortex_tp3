import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteEmployee, fetchEmployees } from '../actions';

import {Box, Alert, AlertTitle, Container, Button, Stack, Fab, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';


const EmployeesList = () => {
    //------------------------ HOOKS --------------------------------

    const employeesList = useSelector(state => state.rrhh.employees);
    const nextId = useSelector(state => state.rrhh.nextId[0]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [openDialog, setOpenDialog] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);

    const fetched_employees = useSelector(state => state.rrhh.fetched_employees);

    useEffect(()=>{
        dispatch(fetchEmployees());
    }, [dispatch])

    //------------------------ HANDLERS ------------------------------

    const handleDelete = event => {
        setOpenDialog(true);
        setIdToDelete(event.target.id);
    }

    const handleAcceptDelete = event => {
        setOpenDialog(false);
        dispatch(deleteEmployee(Number(event.target.id)));
        setIdToDelete(null);
    }

    const handleCancelDelete = () => {
        setOpenDialog(false);
    }

    //------------------------ TABLA/PAGINACION -----------------------

    const createData = (id, first_name, last_name, cuit) => {
        return { id, first_name, last_name, cuit };
      }

    const rows = [];
    if(fetched_employees){
        fetched_employees.map(employee => rows.push(createData(employee.id, employee.first_name, employee.last_name, employee.cuit)));
    }
    
    const renderOptionButtons = (params) => { 
        return(
            <Stack direction="row" spacing={2} display='flex' justifyContent='center' alignItems='center'>
                <Button 
                    id={params.id} 
                    onClick={event => navigate(`/employee/${event.target.id}`)} 
                    variant="contained"
                    startIcon={<VisibilityIcon />}
                    >More Info
                </Button>
                <Button 
                    id={params.id} 
                    onClick={handleDelete} 
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
          field: 'first_name',
          headerName: 'First name',
          width: 150,
        },
        {
          field: 'last_name',
          headerName: 'Last name',
          width: 150,
        },
        {
            field: 'cuit',
            headerName: 'cuit',
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
                    <h1>Lista de empleados</h1>
                </div>
                <div width= '100%'>
                    {employeesList ? renderTable() : renderInit()}
                </div>
                <div>
                    <Fab color="primary" aria-label="add">
                        <AddIcon onClick={() => navigate(`/new/${nextId}`)} />
                    </Fab>
                </div>
                <div>
                    {renderDialog()}
                </div>
            </Stack>
        </Container>
    )    
}

export default EmployeesList;