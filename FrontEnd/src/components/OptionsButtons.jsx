import React from 'react';

import {Stack, Button} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';

const OptionsButtons = ({id, showCallBack, deleteCallBack}) => {
    return(
        <Stack direction="row" spacing={2} display='flex' justifyContent='center' alignItems='center'>
            <Button 
                id={id} 
                onClick={() => showCallBack(id)} 
                variant="contained"
                startIcon={<VisibilityIcon />}
            >More Info
            </Button>
            <Button 
                id={id} 
                onClick={() => deleteCallBack(id)} 
                variant="contained"
                startIcon={<DeleteIcon />}
            >Delete
            </Button>
        </Stack>
    )
}

export default OptionsButtons