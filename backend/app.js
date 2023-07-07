const express=require("express")
const app=express();
const employeeRoutes=require("./Routes/employeeRoutes")
app.use(express.json)

app.use("/api/v2",employeeRoutes);

module.exports=app