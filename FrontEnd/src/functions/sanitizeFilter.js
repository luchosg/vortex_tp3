const sanitizeFilter = filterParams => {
    const keys = Object.keys(filterParams);
    const values = Object.values(filterParams);
    for(let i = 0; i<values.length; i++){
        if(values[i] === '') delete filterParams[keys[i]] 
    }
    return filterParams;
}

export default sanitizeFilter;