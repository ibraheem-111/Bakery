import pool from "../../db.js";
import queries from "./queries.js";

function getEmployees(req,res){
    pool.query(queries.getEmployees, (err, result)=>{
        if(err) throw err;
        res.status(200).json(result.rows);
    })
}

function getSalary(req,res){
    pool.query(queries.getSalary, (err, result)=>{
        if(err) throw err;
        res.status(200).json(result.rows);
    })
}

async function getEmployeeById(req,res){
    const { params :{eid:ID}}= req;

    const d = parseInt(ID);

    pool.query(queries.getEmployeeById(d), (err, result)=>{
        if(err) throw err;
        res.status(200).json(result.rows);
    })
}

function addEmployee(req,res){

    const {body: {name, designation, age}}= req;
    pool.query(queries.addEmployee(name,designation,age),(err,result)=>{
        if(err) throw err;
        res.status(200).json(result.rows);
    })
}

export default {
    getEmployees,
    getEmployeeById,
    addEmployee,
    getSalary,
}