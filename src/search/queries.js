const searchForCustomer = (column, val)=>{return `Select * from customer where ${column} like '%${val}%'`;}

const searchForEmployee = (column, val)=>{return `Select * from employees_public where ${column} like '%${val}%'`;}

const searchForProduct = (val)=>{return `Select * from product where name like '%${val}%'`;}



export default {
    searchForCustomer,
    searchForProduct,
    searchForEmployee,
}