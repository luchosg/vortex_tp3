const connection = require('../config/db-config');
const {filterAndPagination, createBodyToSQL, updateBodyToSQL, filterCount} = require('../utils/functions');

const getAllEmployees = async (queryParams, total) => {
    const {limit, page, ...filterParams} = queryParams;
    const {sql, totalPages, prevPage, nextPage} = filterAndPagination(`SELECT * FROM employees`, filterParams, limit, page, total);
    const employees = await connection.query(sql).spread(rows => rows);
    return {
        employees,
        totalPages,
        prevPage,
        nextPage
    };
}

const getTotalEmployeesCount = async queryParams => {
    const {limit, page, ...filterParams} = queryParams;
    const sql = filterCount('SELECT COUNT(*) as total FROM employees', filterParams);
    const total = await connection.query(sql).spread(row => row);
    return total[0];
}

const getEmployeeById = async eid => {
    const sql = `SELECT * FROM employees e WHERE e.id = ${eid}`;
    const employee = await connection.query(sql).spread(row => row);
    return employee;
}

const createEmployee = async reqBody => {
    const sql = createBodyToSQL("employees", reqBody);
    const result = await connection.query(sql).spread(result => result);
    return result.insertId;
}

const deleteEmployee = async eid => {
    const sql = `DELETE FROM employees WHERE id = ${eid}`;
    const result = await connection.query(sql).spread(result => result);
    return result.affectedRows;
}

const updateEmployee = async (reqBody, eid) => {
    const sql = updateBodyToSQL("employees", reqBody, eid);
    console.log(sql);
    const result = await connection.query(sql).spread(result => result);
    console.log(result);
    return result.affectedRows;
}

module.exports = {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    deleteEmployee,
    updateEmployee,
    getTotalEmployeesCount
}