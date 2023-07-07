import React from 'react'
import Navbar from '../Layout/Headers/Navbar'
import SideMenu from '../users/SideMenu'
import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react'
import { useAlert } from 'react-alert';

const ProjectDetails = () => {
    const {empID,bookID } = useParams();

    const alert=useAlert()
    const { isAuthenticated, user } = useSelector((state) => state.user);
    const organization = user.user._id;
    const [projectData, setProjectData] = useState({
      title: '',
      description: '',
      tasks: ['', '', '', '', ''],
      member: empID,
      organization: organization,
      book: bookID,
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setProjectData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleTaskChange = (e, index) => {
      const { value } = e.target;
      setProjectData((prevData) => {
        const updatedTasks = [...prevData.tasks];
        updatedTasks[index] = value;
        return {
          ...prevData,
          tasks: updatedTasks,
        };
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          console.log(projectData)
        const response = await axios.post('/api/v2/project/assignment', projectData);
        console.log(response.data);
        alert.success(response.data.message)
        // Reset the form
        setProjectData({
          title: '',
          description: '',
          tasks: ['', '', '', '', ''],
          member: empID,
          organization: organization,
          book: bookID,
        });
      } catch (error) {
        console.error(error);
        alert.error(error.message)
      }
    };
 
  return (
   <Fragment>
    <Navbar/>
    <div className="container-fluid" >
      <div className="row">
        <SideMenu user={user}/>
        <div className="col-md-8 shadow news-feed">
          <h2 className='m-2'>Project Details</h2>
          <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Title</label>
          <div className="input-group shadow">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroupPrepend1">
                <i className="fa-solid fa-pen" />
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              name="title"
              value={projectData.title}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <div className="input-group shadow">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroupPrepend2">
                <i className="fa-solid fa-briefcase" />
              </span>
            </div>
            <textarea
              className="form-control"
              placeholder="Description"
              name="description"
              value={projectData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Tasks</label>
          {projectData.tasks.map((task, index) => (
            <div className="input-group shadow" key={index}>
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fa-solid fa-pen" />
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder={`Task ${index + 1}`}
                name={`task${index + 1}`}
                value={task}
                onChange={(e) => handleTaskChange(e, index)}
                required
              />
            </div>
          ))}
        </div>

        <button type="submit" className="btn px-5 mt-2 mb-3 btn-primary">
          Create Project
        </button>
      </form>
        </div>
      </div>
    </div>
   </Fragment>
  )
}

export default ProjectDetails