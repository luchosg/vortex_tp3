import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import {FormGroup, Container, Alert, AlertTitle, TextField, Button, Stack} from '@mui/material';

import { editEmployee, fetchEmployee } from '../actions';
import { createEmployee, resetMessage } from '../actions/employeesActions';
import validateEmployee from '../functions/validateEmployee';

const EmployeesForm = () => {
    //-------------------------------- HOOKS ------------------------------------------------------

    const {id} = useParams();
    const [alert, setAlert] = useState('');
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {pathname} = useLocation();
    const newMode = pathname.includes('new');

    const [editMode, setEditMode] = useState(newMode);
    const fetched_employee = useSelector(state => state.rrhh.fetched_employee);

    const formVacio = {
        first_name: '',
        last_name: '',
        cuit: '',
        team_id: '',
        join_date: '',
        rol: ''
    }

    const [employee, setEmployee] = useState(newMode ? formVacio : fetched_employee);

    const [isLoading, setLoading] = useState(true);
    const [errors, setErrors] = useState([]);

    useEffect(()=>{
        if(isLoading && !newMode){
            dispatch(fetchEmployee(id));
        }
        if(fetched_employee && !newMode){
            setEmployee(fetched_employee);
        }
        setLoading(false);
    }, [dispatch, id, fetched_employee, isLoading, newMode]);
    
    // ----------------------------- HANDLERS ------------------------------------------------------

    const handleCreate = () => {
        if(validateEmployee(employee).length === 0){
            dispatch(createEmployee(employee));
            setEmployee(formVacio);
            setAlert('success');
            setTimeout(()=>{
                setAlert('');
                dispatch(resetMessage())
                navigate('/');
            },1000);
        } else {
            setErrors(validateEmployee(employee))
            setAlert('validateError');
            setTimeout(()=>{
                setAlert('');
            },1500);
        }
    }

    const handleCancel = () => {
        setEditMode(!editMode);
        setEmployee(fetched_employee);
    }

    const handleUpdate = () => {
        if(validateEmployee(employee).length === 0){
            setEditMode(!editMode);
            dispatch(editEmployee(employee));
            setAlert('success');
            setTimeout(()=>{
                setAlert('');
                navigate('/');
            },1000);
        } else {
            setAlert('validateError');
            setErrors(validateEmployee(employee));
            setTimeout(()=>{
                setAlert('');
            },1000);
        }
    }

    //------------------------------------- RENDERS ---------------------------------------------------

    const renderAlert = () => {
        switch (alert) {
            case 'success':
                return(
                    <Alert severity="success">
                        <AlertTitle>{newMode ? 'Carga Exitosa' : 'Actualizacion Exitosa' }</AlertTitle>
                        {newMode ? 'Empleado cargado correctamente' : 'Empleado actualizado correctamente'}
                    </Alert>
                )
            case 'validateError':
                return(
                    <Alert severity="error">
                        <AlertTitle>Error de carga</AlertTitle>
                        <strong>Complete correctamente todos los campos obligatorios</strong>
                    </Alert>
                )
            default:
                return;       
        } 
    }

    const renderTextField = (required, disabled, id, label, value, type, shrink) => {
        return(
            <TextField 
                required={required}
                disabled={disabled} 
                id={id} 
                label={label}
                onChange={event => setEmployee({...employee, [event.target.id]: event.target.value })}
                value={value}
                InputProps={{
                    readOnly: !editMode,
                  }}
                type={type}
                InputLabelProps={{
                    shrink: shrink,
                }}
                error={errors.includes(id)}
            />
        )
    }

    const renderButtons = () => {
        return(
            <Stack direction='row' spacing={2} display='flex' justifyContent='center' alignItems='center'>
                    <Button 
                        variant='contained' 
                        color='secondary' 
                        onClick={newMode ? handleCreate : (editMode ? handleUpdate : () => setEditMode(!editMode))}> 
                        {newMode ? 'Agregar' : (editMode ? 'Actualizar' : 'Editar')}
                    </Button>
                    {!editMode ? <div></div> : 
                        <Button variant='contained' onClick={newMode ? () => setEmployee(formVacio) : handleCancel}>
                            {newMode ? 'Limpiar' : 'Cancelar' }
                        </Button> }
            </Stack>
        )
    }

    const renderTitle = () => {
        return (
            <h1>
                {newMode ? 
                    'Agrega un nuevo empleado' :
                    (editMode ? `Actualiza la informacion del empleado ${id}` : `Informacion del empleado ${id}`) }
            </h1>
        )
    }

    const renderForm = () => {
        if(!newMode && !fetched_employee){
            return(
                <Alert severity="warning">
                        <AlertTitle>El empleado no existe</AlertTitle>
                </Alert>
            )
        }
        if(!employee){
            return(
                <div>Loading...</div>
            )
        }
        return(
            <FormGroup
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '30ch' }
            }}>
                <Stack direction='row' spacing={2}>
                    {renderTextField(true, false, 'first_name','First Name', employee.first_name)}
                    {renderTextField(true, false, 'last_name','Last Name', employee.last_name)}
                </Stack> 
                <Stack direction='row' spacing={2}>
                    {renderTextField(true, false, 'cuit','CUIT', employee.cuit)}
                    {renderTextField(true, false, 'team_id','Team ID', employee.team_id)}
                </Stack>
                <Stack direction='row' spacing={2}>
                    {renderTextField(true, false, 'join_date', 'Join Date', employee.join_date, 'date', true)}
                    {renderTextField(false, false,'rol', 'Rol', employee.rol)}
                </Stack>
                {renderButtons()}
            </FormGroup>
        )
    }

    return (
        <Container sx={{
            mt: 10, 
            bgcolor: '#F2FAFD', 
            height: 450, 
            width: 650,
            boxShadow: 2,
            border: 2,
            borderColor: 'primary.light',
            '& .MuiDataGrid-cell:hover': {
            color: 'primary.main',},
            }}>
            <Stack direction='column' spacing={4} display='flex' justifyContent='center' alignItems='center'>
                <div className='title'>
                    {renderTitle()}
                </div>
                <div>
                    {renderForm()}
                </div>
                <div className='alert'>
                    {renderAlert()} 
                </div>
            </Stack>
       </Container>
    )
}

export default EmployeesForm;