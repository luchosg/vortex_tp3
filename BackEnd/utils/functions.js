const updateBodyToSQL = (tableName, reqBody, eid) => {
    const keysArray = Object.keys(reqBody);
    const valuesArray = Object.values(reqBody);
    const length = keysArray.length;
    let sql = `UPDATE ${tableName} t SET `
    for(let i = 0; i<length; i++){
        if(typeof valuesArray[i] === 'string'){
            if(i === length-1){
                sql += `${keysArray[i]} = "${valuesArray[i]}" `
            } else {
                sql += `${keysArray[i]} = "${valuesArray[i]}", `
            }
        } else {
            if(i === length-1){
                sql += `${keysArray[i]} = ${valuesArray[i]} `
            } else {
                sql += `${keysArray[i]} = ${valuesArray[i]}, `
            }
        }
    }
    sql += `WHERE t.id = ${eid}`;
    return sql;
}

const createBodyToSQL = (tableName, reqBody) => {
    const keysArray = Object.keys(reqBody);
    const valuesArray = Object.values(reqBody);
    const fields = keysArray.join(", ");
    const values = valuesArray.map(value => {
        if(typeof value === 'string') return `'${value}'`;
        else return `${value}`
        }).join(", ");
    return `INSERT INTO ${tableName} (${fields}) VALUES (${values})`;
  }

const filterAndPagination = (baseSQL, filterParams, limit = 5, page = 1, total) => {
    let newSQL = baseSQL;
    const keysArray = Object.keys(filterParams);
    const valuesArray = Object.values(filterParams);
    const length = keysArray.length;

    const offset = (page-1)*limit;
    const totalPages = Math.ceil(total / limit);
    const prevPage = page > 1 ? Number(page) - 1 : null;
    const nextPage = page < totalPages ? Number(page) + 1 : null;

    if(length === 0) return {
        sql: baseSQL + ` LIMIT ${limit} OFFSET ${offset}`,
        totalPages,
        prevPage,
        nextPage
    }
    else {
        for(let i = 0; i<length; i++){
            if(i === 0) {
                newSQL += ` WHERE ${keysArray[i]} LIKE "%${valuesArray[i]}%"`
            } else {
                newSQL += ` AND ${keysArray[i]} LIKE "%${valuesArray[i]}%"`
            }
        }
    }
    newSQL += ` LIMIT ${limit} OFFSET ${offset}`;
    return {
        sql: newSQL,
        totalPages,
        prevPage,
        nextPage
    };
}

const filterCount = (baseSQL, filterParams) => {
    let newSQL = baseSQL;
    const keysArray = Object.keys(filterParams);
    const valuesArray = Object.values(filterParams);
    const length = keysArray.length;

    if(length === 0) return baseSQL
    else {
        for(let i = 0; i<length; i++){
            if(i === 0) {
                newSQL += ` WHERE ${keysArray[i]} LIKE "%${valuesArray[i]}%"`
            } else {
                newSQL += ` AND ${keysArray[i]} LIKE "%${valuesArray[i]}%"`
            }
        }
    }
    return newSQL
}

module.exports = {
    updateBodyToSQL,
    createBodyToSQL,
    filterAndPagination,
    filterCount
}

