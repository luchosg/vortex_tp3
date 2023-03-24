const validateForm = ({first_name, last_name, cuit, team_id, join_date, rol}) => {
    const errors =  [];
    if(first_name.length < 2) {errors.push('first_name')}
    if(last_name.length < 2) {errors.push('last_name')}
    if(cuit.length !== 13) {errors.push('cuit')}
    if(join_date.length !== 10) {errors.push('join_date')}
    if(rol.length <2) {errors.push('rol')}
    if(team_id.length > 5 || team_id.length === 0) {errors.push('team_id')}

    return errors;
}

export default validateForm;
