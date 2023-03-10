const getEmployees = "SELECT * FROM employees";

const getEmployeeById=(ID)=>{return `SELECT * FROM employees WHERE eid = ${ID}`;}

const addEmployee = (name,designation,age)=>{return `call insert_employee ('${name}', '${designation}', ${age})`;}

const getSalary = "SELECT * from salary";

export default {
    getEmployees,
    getEmployeeById,
    addEmployee,
    getSalary,
};