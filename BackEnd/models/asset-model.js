const connection = require('../config/db-config');
const {filterAndPagination, createBodyToSQL, updateBodyToSQL} = require('../utils/functions');

const getAllAssets = async queryParams => {
    const {limit, page, ...filterParams} = queryParams;
    const sql = filterAndPagination(`SELECT * FROM assets`, filterParams, limit, page);
    const assets = await connection.query(sql).spread(rows => rows);
    return assets;
}

const getAssetById = async aid => {
    const sql = `SELECT * FROM assets a WHERE a.id = ${aid}`;
    const asset = await connection.query(sql).spread(row => row);
    return asset;
}

const getAssetsByEmployeeId = async eid => {
    let sql = `SELECT a.id, a.name, a.type, a.code, a.brand, a.description, a.purchase_date `;
    sql += `FROM assets a JOIN employees e ON a.employee_id = e.id WHERE a.employee_id= ${eid}`;
    const assets = await connection.query(sql).spread(rows => rows);
    return assets;
}

const deleteAsset = async aid => {
    const sql = `DELETE FROM assets WHERE id = ${aid}`;
    const result = await connection.query(sql).spread(result => result);
    return result.affectedRows;
}

const resetAllAssetsByEmployeeId = async eid => {
    const sql = `UPDATE assets a SET employee_id = null WHERE employee_id = ${eid}`;
    const result = await connection.query(sql).spread(result => result);
    return result.affectedRows;
}

const createAsset = async reqBody => {
    const sql = createBodyToSQL('assets', reqBody)
    const result = await connection.query(sql).spread(result => result);
    return result.insertId;
}

const updateAsset = async (reqBody, aid) => {
    const sql = updateBodyToSQL("assets", reqBody, aid);
    const result = await connection.query(sql).spread(result => result);
    return result.affectedRows;
}

module.exports = {
    getAllAssets,
    getAssetById,
    deleteAsset,
    createAsset,
    updateAsset,
    getAssetsByEmployeeId,
    resetAllAssetsByEmployeeId
}