import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideMenu from '../users/SideMenu';
import { useSelector } from 'react-redux';
import { Fragment } from 'react';
import Navbar from '../Layout/Headers/Navbar';
import { useAlert } from 'react-alert';

const ProjectProgressPage = () => {
  const alert = useAlert();
  const { user } = useSelector((state) => state.user);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [progress, setProgress] = useState(0);
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    fetchProjectDetails();
  }, []);

  const fetchProjectDetails = async () => {
    try {
      const response = await axios.get('/api/v2/project/details');
      const projectData = response.data.projects;
      setProjects(projectData);
    } catch (error) {
      console.error(error);
      alert.error(error.message);
    }
  };

  const handleCheckboxChange = (taskId) => {
    const updatedCompletedTasks = completedTasks.includes(taskId)
      ? completedTasks.filter((task) => task !== taskId)
      : [...completedTasks, taskId];
    const updatedProgress = (updatedCompletedTasks.length / 5) * 100;
    setCompletedTasks(updatedCompletedTasks);
    setProgress(updatedProgress);
  };

  const handleUpdateProgress = async () => {
    try {
      const projectId = selectedProject._id;
      await axios.put(`/api/v2/project/update/${projectId}`, {
        progress,
        finishedTasks: completedTasks,
      });
      alert.success('Progress updated successfully');
    } catch (error) {
      console.error(error);
      alert.error('Failed to update progress');
    }
  };

  const handleProjectSelection = (project) => {
    setSelectedProject(project);
    setProgress(project.progress || 0);
    setCompletedTasks(project.finishedTasks || []);
  };

  return (
    <Fragment>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <SideMenu user={user} />
          <div className="col-md-8 shadow news-feed">
            
            <div>
              <h3>Select Project:</h3>
              <select class="form-select" onChange={(e) => handleProjectSelection(JSON.parse(e.target.value))}>
                <option value="">Select a project</option>
                {projects.map((project) => (
                  <option key={project._id} value={JSON.stringify(project)}>
                    {project.title}
                  </option>
                ))}
              </select>
            </div>
            {selectedProject && (
            <div className='row'>
              <div className=' mt-2 col-md-6'>

              <div>
                  <h4>Assigned By: {selectedProject.organization.orgName}</h4> 
                </div>
              
                <div>
                  <h4>Title: {selectedProject.title}</h4> 
                </div>
               
                <div>
                  <h4>Description:</h4> <p>{selectedProject.description}</p>
                </div>

               
                <div>
                  <h4>Tasks:</h4>
                  {selectedProject.tasks.map((task, index) => (
                    <div key={task._id}>
                      <input
                        type="checkbox"
                       className='m-1'
                        checked={completedTasks.includes(task._id)}
                        onChange={() => handleCheckboxChange(task._id)}
                      />
                      {task.task}
                    </div>
                  ))}
                </div>
                
                <button className='btn mt-2 mb-2 btn-primary' onClick={handleUpdateProgress}>Update Progress</button>
              </div>
              <div className="col-md-6  mt-2 mb-2  text-center">
                <h3>Progress</h3> 
  <span
    className=" shadow mt-2 d-inline-block"
    style={{
      borderRadius: "50%",
      padding: "20px",
      width: "105px",
      height: "105px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "5px solid #318CE7",
      fontSize :"30px"
    }}
  >
  {progress}%
  </span>
</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProjectProgressPage;
