const express = require('express');
const validate = require('express-validation');
const empController = require('../controller/employees');
const { authorize } = require("../middleware/authentication");
const {
  idParamsSchema,
  postEmployeeBodySchema,
  editEmployeeBodySchema,
  postEmployeeDepartmentBodySchema,
  postEmployeeRolesBodySchema,
  postEmployeeAddressBodySchema,
} = require('../validation/joiRequestValidation');

const router = express.Router();

// GET => /employees
router.get('/', authorize, empController.getAllEmployees);

// GET => /employees/id
router.get('/:id', validate(idParamsSchema), authorize, empController.getEmployee);

// POST => /employees
router.post('/', validate(postEmployeeBodySchema), authorize, empController.postEmployee);

// PUT => /employees/id
router.put('/:id', validate(editEmployeeBodySchema), authorize, empController.editEmployee);

// DELETE => /employees/id
router.delete('/:id', authorize, empController.deleteEmployee);

// GET => /employees/id/departments
router.get('/:id/departments', authorize, empController.getEmployeeDepartments);

// POST => /employees/id/departments
router.post('/:id/departments', validate(postEmployeeDepartmentBodySchema), authorize, empController.postEmployeeDepartment);

// GET => /employees/id/roles
router.get('/:id/roles', authorize, empController.getEmployeeRoles);

// POST => /employees/id/roles
router.post('/:id/roles', validate(postEmployeeRolesBodySchema), authorize, empController.postEmployeeRoles);

// GET  => /employees/id/address
router.get('/:id/address', authorize, empController.getEmployeeAddress);

// POST => /employees/id/address
router.post('/:id/address', validate(postEmployeeAddressBodySchema), authorize, empController.postEmployeeAddress);

module.exports = router;