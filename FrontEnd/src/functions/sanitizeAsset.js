const sanitizeAsset = asset => {
    const {code, brand, description, employee_id} = asset;
    if(code === '') asset.code = null;
    if(brand === '') asset.brand = null ;
    if(description === '') asset.description = null;
    if(employee_id === '') asset.employee_id = null;
    return asset;
}

export default sanitizeAsset;