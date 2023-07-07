import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

const ProjectForm = (props) => {
    const alert=useAlert()
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const organization = user.user._id;
  const [projectData, setProjectData] = useState({
    title: '',
    description: '',
    tasks: ['', '', '', '', ''],
    member: props.empID,
    organization: organization,
    book: props.bookID,
  });
console.log(props.empID)
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
        member: props.empID,
        organization: organization,
        book: props.bookID,
      });
    } catch (error) {
      console.error(error);
      alert.error(error.message)
    }
  };

  return (
    <div>
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
  );
};

export default ProjectForm;
