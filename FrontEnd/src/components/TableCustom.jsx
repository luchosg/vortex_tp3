import React from 'react';

import OptionsButtons from './OptionsButtons';
import PaginationCustom from './PaginationCustom';

import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';

// headers=['ID', 'First Name', 'Last Name', 'CUIT']
// fields=['id', 'first_name', 'last_name', 'cuit']

const TableCustom = ({rows, headers, fields, showCallBack, deleteCallBack}) => {
    const renderHead = () => {
        return(
            <TableHead>
                <TableRow>
                    {headers.map(header => <TableCell align='right'>{header}</TableCell>)}
                    <TableCell align="right">Options</TableCell>
                </TableRow>
            </TableHead>
        )
    }

    const renderBody = () => {
        return (
            <TableBody>
                {rows.map((row) => (
                    <TableRow
                    key={row[fields[0]]}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        {fields.map(field => <TableCell align='right' key={field}>{row[field]}</TableCell>)}
                        <TableCell align="right">
                            <OptionsButtons 
                                id={row[fields[0]]}
                                showCallBack={showCallBack}
                                deleteCallBack={deleteCallBack}
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        )
    }
    
    return(
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                {renderHead()}
                {renderBody()}
                <PaginationCustom />
            </Table>
        </TableContainer>
    )
}

export default TableCustom;

