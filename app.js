require('./config/appConfig');

const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const { notFound, convertError } = require('./middleware/errorMiddleware')

const Employee = require('./models/employees');
const Department = require('./models/departments');
const Roles = require('./models/roles');
const EmpDept = require('./models/employeeDepartment');
const EmpRoles = require("./models/employeeRole");
const empRoutes = require('./routes/employees');
const depRoutes = require('./routes/departments');
const rolesRoutes = require('./routes/roles');
const loginRoute = require('./routes/login');
const EmpAddress = require('./models/employeeAddress');


/**
* Express instance
* @public
*/
const app = express();

// parse body params and attaches them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API routes
app.use('/employees', empRoutes);
app.use('/departments', depRoutes);
app.use('/roles', rolesRoutes);
app.use('/login', loginRoute);

// Error Middlewares
app.use(notFound);
app.use(convertError);

// Employee.hasMany(EmpDept);
EmpDept.belongsTo(Employee, {
    foreignKey: {
        name: 'empId'
    },
    onDelete: 'CASCADE'
});

// Department.hasMany(EmpDept);
EmpDept.belongsTo(Department, {
    foreignKey: {
        name: 'deptId'
    },
    onDelete: 'CASCADE'
});

// Employee.hasMany(EmpRole);
EmpRoles.belongsTo(Employee, {
    foreignKey: {
        name: 'empId'
    },
    onDelete: 'CASCADE'
});

// Department.hasMany(EmpRoles);
EmpRoles.belongsTo(Roles, {
    foreignKey: {
        name: 'roleId'
    },
    onDelete: 'CASCADE'
});

EmpAddress.hasOne(Employee, {
    foreignKey: {
        name: "empId"
    },
    onDelete: 'CASCADE'
});

sequelize
    .sync()
    .then(result => {
        console.log('Listening for requests at http://localhost:7001');
        app.listen(7001);
    })
    .catch(err => {
        console.log(err);
    });