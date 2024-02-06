import React from 'react';

import {Alert, AlertTitle} from '@mui/material';

const CustomAlert = ({type, message}) => {
    return(
        <Alert severity={type}>
                <AlertTitle>{message}</AlertTitle>
        </Alert>
    )
}

export default CustomAlert