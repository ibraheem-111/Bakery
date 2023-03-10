import  express  from "express";
import employees from "./src/employees/routes.js";
import sales from "./src/sales/routes.js";

const app = express();

app.use(express.json());

app.get('/', (req, res)=>{
    res.send("Home Page of Bakery");
})

app.listen(4000);


app.use("/employees", employees);
app.use("/sales", sales);