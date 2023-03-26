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

const filterAndPagination = (baseSQL, filterParams, limit = 10, page = 1) => {
    let newSQL = baseSQL;
    const keysArray = Object.keys(filterParams);
    const valuesArray = Object.values(filterParams);
    const length = keysArray.length;
    const offset = (page-1)*limit;
    if(length === 0) return baseSQL + ` LIMIT ${limit} OFFSET ${offset}`;
    else {
        for(let i = 0; i<length; i++){
            if(i === 0) {
                newSQL += ` WHERE ${keysArray[i]} LIKE "${valuesArray[i]}"`
            } else {
                newSQL += ` AND ${keysArray[i]} LIKE "${valuesArray[i]}"`
            }
        }
    }
    newSQL += ` LIMIT ${limit} OFFSET ${offset}`;
    return newSQL;
}

module.exports = {
    updateBodyToSQL,
    createBodyToSQL,
    filterAndPagination
}

