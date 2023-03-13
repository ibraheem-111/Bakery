import pool from "../../db.js";
import queries from "./queries.js";

function makeReceipt(req,res,cid,p_name,amount,name,email){

    pool.query(queries.getProductByName(p_name),(err,results)=>{
        if(results.rows.length){
            let {pid}=results.rows[0];

            pool.query(queries.checkAmount(pid), (err,results)=>{
                if(err) throw err;
                const {amount:readAmount}=results.rows[0];
                
                if(amount>readAmount){
                    res.status(404).send(`we dont have enough of ${p_name}`);
                }else{
    
                    const newAmount=readAmount-amount;
                    
                    pool.query(queries.updateAmount(pid,newAmount), (err,results)=>{
                        if(err) throw err;

                        pool.query(queries.createReceipt(pid,cid,amount),(err,results)=>{
                            if(err) throw err;
                            res.redirect(200,"http://localhost:4000/sales/receipt");
                        })
                    })
                }
            })
        }else{
            res.status(404).send("The requested product does not exist.")
        }
    })
}


function getProducts(req,res){

    pool.query(queries.getProducts,(err,result)=>{
        try{
            if(err) throw(err);
            res.status(200).json(result.rows);
        } catch {
            res.send(500).status("something went wrong");
        }
    })
    
}

function buy(req,res){
    const {body:{email,name,p_name,amount:amountString}}=req;

    const amount= parseInt(amountString);    

    pool.query(queries.checkEmailExists(email), (err,results)=>{
        if(results.rows.length){
            const cid=results.rows[0].cid;
            makeReceipt(req,res,cid,p_name,amount,name,email);

        }else{
            pool.query(queries.addCustomer(name,email), (err,results)=>{
                if(err) throw err;
                
                pool.query(queries.getCid(name), (err,results)=>{
                    if (err) throw err;
                    if(results.rows.length){
                        const cid = results.rows[0].cid;
                        makeReceipt(req,res,cid,p_name,amount,name,email);
                    }
                })
            })
        }
    })

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