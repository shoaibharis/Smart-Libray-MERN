const job=require("../Models/jobModel");
const employee=require("../Models/Users/employeeModel");
const cloudinary=require("cloudinary")
const catchAsyncErrors=require("../Middlewares/catchAsyncErrors")
const ErrorHandler=require("../Utils/errorHandler");
const sendToken=require("../Utils/jwtToken")
const ApiFeatures=require("../Utils/apiFeatures")
const organization=require("../Models/Users/organizationModel")



exports.createJob=catchAsyncErrors(async (req,res,next)=>{
  
    const {
        title,
        description,
        type,
        category,
        hours,
        stipend}=req.body

    const newJob=await job.create({
        title,
        description,
        type,
        category,
        hours,
        stipend,
        organization:req.user._id,
        createdAt:Date.now()
    })

     // Add the newly created job ID to the organization model
  const org=await organization.findByIdAndUpdate(
    req.user._id,
    { $push: { jobs: newJob._id } },
    { new: true }
  );
org.notifications.push(`${newJob.title} : New Job Posted`)
await org.save();

   if(!newJob){
    next(new ErrorHandler("Failed to create",400))
   }
    res.status(201).json({
        success:true,
        newJob
    })
})

exports.jobDetails=catchAsyncErrors(async(req,res,next)=>{

    const jobInfo=await job.findById(req.params.id).populate("organization").populate("applications").populate("enrolledEmployees");

    if(!jobInfo){
        res.status(400).json({
            success:false,
            message:"job not found"
        })}
    
        res.status(200).json({
        success:true,
        jobInfo
    })

})

exports.searchJobs=catchAsyncErrors(async(req,res,next)=>{
    const resultPerPage=8;
    const jobsCount=await job.countDocuments();
      
    const apiFeature=new ApiFeatures(job.find(),req.query).search().filter().pagination(resultPerPage)

   const jobsInfo =await apiFeature.query
   console.log(jobsInfo)
     res.status(200).json({
         success:true,
         jobsInfo,
         jobsCount,
         resultPerPage,
     })
 
})

exports.getAllJobs = async (req, res) => {
  try {
    // Find all jobs and populate the organization field
    const jobs = await job.find().populate('organization');

    // Return the job details with organization details
    res.status(200).json({ success: true, data: jobs });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.applyToJob=catchAsyncErrors( async (req,res,next)=>{
 
  const { jobID } = req.body;

  const selectedJob = await job.findById(jobID);

  if (!selectedJob) {
    return res.status(400).json({
      success: false,
      message: "Job does not exist",
    });
  }

  req.user.appliedJobs.push(jobID);
  selectedJob.applications.push(req.user._id);

  req.user.notifications.push(`${selectedJob.title} : Application Submitted. `)
  await req.user.save();
  await selectedJob.save();

  res.status(201).json({
    success: true,
    message: "Applied successfully",
  });
});

exports.enrollement=catchAsyncErrors( async (req,res,next)=>{
 
    const {jobID,userID}=req.body
 console.log(req.body)
    const selectedJob=await job.findById(jobID);
    const applicant=await employee.findById(userID);

    if(!applicant){
      next(new ErrorHandler("Applicant Not Found",400))
    }

    if(!selectedJob){
        res.status(400).json({
            sucess:false,
            message:"job does not exist"
        })
    }
    
      applicant.enrolledJobs.push(jobID);
      applicant.appliedJobs.pull(jobID);
    
      applicant.status="hired";

   
    selectedJob.applications.pull(applicant);
    selectedJob.enrolledEmployees.push(applicant);

    applicant.notifications.push(`Congratulations! Your Application for ${selectedJob.title} has been accepted!`)
    
    await applicant.save();
    await selectedJob.save();
    
    res.status(201).json({
        success:true,
        message:"hired SuccessFully"
    })

})

exports.updateJob= async (req, res) => {
    try {
      const { title,
        description,
        type,
        category,
        hours,
        stipend } = req.body;
  
      const Job = await job.findById(req.params.id);
  
      if (Job) {
        Job.title = title || Job.title;
        Job.description = description || Job.description;
        Job.type = type||  Job.type;
        Job.category = category ||  Job.category;
        Job.hours = hours ||  Job.hours;
        Job.stipend = stipend ||Job.stipend;
  
        const updatedJob = await Job.save();
        res.json(updatedJob);
      } else {
        res.status(404).json({ message: 'Job not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };

exports.deleteJob = async (req, res) => {
    try {
      const Job = await job.findById(req.params.id);
  
      if (Job) {
        await Job.remove();
        res.json({ message: 'Job removed' });
      } else {
        res.status(404).json({ message: 'Job not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };