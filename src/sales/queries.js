const getProducts = "SELECT p.name,p.price,stock.amount FROM product as p join stock on (p.pid=stock.pid)";

const checkEmailExists=(email)=>{return `SELECT cid FROM customer WHERE email = '${email}'`;}

const addCustomer = (name,email)=>{return `insert into customer(name,email) values ('${name}', '${email}')`;}

const getProductByName = (name)=>{return `select pid from product where name = '${name}'`;}

const checkAmount = (pid)=>{return `select amount from stock where pid='${pid}'`;}

const updateAmount= (pid,amount)=>{return `update stock set amount = ${amount} where pid='${pid}'`;}

const createReceipt= (pid,cid,amount)=>{return `insert into receipt(pid,cid,amount) values ('${pid}','${cid}',${amount})`;}

const getCid= (name)=>{return `select cid from customer where name = '${name}'` }
// const showLastRecepits= ;

const showReceipts = "Select * from receipt_view limit 1";

export default {
    getProducts,
    checkEmailExists,
    addCustomer,
    getProductByName,
    checkAmount,
    updateAmount,
    createReceipt,
    showReceipts,
    getCid,
};
