const express=require("express");
const { createProject, projectDetails, updateProgress } = require("../Controllers/projectController");
const { isAuthenticatedUser, authorizeRoles } = require("../Middlewares/auth");

const router=express.Router();

router.route("/project/assignment").post(isAuthenticatedUser,createProject)
router.route("/project/details").get(isAuthenticatedUser,projectDetails)
router.route("/project/update/:id").put(isAuthenticatedUser,updateProgress)

module.exports=router