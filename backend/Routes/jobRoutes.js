const express=require("express");
const { createJob, jobDetails, enrollement, updateJob, deleteJob, applyToJob, searchJobs, getAllJobs } = require("../Controllers/jobController");
const { isAuthenticatedUser, authorizeRoles } = require("../Middlewares/auth");
const router=express.Router();


router.route("/createJob").post(isAuthenticatedUser,authorizeRoles("Organization"),createJob);
router.route("/job/:id").get(jobDetails);
router.route("/search").get(searchJobs);
router.route("/jobs").get(getAllJobs);
router.route("/apply").post(isAuthenticatedUser,authorizeRoles("employee"),applyToJob)
router.route("/enroll").post(isAuthenticatedUser,authorizeRoles("Organization"),enrollement)
router.route("/updateJob").put(isAuthenticatedUser,authorizeRoles("Organization"),updateJob);
router.route("/deleteJob").delete(isAuthenticatedUser,authorizeRoles("Organization"),deleteJob);

module.exports=router