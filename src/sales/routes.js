import {Router} from 'express';
import controller from './controller.js';


const router = Router();

router.get('/', (req,res)=>{
    
    controller.getProducts(req,res);
});

router.post('/buy',(req,res)=>{
    controller.buy(req,res);
})

router.get('/receipt',(req,res)=>{
    controller.showReceipt(req,res);
})


export default router;
