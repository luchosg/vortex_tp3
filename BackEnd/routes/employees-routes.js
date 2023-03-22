const express = require('express');
const employeesRouter = express.Router();
const {
    createEmployeeValidationRules, 
    updateEmployeeValidationRules,
    e_paramValidationRules
} = require('../validators/employee-validator');

const {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee
} = require('../controllers/employees-controller');

employeesRouter.route('/')
    .get(getAllEmployees)
    .post(createEmployeeValidationRules, createEmployee)


employeesRouter.route('/:eid')
    .get(e_paramValidationRules, getEmployeeById)
    .put(e_paramValidationRules, updateEmployeeValidationRules, updateEmployee)
    .delete(e_paramValidationRules, deleteEmployee)

module.exports = employeesRouter;