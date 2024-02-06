import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteEmployee, fetchEmployees, startEmployeesLoading, resetMessage, resetError, resetFilter } from '../actions/employeesActions';
import sanitizeFilter from '../functions/sanitizeFilter';

import ListCustom from '../components/ListCustom';
import AlertCustom from '../components/AlertCustom';

import {Container, Button, Stack, Fab, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import FilterCustom from '../components/FilterCustom';
import ModalCustom from '../components/ModalCustom';


const EmployeeList = () => {
    //------------------------ HOOKS --------------------------------

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [openDialog, setOpenDialog] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);

    const isLoading = useSelector(state => state.rrhh.isLoading);
    const fetched_employees = useSelector(state => state.rrhh.fetched_employees);
    const apiMessage = useSelector(state => state.rrhh.apiMessage);
    const apiError = useSelector(state => state.rrhh.apiError);

    const [filterParams, setFilterParams] = useState({});

    useEffect(()=>{
        if(isLoading){
            dispatch(fetchEmployees(sanitizeFilter(filterParams)));
        }
    }, [dispatch, fetched_employees, isLoading, apiMessage, apiError]) //page])

    //------------------------ HANDLERS ------------------------------

    const handleDelete = id => {
        setOpenDialog(true);
        setIdToDelete(id);
    }

    const handleAcceptDelete = ()=> {
        setOpenDialog(false);
        dispatch(deleteEmployee(Number(idToDelete)));
        setIdToDelete(null);
        setTimeout(()=>{
            dispatch(resetMessage());
        }, 2000)
    }

    const handleCancelDelete = () => {
        setOpenDialog(false);
    }

    const handleShowInfo = id => {
        setFilterParams({});
        navigate(`/employees/${id}`)
    }
    //------------------------ TABLA/PAGINACION -----------------------

    const tableData = {
        id: 'ID',
        first_name: 'First Name',
        last_name: 'Last Name',
        cuit: 'CUIT'
    }

    //------------------------------ RENDERS ---------------------------------------------


    const renderInit = () => {
        return (
            <div>
                Loading...
            </div>
        )
    }

    return (
        <Container >
            <Stack direction='column' spacing={2} mt='100px' display='flex' justifyContent='center' alignItems='center'>
                <div>
                    <h1>Lista de empleados</h1>
                </div>
                <FilterCustom filterParams={filterParams} filterCallBack={setFilterParams}/>
                {fetched_employees ? 
                    <ListCustom 
                        name='employees'
                        list={fetched_employees}
                        tableData={tableData}
                        showCallBack={handleShowInfo}
                        deleteCallBack={handleDelete}
                    /> :
                    renderInit()
                }
                <Fab color="primary" aria-label="add">
                    <AddIcon onClick={() => navigate(`/new`)} />
                </Fab>
                <div>
                    {apiMessage ? <AlertCustom type='success' message={apiMessage}/> : null}
                    {apiError ? <AlertCustom type='error' message={apiError} /> : null}
                </div>
                <ModalCustom
                    open={openDialog} 
                    title={`Esta seguro de eliminar al empleado ${idToDelete}?`}
                    content='De aceptar la informacion del empleado se borrara definitivamente'
                    acceptCallBack={handleAcceptDelete}
                    cancelCallBack={handleCancelDelete}
                    id={idToDelete}
                />
            </Stack>
        </Container>
    )    
}

export default EmployeeList;