const assetModel = require('../models/asset-model');
const employeeModel = require('../models/employee-model');
const HttpError = require('../customErrors/HttpError');

const getAllAssets = async (req, res, next) => {
    try{
        const queryParams = req.query;
        const {total} = await assetModel.getTotalAssetsCount(queryParams);
        if(total === 0){
            next(new HttpError(`Could not find assets`, 404));
        }
        const {assets, totalPages, prevPage, nextPage} = await assetModel.getAllAssets(queryParams, total);
        if(assets.length === 0){
            next(new HttpError(`Could not find assets`, 404));
        } else {
            res.status(200).json({
                data: assets,
                totalPages,
                prevPage,
                nextPage
            });
        }
    } catch({message}){
        next(new HttpError(message, 500));
    }
}

const getAssetById = async (req, res, next) => {
    try{
        const aid = req.params.aid;
        const asset = await assetModel.getAssetById(aid);
        if(asset.length === 0){
            next(new HttpError(`Asset with id ${aid} not found`, 404));
        } else {
            res.status(200).json({data: asset[0]});
        }
    } catch({message}){
        next(new HttpError(message, 500))
    }
}

const deleteAsset = async (req, res, next) => {
    try{
        const aid = req.params.aid;
        const affectedRows = await assetModel.deleteAsset(aid);
        if(affectedRows === 0){
            next(new HttpError(`Asset with id ${aid} not found`, 404));
        } else {
            res.status(200).json({message: `Asset with id ${aid} deleted succesfully`});
        }
    } catch({message}){
        next(new HttpError(message, 500))
    }
}

const createAsset = async (req, res, next) => {
    try{
        const eid = req.body.employee_id;
        console.log(eid);
        if(eid){
            const employee = await employeeModel.getEmployeeById(eid);
            if(employee.length === 0){
                next(new HttpError(`Could not find employee with id ${eid}`, 404))
            } else {
                const reqBody = {...req.body};
                const insertId = await assetModel.createAsset(reqBody);
                res.status(201).json({message: `Asset created with id ${insertId}`});
            }
        } else {
            const reqBody = {...req.body};
            const insertId = await assetModel.createAsset(reqBody);
            res.status(201).json({message: `Asset created with id ${insertId}`});
        }
    } catch({message}){
        next(new HttpError(message, 500));
    }
}

const updateAsset = async (req, res, next) => {
    try{
        const reqBody = {...req.body};
        const aid = req.params.aid;
        const {employee_id} = await assetModel.getAssetById(aid);

        if(employee_id || reqBody.employee_id){
            const employee = await employeeModel.getEmployeeById(reqBody.employee_id)
            if(employee.length === 0){
                next(new HttpError(`Employee with id ${reqBody.employee_id} not found`, 404));
            }
        }
        const affectedRows = await assetModel.updateAsset(reqBody, aid);
        if(affectedRows === 0){
            next(new HttpError(`Asset with id ${aid} not found`, 404));
        } else {
            res.status(200).json({message: `Asset with id ${aid} updated`});
        }
    } catch({message}){
        next(new HttpError(message, 500));
    }
}

const getAssetsByEmployeeId = async (req, res, next) => {
    try{
        const eid = req.params.eid;
        const assets = await assetModel.getAssetsByEmployeeId(eid);
        if(assets.length === 0){
            next(new HttpError(`Could not find assets with employee_id ${eid}`, 404));
        } else {
            res.status(200).json({data : assets})
        }
    } catch({message}){
        next(new HttpError(message, 500));
    }
}

module.exports = {
    getAllAssets,
    getAssetById,
    deleteAsset,
    createAsset, 
    updateAsset,
    getAssetsByEmployeeId
}