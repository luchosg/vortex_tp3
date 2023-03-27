import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteAsset, fetchAssets } from '../actions';
import sanitizeFilter from '../functions/sanitizeFilter';

import {Box, Alert, AlertTitle, Container, Button, Stack, TextField, Fab, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
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
    const [showFilters, setShowFilters] = useState(false);
    const [filterParams, setFilterParams] = useState({});

    useEffect(()=>{
        if(isLoading){
            dispatch(fetchAssets(sanitizeFilter(filterParams)));
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
        dispatch(deleteAsset(Number(idToDelete)));
        // setLoading(true);
        setIdToDelete(null);
    }

    const handleCancelDelete = () => {
        setOpenDialog(false);
    }

    const handleResetFilter = () => {
        setFilterParams({});
        setLoading(true);
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
                <AlertTitle>No se encontraron assets</AlertTitle>
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
            <>  
                <h4>Puede utilizar % para reemplazar el inicio o final de una busqueda</h4>
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
            </>
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