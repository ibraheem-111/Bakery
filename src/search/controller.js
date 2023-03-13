import queries from "./queries.js";
import pool from "../../db.js";

function searchForCustomer(req,res){

    const {body:{name=null, email=null}}=req

    if (name!=null){

        pool.query(queries.searchForCustomer('name', name),(err, results)=>{
            try{
                if(err) throw err;
                res.status(200).json(results.rows);
            }catch{
                res.status(500).send("Internal Server Error")
            }
        });

    }else if(email !=null&&name==null){

        pool.query(queries.searchForCustomer('email', email),(err, results)=>{
            try{
                if(err) throw err;
                res.status(200).json(results.rows);
            }catch{
                res.status(500).send("Internal Server Error")
            }
        });

    }else {

        res.status(400).send("400 : Bad Request. Both email and name can't be null");

    }

}

function searchForProduct(req,res){

    const {body:{name=null}}=req;

    if(name==null){
        res.satus(400).send("The name can't be null");
    }else{
        pool.query(queries.searchForProduct(name),(err,results)=>{
            try{
                if(err) throw err;
                res.status(200).json(results.rows);
            }catch{
                res.status(500).send("Internal Server Error")
            }
        })
    }
}


export default {
    searchForCustomer,
    searchForProduct,
}