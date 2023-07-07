const Project=require("../Models/projectModel");
const Employee=require("../Models/Users/employeeModel");
const Job=require("../Models/jobModel")
const Organization=require("../Models/Users/organizationModel")



exports.createProject=async (req,res)=>{
    try {

      
        const { title, description, tasks, employee, organization, job } = req.body;
    
        const project = await Project.create({
          title,
          description,
          tasks: tasks.map((task) => ({ task })),
          employee,
          organization,
          job,
        });
            

    await Employee.findByIdAndUpdate(employee, {
        $push: { projects: project._id },
      });
  
      await Job.findByIdAndUpdate(job, {
        $push: { projects:  project._id},
      });
  
      await Organization.findByIdAndUpdate(organization, {
        $push: { projects:  project._id},
      });
    
        res.status(201).json({
          success: true,
          message: 'Project created successfully',
          project,
        });

  
      } catch (error) {
        res.status(500).json({
          success: false,
          message: 'An error occurred while creating the project',
          error: error.message,
        });
        console.log(error.message)
      }
   
}

exports.projectDetails=async (req, res) => {
  try {

    const employee = await Employee.findOne(req.user._id).populate("projects")
    res.status(200).json({ success: true, projects: employee.projects });
    console.log(employee)
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to fetch employee projects' });
  }
};

exports.updateProgress=async (req, res) => {
  try {
    const { progress, finishedTasks } = req.body;
    const projectId = req.params.id;

    const updatedProject = await Project.findByIdAndUpdate(projectId, { progress, finishedTasks }, { new: true });

   
    if (updatedProject) {
      res.status(200).json({ success: true, message: 'Project progress updated successfully' });
    } else {
      console.log('Failed to update project progress');
      res.status(404).json({ success: false, error: 'Project not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to update project progress' });
  }
};