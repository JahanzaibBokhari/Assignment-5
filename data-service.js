var employees = [];
var departments = [];

var fs = require('fs');

//read files
module.exports.initialize = function () {

    return new Promise(function (resolve, reject) {

        fs.readFile('./data/employees.json', (err, data) => {
            if (err) {
                reject("Failure to read file employees.json!");
            }
            else {
                employees = JSON.parse(data);
                fs.readFile('./data/departments.json', (err, data) => {
                    if (err) {
                        reject("Failure to read file departments.json!");
                    }
                    else {
                        departments = JSON.parse(data);
                        resolve()
                    }
                });
            }
        });

    });
}

//get all employees
module.exports.getAllEmployees = function () {

    return new Promise(function (resolve, reject) {
        if (employees.length > 0) {
            resolve(employees);
        }
        else {
            reject('No results returned')
        }

    });

}

//get all managers
module.exports.getManagers = function () {

    return new Promise(function (resolve, reject) {
        var managers = [];
        if (employees.length > 0) {

            for (var key in employees) {
                if (employees[key]["isManager"] == true) {
                    managers.push(employees[key]);
                }
            }
            resolve(managers);
        }
        else {
            reject('No results returned')
        }

    });

}

//get all departments
module.exports.getDepartments = function () {

    return new Promise(function (resolve, reject) {
        if (departments.length > 0) {
            resolve(departments);
        }
        else {
            reject('No results returned')
        }

    });

}

//add employee to employees array
module.exports.addEmployee = function (employeeData) {

    return new Promise(function (resolve, reject) {

        var newEmpoloyee = {
            "employeeNum": employees.length + 1,
            "firstName": employeeData.firstName,
            "lastName": employeeData.lastName,
            "email": employeeData.email,
            "SSN": employeeData.SSN,
            "addressStreet": employeeData.addressStreet,
            "addressCity": employeeData.addressCity,
            "addressState": employeeData.addressState,
            "addressPostal": employeeData.addressPostal,
            "maritalStatus": employeeData.maritalStatus,
            "isManager": true,
            "setManager": function () {
                if (employeeData.isManager) {
                    this.isManager = true;
                }
                else {
                    this.isManager = false
                }
            },
            "employeeManagerNum": employeeData.employeeManagerNum,
            "status": employeeData.status,
            "department": employeeData.department,
            "hireDate": employeeData.hireDate
        }
        newEmpoloyee.setManager();

        employees.push(newEmpoloyee);
        resolve();
    });

}

//get employees by status
module.exports.getEmployeesByStatus = function (status) {
    return new Promise(function (resolve, reject) {
        var employeesStatus = [];

        if (employees.length > 0) {

            for (var key in employees) {
                if (employees[key]["status"] == status) {
                    employeesStatus.push(employees[key]);
                }
            }
            if (employeesStatus.length > 0)
                resolve(employeesStatus);
            else
                reject('No results returned');
        }
        else {
            reject('No results returned');
        }

    });
}

//get employees by department
module.exports.getEmployeesByDepartment = function (department) {
    return new Promise(function (resolve, reject) {
        var employeesDepartment = [];

        if (employees.length > 0) {

            for (var key in employees) {
                if (employees[key]["department"] == department) {
                    employeesDepartment.push(employees[key]);
                }
            }
            if (employeesDepartment.length > 0)
                resolve(employeesDepartment);
            else
                reject('No results returned');
        }
        else {
            reject('No results returned');
        }

    });
}

//get employees by manager
module.exports.getEmployeesByManager = function (manager) {
    return new Promise(function (resolve, reject) {
        var employeesManagers = [];

        if (employees.length > 0) {

            for (var key in employees) {
                if (employees[key]["employeeManagerNum"] == manager) {
                    employeesManagers.push(employees[key]);
                }
            }
            if (employeesManagers.length > 0)
                resolve(employeesManagers);
            else
                reject('No results returned');
        }
        else {
            reject('No results returned');
        }

    });
}

//get employee by employee num
module.exports.getEmployeesByNum = function (num) {
    return new Promise(function (resolve, reject) {
        var employee = [];

        if (employees.length > 0) {

            for (var key in employees) {
                if (employees[key]["employeeNum"] == num) {
                    employee.push(employees[key]);
                }
            }
            if (employee.length > 0)
                resolve(employee);
            else
                reject('No results returned');
        }
        else {
            reject('No results returned');
        }

    });
}

//update employee
module.exports.updateEmployee = function (employeeData) {
    return new Promise(function (resolve, reject) {

        index = employees.findIndex((obj => obj.employeeNum == employeeData.employeeNum));

        var manager;
        if(employeeData.isManager == 'on'){
            manager = true;
        }
        else{
            manager = false;
        }

        employees[index].firstName = employeeData.firstName;
        employees[index].lastName = employeeData.lastName;
        employees[index].email = employeeData.email;
        employees[index].addressStreet = employeeData.addressStreet;
        employees[index].addressCity = employeeData.addressCity;
        employees[index].addressState = employeeData.addressState;
        employees[index].addressPostal = employeeData.addressPostal;
        employees[index].maritalStatus = employeeData.maritalStatus;
        employees[index].isManager = manager;
        employees[index].employeeManagerNum = employeeData.employeeManagerNum;
        employees[index].status = employeeData.status;
        employees[index].department = employeeData.department;

        resolve();
    });
}