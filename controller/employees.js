const Employee = require('../models/employees');
const EmpDept = require('../models/employeeDepartment');
const EmpRoles = require("../models/employeeRole");
const EmpAddress = require("../models/employeeAddress");
const bcrypt = require('bcrypt');
const loginConstants = require('../constants/login.constants');

//GET requests
exports.getAllEmployees = (req, resp, next) => {
    Employee.findAll()
        .then(employees => {
            resp.status(200).json({
                message: 'Employees retrieved successfully',
                employees: employees
            });
        }).catch(err => {
            console.log(err);
            resp.status(404).json({
                message: 'Employees not found'
            });
        });
};

exports.getEmployee = (req, resp, next) => {
    const empId = req.params.id;
    Employee.findByPk(empId)
        .then(employee => {
            resp.status(200).json({
                employee
            });
        })
        .catch(err => {
            console.log(err);
            resp.status(404).json({
                message: 'Employee not found'
            });
        })
};

exports.getEmployeeDepartments = (req, resp, next) => {
    const empId = req.params.id;
    EmpDept.findAll({
        attributes: ['deptId'],
        where: { empId: empId }
    })
        .then(employeeDepartments => {
            resp.status(200).json({
                employeeDepartments
            });
        })
        .catch(err => {
            console.log(err);
            resp.status(404).json({
                message: 'Employee Departments not found'
            })
        });
};

exports.getEmployeeRoles = (req, resp, next) => {
    const empId = req.params.id;
    EmpRoles.findAll({
        attributes: ['roleId'],
        where: { empId: empId }
    })
        .then(employeeRoles => {
            resp.status(200).json({
                employeeRoles
            });
        })
        .catch(err => {
            console.log(err);
            resp.status(404).json({
                message: 'Employee Roles not found'
            })
        });
};

exports.getEmployeeAddress = (req, resp, next) => {
    const empId = req.params.id;
    EmpAddress.findAll({
        where: { empId: empId }
    })
        .then(employeeAddress => {
            resp.status(200).json({
                employeeAddress
            });
        })
        .catch(err => {
            console.log(err);
            resp.status(404).json({
                message: 'Employee Address not found'
            })
        });
};

//POST requests
exports.postEmployee = (req, resp, next) => {
    const name = req.body.name;
    const age = req.body.age;
    const username = req.body.username;
    const password = bcrypt.hashSync(req.body.password, loginConstants.salt);
    Employee.create({
        name: name,
        age: age,
        username,
        password,
    }).then(employee => {
        resp.status(200).json({
            message: 'Employee created successfully',
            employee
        });
    }).catch(err => {
        console.log(err);
        resp.status(404).json({
            message: 'Employee creation failed'
        });
    });
};

exports.postEmployeeDepartment = (req, resp, next) => {
    const empId = req.params.id;
    const deptId = req.body.deptId;
    console.log('here');
    EmpDept.create({
        empId: empId,
        deptId: deptId
    }).then(employeeDepartment => {
        resp.status(200).json({
            message: `Department ${employeeDepartment.deptId} added for employee ${employeeDepartment.empId}`
        });
    }).catch(err => {
        console.log(err);
        resp.status(404).json({
            message: 'Adding department for employee failed'
        });
    });
};

exports.postEmployeeRoles = (req, resp, next) => {
    const empId = req.params.id;
    const roleId = req.body.roleId;

    EmpDept.create({
        empId: empId,
        roleId: roleId
    }).then(employeeRole => {
        resp.status(200).json({
            message: `Department ${employeeRole.roleId} added for employee ${employeeRole.empId}`
        });
    }).catch(err => {
        console.log(err);
        resp.status(404).json({
            message: 'Adding department for employee failed'
        });
    });
};

exports.postEmployeeAddress = (req, resp, next) => {
    const empId = req.params.id;
    const house_name = req.body.house_name;
    const street_name = req.body.street_name;
    const district = req.body.district;
    const pin = req.body.pin;

    EmpAddress.create({
        empId: empId,
        house_name: house_name,
        street_name: street_name,
        district: district,
        pin: pin
    }).then(employeeAddress => {
        resp.status(200).json({
            message: `Address added for employee ${employeeAddress.empId}`
        });
    }).catch(err => {
        console.log(err);
        resp.status(404).json({
            message: 'Adding department for employee failed'
        });
    });
};
//PUT requests
exports.editEmployee = (req, resp, next) => {
    const id = req.params.id;
    const name = req.body.name;
    const age = req.body.age;
    const isActive = req.body.isActive;
    Employee.findByPk(id)
        .then(employee => {
            employee.name = name,
                employee.age = age,
                employee.isActive = isActive
            return employee.save();
        })
        .then(employee => {
            resp.status(200).json({
                message: 'Employee updated successfully',
                employee
            });
        }).catch(err => {
            console.log(err);
            resp.status(404).json({
                message: 'Employee updation failed'
            });
        });
};

exports.deleteEmployee = (req, resp, next) => {
    const id = req.params.id;
    Employee.findByPk(id)
        .then(employee => {
            return employee.destroy();
        })
        .then(() => {
            resp.status(200).json({
                message: 'Employee deleted successfully'
            });
        }).catch(err => {
            console.log(err);
            resp.status(404).json({
                message: 'Employee deletion failed'
            });
        });
};