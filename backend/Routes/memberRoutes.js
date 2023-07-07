const express=require("express");
const {loginUser,logout, getmember, getAllmembers, updateMember, deletemember, registermember, getProfile } = require("../Controllers/memberController");
const { isAuthenticatedUser, authorizeRoles } = require("../Middlewares/auth");
const router=express.Router();


router.route("/register/member").post(registermember)
router.route("/login/member").post(loginUser)
router.route("/logout").get(logout)
router.route("/profile/:id").get(isAuthenticatedUser,getProfile)
router.route("/allmembers").get(isAuthenticatedUser,getAllmembers);
router.route("/updatemember/:id").put(isAuthenticatedUser,updateMember);
router.route("/deletemember/:id").delete(isAuthenticatedUser,authorizeRoles("admin"),deletemember);
module.exports=router