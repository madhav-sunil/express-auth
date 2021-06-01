const Roles = require('../models/roles');

exports.getAllRoles = (req, resp, next) => {
    Roles.findAll()
        .then(roles => {
            resp.status(200).json({
                message: 'Roles retrieved successfully',
                roles,
            });
        })
        .catch(err => {
            console.log(err);
            resp.status(404).json({
                message: 'Roles not found'
            });
        })
};

exports.getRole = (req, resp, next) => {
    const id = req.params.id;

    Roles.findByPk(id)
        .then(roles => {
            resp.status(200).json({
                message: 'Role retrieved successfully',
                roles
            });
        })
        .catch(err => {
            console.log(err);
            resp.status(404).json({
                message: 'Role not found'
            });
        });
};

exports.postRole = (req, resp, next) => {
    const name = req.body.name;

    Roles.create({
        name: name
    })
        .then(roles => {
            resp.status(200).json({
                message: 'Role created successfully!',
                roles
            });
        })
        .catch(err => {
            console.log(err);
            resp.status(404).json({
                message: 'Role creation failed',
            });
        });
};

exports.editRole = (req, resp, next) => {
    const id = req.params.id;
    const name = req.body.name;

    Roles.findByPk(id)
        .then(roles => {
            department.name = name;
            return roles.save();
        })
        .then(department => {
            resp.status(200).json({
                message: 'Roles updated successfully',
                department
            });
        })
        .catch(err => {
            console.log(err);
            resp.status(404).json({
                message: 'Roles updation failed',
            });
        });
};

exports.deleteRole = (req, resp, next) => {
    const id = req.params.id;

    Roles.findByPk(id)
        .then(roles => {
            return roles.destroy();
        })
        .then(() => {
            resp.status(200).json({
                message: 'Roles deleted successfully',
            });
        })
        .catch(err => {
            console.log(err);
            resp.status(404).json({
                message: 'Roles deletion failed',
            });
        });
};