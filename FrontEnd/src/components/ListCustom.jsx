import React from 'react';

import AlertCustom from './AlertCustom';
import TableCustom from './TableCustom';

// const tableData = {
//     id: 'ID',
//     first_name: 'First Name',
//     last_name: 'Last Name',
//     cuit: 'CUIT'
// }

// const createData = (id, first_name, last_name, cuit) => {
//     return { id, first_name, last_name, cuit };
// }

// const createData = ['id', 'first_name', 'last_name', 'cuit']


const ListCustom = ({name, list, tableData, showCallBack, deleteCallBack}) => {
    const rows = [];
    const fields = Object.keys(tableData);
    const headers = Object.values(tableData);

    const createData = (data, fields) => {
        const shortData = {...data};
        Object.keys(shortData).forEach(key => {
            if(!fields.includes(key)) delete shortData[key]
        })
    
        return shortData;
    }

    if(list){
        list.map(e => rows.push(createData(e, fields)))
    }

    return(
        <div id='CustomList'>
            {rows.length === 0? 
                <AlertCustom type='warning' message={`Could not find ${name}`}/> : 
                <TableCustom 
                    rows={rows} 
                    headers={headers} 
                    fields={fields}
                    showCallBack={showCallBack}
                    deleteCallBack={deleteCallBack}
                />
            }
        </div>
    )
}

export default ListCustom;