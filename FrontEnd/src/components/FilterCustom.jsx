import React, {useState} from 'react';

import {Stack, Button, TextField} from '@mui/material';

const FilterCustom = ({filterParams, filterCallBack}) => {
    const [showFilters, setShowFilters] = useState(false);

    const handleResetFilter = () => {
        filterCallBack({});
        // setLoading(true);
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
                {/* {showFilters? <Button variant='contained' onClick={() => setLoading(true)}>Apply filters</Button> : null} */}
                {showFilters? <Button variant='contained' color='secondary' onClick={handleResetFilter}>Reset</Button> : null}
            </Stack>   
        )
    }

    const renderTextField = (id, label, value, type, shrink) => {
        return(
            <TextField 
                id={id} 
                label={label}
                onChange={event => filterCallBack({...filterParams, [event.target.id]: event.target.value })}
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


    return (
        <Stack direction='column' spacing={2} mt='100px' display='flex' justifyContent='center' alignItems='center'>
            <div>
                {renderFilterButtons()}
            </div>
            <div>
                {showFilters? renderFilterOptions() : null}
            </div>
        </Stack>
        
    ) 
}

export default FilterCustom;