import React, {useState} from 'react';
import { useSelector } from 'react-redux';

import PaginationButtons from './PaginationButtons';

import {TableFooter, TableRow, TableCell, TextField, Button} from '@mui/material'

const PaginationCustom = () => {
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState(5);

    const totalPages = useSelector(state => state.rrhh.totalPages);

    const handleBackButtonClick = () => {
        setPage(page => page-1);
        // setFilterParams({...filterParams, page: page-1});
        // setLoading(true);
    }

    const handleNextButtonClick = () => {
        setPage(page => page+1);
        // setFilterParams({...filterParams, page: page+1});
        // setLoading(true);
    }

    const handleNewPagination = () => {
        if(Number(pagination) !== 0){
            // setFilterParams({...filterParams, limit: pagination});
            // setLoading(true);
        }
    }

    return (
        <TableFooter>
            <TableRow>
                <TableCell>{`Page: ${page}, Total pages: ${totalPages}`}</TableCell>
                <TableCell>
                    <PaginationButtons 
                        page={page} 
                        totalPages={totalPages}
                        backCallBack={handleBackButtonClick}
                        nextCallBack={handleNextButtonClick}
                    />
                </TableCell>
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
    )
}

export default PaginationCustom;