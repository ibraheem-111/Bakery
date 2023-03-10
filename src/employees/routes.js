import {Router} from 'express';
import controller from './controller.js';


const router = Router();

router.get('/', (req,res)=>{
    
    controller.getEmployees(req,res);
});

router.post('/insert', (req,res)=>{
    controller.addEmployee(req,res)}
);

router.get('/salary', (req,res)=>{
    controller.getSalary(req,res);
})

router.get('/:eid', (req,res)=>{

    controller.getEmployeeById(req,res);
});


export default router;
