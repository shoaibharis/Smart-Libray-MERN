const express=require("express");
const {loginUser,logout, getemployee, getAllEmployees, updateEmployee, deleteEmployee, registerEmployee, getProfile } = require("../Controllers/employeeController");
const { isAuthenticatedUser, authorizeRoles } = require("../Middlewares/auth");
const router=express.Router();


router.route("/register/Employee").post(registerEmployee)
router.route("/login/Employee").post(loginUser)
router.route("/logout").get(logout)
router.route("/profile/:id").get(isAuthenticatedUser,getProfile)
router.route("/allEmployees").get(isAuthenticatedUser,getAllEmployees);
router.route("/updateEmployee/:id").put(isAuthenticatedUser,authorizeRoles("employee"),updateEmployee);
router.route("/deleteEmployee/:id").delete(isAuthenticatedUser,authorizeRoles("Organization"),deleteEmployee);
module.exports=router