const employeeModel = require('../models/employee-model');
const assetModel = require('../models/asset-model');
const HttpError = require('../customErrors/HttpError');

const getAllEmployees = async (req, res, next) => {
    try{    
        const queryParams = req.query;
        const {total} = await employeeModel.getTotalEmployeesCount(queryParams);
        if(total === 0){
            next(new HttpError(`Could not find employees`, 404));
        }
        const {employees, totalPages, prevPage, nextPage} = await employeeModel.getAllEmployees(queryParams, total);
        if(employees.length === 0){
            next(new HttpError(`Could not find employees`, 404));
        } else {
            res.status(200).json({
                data : employees,
                totalPages,
                prevPage,
                nextPage
            })
        };
    } catch({message}){
        next(new HttpError(message, 500))
    }
}

const getEmployeeById = async (req, res, next) => {
    try{
        const eid = req.params.eid;
        const employee = await employeeModel.getEmployeeById(eid);
        if(employee.length === 0){
            next(new HttpError(`Employee with id ${eid} not found`, 404));
        } else {
            res.status(200).json({data: employee[0]});
        }
    } catch ({message}) {
        next(new HttpError(message, 500));
    }
}

const createEmployee = async (req, res, next) => {
    try{
        const reqBody = {...req.body};
        const insertId = await employeeModel.createEmployee(reqBody);
        res.status(201).json({
            message: `Employee created with id ${insertId}`,
            data: {
                id: insertId,
                ...reqBody
            }
        });
    } catch({message}){
        next(new HttpError(message, 500));
    }
}
    

const deleteEmployee = async (req, res, next) => {
    try{
        const eid = req.params.eid;
        const deletedAssets = await assetModel.resetAllAssetsByEmployeeId(eid);
        const affectedRows = await employeeModel.deleteEmployee(eid);
        if(affectedRows === 0){
            next(new HttpError(`Employee with id ${eid} not found`, 404));
        } else {
            res.status(200).json({message: `Employee with id ${eid} and ${deletedAssets} assets reseted succesfully`})
        }        
    } catch({message}) {
        next(new HttpError(message, 500));
    }
}

const updateEmployee = async (req, res, next) => {
    try{
        const reqBody = {...req.body};
        const eid = req.params.eid;
        const affectedRows = await employeeModel.updateEmployee(reqBody, eid);
        if(affectedRows === 0){
            next(new HttpError(`Employee with id ${eid} not found`, 404));
        } else {
            res.status(200).json({message: `Employee with id ${eid} updated`})
        }
    } catch({message}) {
        next(new HttpError(message, 500));
    }
}


module.exports = {
    getAllEmployees,
    getEmployeeById, 
    createEmployee,
    deleteEmployee,
    updateEmployee
}
