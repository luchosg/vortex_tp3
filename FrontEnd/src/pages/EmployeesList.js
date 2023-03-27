import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteEmployee, fetchEmployees } from '../actions';
import sanitizeFilter from '../functions/sanitizeFilter';

import {Box, Alert, AlertTitle, Container, Button, Stack, Fab, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, TableFooter} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import IconButton from '@mui/material/IconButton';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';


const EmployeesList = () => {
    //------------------------ HOOKS --------------------------------

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [openDialog, setOpenDialog] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const fetched_employees = useSelector(state => state.rrhh.fetched_employees);
    const totalPages = useSelector(state => state.rrhh.totalPages);
    const prevPage = useSelector(state => state.rrhh.prevPage);
    const nextPage = useSelector(state => state.rrhh.nextPage);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState(5);
    const [filterParams, setFilterParams] = useState({});
    const [showFilters, setShowFilters] = useState(false);

    useEffect(()=>{
        if(isLoading){
            dispatch(fetchEmployees(sanitizeFilter(filterParams)));
        }
        setLoading(false);
    }, [dispatch, fetched_employees, isLoading, page])

    //------------------------ HANDLERS ------------------------------

    const handleDelete = id => {
        setOpenDialog(true);
        setIdToDelete(id);
    }

    const handleAcceptDelete = ()=> {
        setOpenDialog(false);
        dispatch(deleteEmployee(Number(idToDelete)));
        setIdToDelete(null);
    }

    const handleCancelDelete = () => {
        setOpenDialog(false);
    }

    const handleResetFilter = () => {
        setFilterParams({});
        setLoading(true);
    }

    const handleBackButtonClick = () => {
        setPage(prevPage);
        setFilterParams({...filterParams, page: prevPage});
        setLoading(true);
    }

    const handleNextButtonClick = () => {
        setPage(nextPage);
        setFilterParams({...filterParams, page: nextPage});
        setLoading(true);
    }

    const handleNewPagination = () => {
        if(Number(pagination) !== 0){
            setFilterParams({...filterParams, limit: pagination});
            setLoading(true);
        }
    }

    const handleShowInfo = id => {
        setFilterParams({});
        navigate(`/employees/${id}`)
    }
    //------------------------ TABLA/PAGINACION -----------------------

    const createData = (id, first_name, last_name, cuit) => {
        return { id, first_name, last_name, cuit };
      }

    const rows = [];
    if(fetched_employees){
        fetched_employees.map(employee => rows.push(createData(employee.id, employee.first_name, employee.last_name, employee.cuit)))
    }  
    
    const renderOptionsButtons = id => {
        return(
            <Stack direction="row" spacing={2} display='flex' justifyContent='center' alignItems='center'>
                <Button 
                    id={id} 
                    onClick={() => handleShowInfo(id)} 
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

    const renderPaginationButtons = () => {
        return (
            <Stack direction="row" spacing={2} display='flex' justifyContent='center' alignItems='center'>
                <IconButton
                    onClick={handleBackButtonClick}
                    disabled={page === 1}
                    aria-label="previous page"
                >
                    <KeyboardArrowLeft />
                </IconButton>
                <IconButton
                    onClick={handleNextButtonClick}
                    disabled={page === totalPages}
                    aria-label="next page"
                >
                    <KeyboardArrowRight />
                </IconButton>
            </Stack>
        )
    }

    //------------------------------ RENDERS ---------------------------------------------

    const renderTable = () => {
        if(rows.length === 0){
            return (
              <Alert severity="warning">
                <AlertTitle>No se encontraron empleados</AlertTitle>
              </Alert>
            )
        } else { return(
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">First Name</TableCell>
                            <TableCell align="right">Last Name</TableCell>
                            <TableCell align="right">CUIT</TableCell>
                            <TableCell align="right">Options</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map((row) => (
                            <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="right">{row.first_name}</TableCell>
                                <TableCell align="right">{row.last_name}</TableCell>
                                <TableCell align="right">{row.cuit}</TableCell>
                                <TableCell align="right">{renderOptionsButtons(row.id)}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell>{`Page: ${page}, Total pages: ${totalPages}`}</TableCell>
                                <TableCell>{renderPaginationButtons()}</TableCell>
                                <TableCell>
                                    <TextField 
                                        id={'pagination'} 
                                        label={'Pagination'}
                                        onChange={event => setPagination(event.target.value)}
                                        value={pagination}
                                        type={'number'}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button
                                        id='pagination'
                                        variant='contained'
                                        onClick={handleNewPagination}
                                    >
                                        Apply Pagination
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
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

    const renderTextField = (id, label, value, type, shrink) => {
        return(
            <TextField 
                id={id} 
                label={label}
                onChange={event => setFilterParams({...filterParams, [event.target.id]: event.target.value })}
                value={value}
                type={type}
                InputLabelProps={{
                    shrink: shrink
                }}
            />
        )
    }

    const renderFilterOptions = () => {
        return (
            <Stack direction='row' spacing={2}>
                {renderTextField('id','by ID', filterParams.id || '')}
                {renderTextField('first_name','by First Name', filterParams.first_name || '')}
                {renderTextField('last_name','by Last Name', filterParams.last_name || '')}
                {renderTextField('cuit','by CUIT', filterParams.cuit || '')}
                {renderTextField('team_id','by Team ID', filterParams.team_id || '')}
                {renderTextField('join_date','by Join Date', filterParams.join_date || '', 'date', true)}
                {renderTextField('rol','by Rol', filterParams.rol || '')}
            </Stack> 
        )
    }

    const renderFilterButtons = () => {
        return(
            <Stack direction='row' spacing={2}>
                <Button 
                    variant='contained' 
                    color='secondary' 
                    onClick={() => setShowFilters(showFilters => !showFilters)}
                >
                    {!showFilters? 'Show filters' : 'Hide filters'}
                </Button>
                {showFilters? <Button variant='contained' onClick={() => setLoading(true)}>Apply filters</Button> : null}
                {showFilters? <Button variant='contained' color='secondary' onClick={handleResetFilter}>Reset</Button> : null}
            </Stack>   
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
                <div>
                    {renderFilterButtons()}
                </div>
                <div>
                    {showFilters? renderFilterOptions() : null}
                </div>
                <div width= '100%'>
                    {fetched_employees ? renderTable() : renderInit()}
                </div>
                <div>
                    <Fab color="primary" aria-label="add">
                        <AddIcon onClick={() => navigate(`/new`)} />
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