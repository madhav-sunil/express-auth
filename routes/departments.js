const express = require('express');
const validate = require('express-validation');
const depController = require('../controller/departments');
const { authorize } = require("../middleware/authentication");
const {
  postDepartmentBodySchema,
  editDepartmentBodySchema
} = require('../validation/joiRequestValidation');

const router = express.Router();

// GET => /departments
router.get('/', authorize, depController.getAllDepartments);

// GET => /departments/id
router.get('/:id', authorize, depController.getDepartment);

// POST => /departments
router.post('/', validate(postDepartmentBodySchema), authorize, depController.postDepartment);

// PUT => /departments/id
router.put('/:id', validate(editDepartmentBodySchema), authorize, depController.editDepartment);

// DELETE => /departments/id
router.delete('/:id', authorize, depController.deleteDepartment);

module.exports = router;