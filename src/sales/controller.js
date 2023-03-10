import pool from "../../db.js";
import queries from "./queries.js";

function getProducts(req,res){

    pool.query(queries.getProducts,(err,result)=>{
        if(err) throw(err);
        res.status(200).json(result.rows);
    })
    
}

function buy(req,res){
    const {body:{email,name,p_name,amount:am}}=req;

    const amount= parseInt(am);    

    pool.query(queries.checkEmailExists(email), (err,results)=>{
        if(results.rows.length){
            const cid=results.rows[0].cid;
            makeReceipt(cid);

        }else{
            pool.query(queries.addCustomer(name,email), (err,results)=>{
                if(err) throw err;

                pool.query(`select cid from customer where name = '${name}'`, (err,results)=>{
                    if (err) throw err;
                    if(results.rows.length){
                        const cid = results.rows[0].cid;
                        makeReceipt(cid);
                    }
                })
            })
        }
    })

    

    function makeReceipt(cid){
        
        let pid;

        pool.query(queries.getProductByName(p_name),(err,results)=>{
            if(results.rows.length){
                pid=results.rows[0].pid
                

                pool.query(queries.checkAmount(pid), (err,results)=>{
                    if(err) throw err;
                    const {amount:readAmount}=results.rows[0];
                    
                    if(amount>readAmount){
                        res.status(200).send(`we dont have enough of ${p_name}`);
                    }else{
        
                        const newAmount=readAmount-amount;
                        
                        pool.query(queries.updateAmount(pid,newAmount), (err,results)=>{
                            if(err) throw err;

                            pool.query(queries.createReceipt(pid,cid,amount),(err,results)=>{
                                if(err) throw err;
                                res.redirect(200,"/receipt");
                            })
                        })
                    }
                })
            }else{
                res.status(200).send("The requested product does not exist.")
            }
        })




    }


}

function showReceipt(req,res){
    pool.query(queries.showReceipts, (err,results)=>{
        if(err) throw err;
        res.status(200).json(results.rows);
    })
}

export default {
    getProducts,
    buy,
    showReceipt,
}