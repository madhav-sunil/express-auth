const express = require('express');
const validate = require('express-validation');
const rolesController = require('../controller/roles');
const { authorize } = require("../middleware/authentication");

const {
    postRolesBodySchema,
    editRolesBodySchema
} = require('../validation/joiRequestValidation');

const router = express.Router();

// GET => /roles
router.get('/', authorize, rolesController.getAllRoles);

// GET => /roles/id
router.get('/:id', authorize, rolesController.getRole);

// POST => /roles
router.post('/', validate(postRolesBodySchema), authorize, rolesController.postRole);

// PUT => /roles/id
router.put('/:id', validate(editRolesBodySchema), authorize, rolesController.editRole);

// DELETE => /roles/id
router.delete('/:id', authorize, rolesController.editRole);

module.exports = router;