const joi = require('joi');

const idParamsSchema = {
    params: joi.object({
        id: joi.number().required()
    }).unknown(false)
}

//Employee Validation
const postEmployeeBodySchema = {
    body: joi.object().keys({
        name: joi.string().max(128).required(),
        age: joi.number().max(120).required()
    }).unknown(false)
}

const editEmployeeBodySchema = {
    body: joi.object().keys({
        name: joi.string().max(128).required(),
        age: joi.number().max(120).required(),
        isActive: joi.boolean().required()
    }).unknown(false)
}

//Department Validation
const postDepartmentBodySchema = {
    body: joi.object().keys({
        name: joi.string().max(128).required()
    }).unknown(false)
}

const editDepartmentBodySchema = {
    body: joi.object().keys({
        name: joi.string().max(128).required()
    }).unknown(false)
}

const postEmployeeDepartmentBodySchema = {
    body: joi.object().keys({
        deptId: joi.number().required()
    }).unknown(false)
}

//Roles Validation
const postRolesBodySchema = {
    body: joi.object().keys({
        name: joi.string().max(128).required()
    }).unknown(false)
}

const editRolesBodySchema = {
    body: joi.object().keys({
        name: joi.string().max(128).required()
    }).unknown(false)
}

const postEmployeeRolesBodySchema = {
    body: joi.object().keys({
        roleId: joi.number().required()
    }).unknown(false)
}

//Address Validation
const postEmployeeAddressBodySchema = {
    body: joi.object().keys({
        empId: joi.number().required(),
        house_name: joi.string().max(128).required(),
        street_name: joi.string().max(128).required(),
        district: joi.string().max(128).required(),
        pin: joi.number().required(),
    }).unknown(false)
}


module.exports = {
    idParamsSchema,
    postEmployeeBodySchema,
    editEmployeeBodySchema,
    postDepartmentBodySchema,
    editDepartmentBodySchema,
    postEmployeeDepartmentBodySchema,
    postRolesBodySchema,
    editRolesBodySchema,
    postEmployeeRolesBodySchema,
    postEmployeeAddressBodySchema,
};