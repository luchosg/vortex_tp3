import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteAsset, fetchAssets } from '../actions';
import sanitizeFilter from '../functions/sanitizeFilter';

import {Alert, AlertTitle, Container, Button, Stack, TextField, Fab, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableFooter from '@mui/material/TableFooter';

import IconButton from '@mui/material/IconButton';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

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
    const totalPages = useSelector(state => state.resources.totalPages);
    const prevPage = useSelector(state => state.resources.prevPage);
    const nextPage = useSelector(state => state.resources.nextPage);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState(5);
    const [showFilters, setShowFilters] = useState(false);
    const [filterParams, setFilterParams] = useState({});

    useEffect(()=>{
        if(isLoading){
            dispatch(fetchAssets(sanitizeFilter(filterParams)));
        }
        setLoading(false);
    }, [dispatch, fetched_assets, isLoading, page])

    //------------------------ HANDLERS ------------------------------

    const handleDelete = id => {
        setOpenDialog(true);
        setIdToDelete(id);
    }

    const handleAcceptDelete = ()=> {
        setOpenDialog(false);
        dispatch(deleteAsset(Number(idToDelete)));
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

    //------------------------ TABLA/PAGINACION -----------------------

    const createData = (id, name, type, employee_id) => {
        return { id, name, type, employee_id };
      }

    const rows = [];
    if(fetched_assets){
        fetched_assets.map(asset => rows.push(createData(asset.id, asset.name, asset.type, asset.employee_id)));
    }

    const renderOptionsButtons = id => {
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
                <AlertTitle>No se encontraron assets</AlertTitle>
              </Alert>
            )
        } else { return(
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Type</TableCell>
                            <TableCell align="right">Employee ID</TableCell>
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
                                <TableCell align="right">{row.name}</TableCell>
                                <TableCell align="right">{row.type}</TableCell>
                                <TableCell align="right">{row.employee_id}</TableCell>
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
                                        id='paginationButton'
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
                {renderTextField('name','by Name', filterParams.name || '')}
                {renderTextField('type','by Type', filterParams.type || '')}
                {renderTextField('code','by Code', filterParams.code || '')}
                {renderTextField('brand','by Brand', filterParams.brand || '')}
                {renderTextField('description','by Description', filterParams.description || '')}
                {renderTextField('purchase_date','by Purchase Date', filterParams.purchase_date || '', 'date', true)}
                {renderTextField('employee_id','by Employee ID', filterParams.employee_id || '')}
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
                {showFilters? <Button variant='contained' onClick={() => setLoading(true)}>Apply filters</Button> : ''}
                {showFilters? <Button variant='contained' color='secondary' onClick={handleResetFilter}>Reset</Button> : ''}
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
                    {`Esta seguro de eliminar el asset ${idToDelete}?`}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        De aceptar la informacion del asset se borrara definitivamente
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
                <div>
                    {renderFilterButtons()}
                </div>
                <div>
                    {showFilters? renderFilterOptions() : ''}
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