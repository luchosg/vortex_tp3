const express = require('express');
const assetsRouter = express.Router();
const {createAssetValidationRules, updateAssetValidationRules, a_paramValidationRules} = require('../validators/asset-validator');
const {e_paramValidationRules} = require('../validators/employee-validator');

const {
    getAllAssets,
    getAssetsByEmployeeId,
    getAssetById,
    createAsset,
    deleteAsset,
    updateAsset
} = require('../controllers/assets-controller');

assetsRouter.route('/')
    .get(getAllAssets)
    .post(createAssetValidationRules, createAsset)

assetsRouter.route('/:aid')
    .get(a_paramValidationRules, getAssetById)
    .delete(a_paramValidationRules, deleteAsset)
    .put(a_paramValidationRules, updateAssetValidationRules, updateAsset)

assetsRouter.route('/employee/:eid')
    .get(e_paramValidationRules, getAssetsByEmployeeId)

module.exports = assetsRouter;