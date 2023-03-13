import {Router} from "express";
import controller from "./controller.js";

const router = Router();

router.get("/customer", (req,res)=>{
    controller.searchForCustomer(req,res)
});

router.get("/products", (req,res)=>{
    controller.searchForProduct(req,res)
});

router.get("/employee", (req,res)=>{
    controller.searchForEmployee(req,res)
});

export default router;