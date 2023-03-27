import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import {FormGroup, Container, Alert, AlertTitle, TextField, Button, Stack} from '@mui/material';

import { createAsset, editAsset, fetchAsset } from '../actions';
import validateAsset from '../functions/validateAsset';
import sanitizeAsset from '../functions/sanitizeAsset';

const AssetsForm = () => {
    //-------------------------------- HOOKS ------------------------------------------------------

    const {id} = useParams();
    const [alert, setAlert] = useState('');
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {pathname} = useLocation();
    const newMode = pathname.includes('new');

    const [editMode, setEditMode] = useState(newMode);
    const fetched_asset = useSelector(state => state.resources.fetched_asset);

    const formVacio = {
        name: '',
        type: '',
        purchase_date: '',
        employee_id: ''
    }

    const [asset, setAsset] = useState(newMode ? formVacio : fetched_asset);

    const [isLoading, setLoading] = useState(true);
    const [errors, setErrors] = useState([]);

    useEffect(()=>{
        if(newMode){
            setEditMode(true);
            setAsset(formVacio);
        };
        if(isLoading && !newMode){
            dispatch(fetchAsset(id));
        }
        if(fetched_asset && !newMode){
            setAsset(fetched_asset);
        }
        setLoading(false);
    }, [dispatch, id, fetched_asset, isLoading, newMode]);
    
    // ----------------------------- HANDLERS ------------------------------------------------------

    const handleCreate = () => {
        if(validateAsset(asset).length === 0){
            dispatch(createAsset(asset));
            setAsset(formVacio);
            setAlert('success');
            setTimeout(()=>{
                setAlert('');
                navigate('/assets');
            },1000);
        } else {
            setErrors(validateAsset(asset))
            setAlert('validateError');
            setTimeout(()=>{
                setAlert('');
            },1500);
        }
    }

    const handleCancel = () => {
        setEditMode(false);
        setAsset(fetched_asset);
    }

    const handleUpdate = () => {
        if(validateAsset(asset).length === 0){
            setEditMode(false);
            dispatch(editAsset(sanitizeAsset(asset)));
            setAlert('success');
            setTimeout(()=>{
                setAlert('');
                navigate('/assets');
            },1000);
        } else {
            setAlert('validateError');
            setErrors(validateAsset(asset));
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
                        {newMode ? 'Activo cargado correctamente' : 'Activo actualizado correctamente'}
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
                onChange={event => setAsset({...asset, [event.target.id]: event.target.value })}
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
                        onClick={newMode ? handleCreate : (editMode ? handleUpdate : () => setEditMode(true))}> 
                        {newMode ? 'Agregar' : (editMode ? 'Actualizar' : 'Editar')}
                    </Button>
                    {!editMode ? <div></div> : 
                        <Button variant='contained' onClick={newMode ? () => setAsset(formVacio) : handleCancel}>
                            {newMode ? 'Limpiar' : 'Cancelar' }
                        </Button> }
            </Stack>
        )
    }

    const renderTitle = () => {
        return (
            <h1>
                {newMode ? 
                    'Agrega un nuevo activo' :
                    (editMode ? `Actualiza la informacion del activo ${id}` : `Informacion del activo ${id}`) }
            </h1>
        )
    }

    const renderForm = () => {
        if(!newMode && !fetched_asset){
            return(
                <Alert severity="warning">
                        <AlertTitle>El asset no existe</AlertTitle>
                </Alert>
            )
        }
        if(!asset){
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
                    {renderTextField(true, false, 'name','Name', asset.name)}
                    {renderTextField(true, false, 'type','Type', asset.type)}
                </Stack> 
                <Stack direction='row' spacing={2}>
                    {renderTextField(false, false, 'code','Code', asset.code || '')}
                    {renderTextField(false, false, 'brand','Brand', asset.brand || '')}
                </Stack>
                <Stack direction='row' spacing={2}>
                    {renderTextField(false, false, 'description','Description', asset.description || '')}
                    {renderTextField(true, false, 'purchase_date', 'Purchase Date', asset.purchase_date, 'date', true)}
                </Stack>
                <Stack direction='row' spacing={2}>
                    {renderTextField(newMode? true: false, false,'employee_id', 'Employee ID', asset.employee_id || '')}
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

export default AssetsForm;