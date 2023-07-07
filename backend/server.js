//const app=require("./app.js");
const express=require("express")
const app=express();
const dotenv=require("dotenv")
const cors=require("cors")
const fileupload=require("express-fileupload")
const connectDatabase=require("./Config/database");
const errorMiddleWare=require("./Middlewares/error")
const employeeRoutes=require("./Routes/employeeRoutes")
const cookieParser=require("cookie-parser")
const organizationRoutes=require("./Routes/orgRoutes");
const jobRoutes=require("./Routes/jobRoutes")
const connectionRoutes=require("./Routes/connectionRoutes");
const projectRoutes=require("./Routes/projectRoutes")
const cloudinary=require("cloudinary");

dotenv.config({path:'./backend/config/config.env'})
app.use(fileupload());
app.use(cookieParser())
app.use(express.json())

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL ?? "http://localhost:3001",
    optionsSuccessStatus: 200,
  })
);
connectDatabase();

cloudinary.config({
  cloud_name:process.env.CLOUDINARY_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET
})


app.listen(process.env.PORT,()=>{
    console.log(`Server is running on ${process.env.PORT}`);
})


//ROUTES
app.use("/api/v2",employeeRoutes)
app.use("/api/v2",organizationRoutes);
app.use("/api/v2",jobRoutes);
app.use("/api/v2",connectionRoutes);
app.use("/api/v2",projectRoutes)
app.use(errorMiddleWare)