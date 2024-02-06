import React from 'react';

import {Stack, IconButton} from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

const PaginationButtons = ({page, totalPages, backCallBack, nextCallBack}) => {
    return (
        <Stack direction="row" spacing={2} display='flex' justifyContent='center' alignItems='center'>
            <IconButton
                onClick={backCallBack}
                disabled={page === 1}
                aria-label="previous page"
            >
                <KeyboardArrowLeft />
            </IconButton>
            <IconButton
                onClick={nextCallBack}
                disabled={page === totalPages}
                aria-label="next page"
            >
                <KeyboardArrowRight />
            </IconButton>
        </Stack>
    )
}

export default PaginationButtons