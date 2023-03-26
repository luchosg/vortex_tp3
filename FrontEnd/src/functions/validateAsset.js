const validateAsset = ({name, type, code, brand, description, purchase_date, employee_id}) => {
    const errors =  [];
    if(name.length < 2) {errors.push('name')}
    if(type.length < 2) {errors.push('type')}
    if(code && code.length<2) {errors.push('code')}
    if(brand && brand.length<2) {errors.push('brand')}
    if(description && description.length<2) {errors.push('description')}
    if(purchase_date.length !== 10) {errors.push('purchase_date')}
    if(employee_id && (employee_id.length > 5 || employee_id.length === 0)) {errors.push('employee_id')}

    return errors;
}

export default validateAsset;
