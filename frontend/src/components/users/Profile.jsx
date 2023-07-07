import React from 'react'
import { Fragment } from 'react'
import './profile.css'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Book from '../books/Book'
import Navbar from '../Layout/Headers/Navbar'
import { useNavigate } from 'react-router-dom'
import { sendConnectionRequest } from '../../Actions/connectionAction'
import { useDispatch } from 'react-redux'
import { fetchProfile } from '../../Actions/userAction'

const Profile = () => {
  const dispatch=useDispatch();
  const {id}=useParams();
  const {isAuthenticated,user}=useSelector(state=>state.user);
  const alert=useAlert();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate=useNavigate();

  const [profile, setProfile] = useState(null);

 useEffect(() => {
  const fetchUser = async () => {
    try {
      const response = await axios.get(`/api/v2/profile/${id}`);
      setProfile(response.data);
      
    } catch (error) {
      alert.error(error.message)
    }
  };

  fetchUser();
}, [id]);


const handleAccept =async (appId, bookId) => {
 
  try {
    const bookID=bookId
    const userID=appId
    const response= axios.post("/api/v2/enroll",{bookID,userID})
    alert.success((await response).data.message);
    navigate(`/books/${bookID}`);

  } catch (error) {
    alert.error(error.message)
  }
 
};

useEffect(() => {
  dispatch(fetchProfile(user.user._id));
}, [dispatch, user.user._id]);

const handleSendRequest = async (senderId, receiverId) => {

  try {
  console.log(receiverId)
    const response=  axios.post("/api/v2/send-request",{senderId,receiverId})
    alert.success((await response).data.message);
    console.log((await response).data)

  } catch (error) {
    alert.error(error.message)
  }
  
};

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
   <Fragment>
       <Navbar/>
<div className="container">
    <div className="row">
      <div className="col-sm-12">
        <div>
          <div className="content social-timeline">
            <div className="">
              <div className="row">
                <div className="col-md-12">
                  <div className="social-wallpaper">
                    <div className="profile-hvr">
                      <i className="icofont icofont-ui-edit p-r-10" />
                      <i className="icofont icofont-ui-delete" />
                    </div>
                  </div>
                  <div className="timeline-btn">
                    <a
                      href="#"
                      className="btn btn-primary waves-effect waves-light m-r-10"
                    >
                      follows
                    </a>
                    <a
                      href="#"
                      className="btn btn-primary waves-effect waves-light"
                    >
                      Send Message
                    </a>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xl-3 col-lg-4 col-md-4 col-xs-12">
                  <div className="social-timeline-left">
                    <div className="card">
                      <div className="social-profile">
                        <img
                          className="img-fluid px-4"
                          src={profile.user.avatar.url}
                          alt=""
                        />
                        <div className="profile-hvr m-t-15">
                          <i className="icofont icofont-ui-edit p-r-10" />
                          <i className="icofont icofont-ui-delete" />
                        </div>
                      </div>
                      <div className="card-block mt-2 social-follower">
                      <h4>{profile.user.firstName ? `${profile.user.firstName} ${profile.user.lastName}` : profile.user.orgName}</h4>

                        <p>{profile.user.bio}</p>
                        <h4>{profile.user.status && profile.user.status}</h4>
                       {profile.user._id != user.user._id && (

                        <div className="">
                          <button
                            type="button"
                            className="btn btn-outline-primary waves-effect btn-block"
                            onClick={() => handleSendRequest(user.user._id, profile.user._id)}
                         >
                            <i className="icofont icofont-ui-user m-r-10" />
                            Connect
                          </button>
                        </div>
                        )}
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-header">
                        <h5 className="card-header-text">Who to follow</h5>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-header">
                        <h5 className="card-header-text d-inline-block">
                          Friends
                        </h5>
                        <span className="label label-primary f-right"> </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-9 col-lg-8 col-md-8 col-xs-12 ">
                  <div className="card social-tabs">
                    <ul
                      className="nav nav-tabs md-tabs tab-timeline"
                      role="tablist"
                    >
                      {/* <li class="nav-item">
                                          <a class="nav-link active" data-toggle="tab" href="#timeline" role="tab">Timeline</a>
                                          <div class="slide"></div>
                                      </li> */}
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          data-toggle="tab"
                          href="#about"
                          role="tab"
                        >
                          About
                        </a>
                        <div className="slide" />
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          data-toggle="tab"
                          href="#books"
                          role="tab"
                        >
                          books
                        </a>
                        <div className="slide" />
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          data-toggle="tab"
                          href="#Applications"
                          role="tab"
                        >
                          Applications
                        </a>
                        <div className="slide" />
                      </li>
                      {/* <li class="nav-item">
                                          <a class="nav-link" data-toggle="tab" href="#photos" role="tab">Photos</a>
                                          <div class="slide"></div>
                                      </li>
                                      <li class="nav-item">
                                          <a class="nav-link" data-toggle="tab" href="#friends" role="tab">Friends</a>
                                          <div class="slide"></div>
                                      </li> */}
                    </ul>
                  </div>
                  
 

                  
                  <div className="tab-content">
                    <div className="tab-pane active" id="about">
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="card">
                            <div className="card-header">
                              <h5 className="card-header-text">
                                Basic Information
                              </h5>
                              <button
                                id="edit-btn"
                                type="button"
                                className="btn btn-primary waves-effect waves-light f-right"
                              >
                                <i className="icofont icofont-edit" />
                              </button>
                            </div>
                            <div className="card-block">
                              <div id="view-info" className="row">
                                <div className="col-lg-6 col-md-12">
                                  <form>
                                    <table className="table table-responsive m-b-0">
                                      <tbody>
                                        <tr>
                                          <th className="social-label b-none p-t-0">
                                            Full Name
                                          </th>
                                          <td className="social-user-name b-none p-t-0 text-muted">
                                          <h4>{profile.user.firstName ? `${profile.user.firstName} ${profile.user.lastName}` : profile.user.orgName}</h4>
                                          </td>
                                        </tr>
                                        {profile.user.role === "Organization" && (
  <tr>
    <th className="social-label b-none">
      Organization Type
    </th>
    <td className="social-user-name b-none text-muted">
      {profile.user.orgType}
    </td>
  </tr>
)}
                                       
              
                                        <tr>
                                          <th className="social-label b-none p-b-0">
                                            Location
                                          </th>
                                          <td className="social-user-name b-none p-b-0 text-muted">
                                            New York, USA
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </form>
                                </div>
                              </div>
                             
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-12">
                          <div className="card">
                            <div className="card-header">
                              <h5 className="card-header-text">
                                Contact Information
                              </h5>
                              <button
                                id="edit-Contact"
                                type="button"
                                className="btn btn-primary waves-effect waves-light f-right"
                              >
                                <i className="icofont icofont-edit" />
                              </button>
                            </div>
                            <div className="card-block">
                              <div id="contact-info" className="row">
                                <div className="col-lg-6 col-md-12">
                                  <table className="table table-responsive m-b-0">
                                    <tbody>
                                      <tr>
                                        <th className="social-label b-none p-t-0">
                                          Mobile Number
                                        </th>
                                        <td className="social-user-name b-none p-t-0 text-muted">
                                         {profile.user.phone}
                                        </td>
                                      </tr>
                                      <tr>
                                        <th className="social-label b-none">
                                          Email Address
                                        </th>
                                        <td className="social-user-name b-none text-muted">
                                        {profile.user.email ? `${profile.user.email}` : profile.user.orgEmail }
                                        </td>
                                      </tr>
                                      <tr>
                                        <th className="social-label b-none">
                                          Twitter
                                        </th>
                                        <td className="social-user-name b-none text-muted">
                                         {profile.user.twitter}
                                        </td>
                                      </tr>
                                      <tr>
                                        <th className="social-label b-none p-b-0">
                                          Github
                                        </th>
                                        <td className="social-user-name b-none p-b-0 text-muted">
                                         {profile.user.github}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                              
                              <div
                                id="edit-contact-info"
                                className="row"
                                style={{ display: "none" }}
                              >
                                <div className="col-lg-12 col-md-12">
                                  <form>
                                    <div className="input-group">
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Mobile number"
                                      />
                                    </div>
                                    <div className="input-group">
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Email address"
                                      />
                                    </div>
                                    <div className="input-group">
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Twitter id"
                                      />
                                    </div>
                                    <div className="input-group">
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Skype id"
                                      />
                                    </div>
                                    <div className="text-center m-t-20">
                                      <a
                                        href="javascript:;"
                                        id="contact-save"
                                        className="btn btn-primary waves-effect waves-light m-r-20"
                                      >
                                        Save
                                      </a>
                                      <a
                                        href="javascript:;"
                                        id="contact-cancel"
                                        className="btn btn-default waves-effect waves-light"
                                      >
                                        Cancel
                                      </a>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className={`col-sm-12 ${profile.user.role === 'Organization' ? 'd-none' : ''}`}>
                          <div className="card">
                            <div className="card-header">
                              <h5 className="card-header-text">Education</h5>
                              <button
                                id="edit-work"
                                type="button"
                                className="btn btn-primary waves-effect waves-light f-right"
                              >
                                <i className="icofont icofont-edit" />
                              </button>
                            </div>
                            <div className="card-block">
                              <div id="work-info" className="row">
                                <div className="col-lg-6 col-md-12">
                                  <table className="table table-responsive m-b-0">
                                    <tbody>
                                      <tr>
                                        <th className="social-label b-none p-t-0">
                                         Expertise &nbsp; &nbsp; &nbsp;
                                        </th>
                                        <td className="social-user-name b-none p-t-0 text-muted">
                                         {profile.user.expertise}
                                        </td>
                                      </tr>
                                      <tr>
                                        <th className="social-label b-none p-t-0">
                                         Degree &nbsp; &nbsp; &nbsp;
                                        </th>
                                        <td className="social-user-name b-none p-t-0 text-muted">
                                        {profile.user.education && profile.user.education.degree && profile.user.education.degree}
                                        </td>
                                      </tr>
                                      <tr>
                                        <th className="social-label b-none p-t-0">
                                        Institute &nbsp; &nbsp; &nbsp;
                                        </th>
                                        <td className="social-user-name b-none p-t-0 text-muted">
                                        {profile.user.education && profile.user.education.institute && profile.user.education.institute}
                                        </td>
                                      </tr>
                                      <tr>
                                        <th className="social-label b-none p-t-0">
                                        Session &nbsp; &nbsp; &nbsp;
                                        </th>
                                        <td className="social-user-name b-none p-t-0 text-muted">
                                        {profile.user.education && profile.user.education.session && profile.user.education.session}

                                        </td>
                                      </tr>
                                     
                                      
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                              <div
                                id="edit-contact-work"
                                className="row"
                                style={{ display: "none" }}
                              >
                                <div className="col-lg-12 col-md-12">
                                  <form>
                                    <div className="input-group">
                                      <select
                                        id="occupation"
                                        className="form-control"
                                      >
                                        <option value="">
                                          {" "}
                                          Select occupation{" "}
                                        </option>
                                        <option value="married">
                                          Developer
                                        </option>
                                        <option value="unmarried">
                                          Web Design
                                        </option>
                                      </select>
                                    </div>
                                    <div className="input-group">
                                      <select
                                        id="skill"
                                        className="form-control"
                                      >
                                        <option value="">
                                          {" "}
                                          Select Skills{" "}
                                        </option>
                                        <option value="married">
                                          C# &amp; .net
                                        </option>
                                        <option value="unmarried">
                                          Angular
                                        </option>
                                      </select>
                                    </div>
                                    <div className="input-group">
                                      <select id="book" className="form-control">
                                        <option value=""> Select book </option>
                                        <option value="married">#</option>
                                        <option value="unmarried">Other</option>
                                      </select>
                                    </div>
                                    <div className="text-center m-t-20">
                                      <a
                                        href="javascript:;"
                                        id="work-save"
                                        className="btn btn-primary waves-effect waves-light m-r-20"
                                      >
                                        Save
                                      </a>
                                      <a
                                        href="javascript:;"
                                        id="work-cancel"
                                        className="btn btn-default waves-effect waves-light"
                                      >
                                        Cancel
                                      </a>
                                    </div>
                                  </form>
                                </div>
                              </div>
                              
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

{/* books pane */}

<div className="tab-pane" id="books">
  <div className="row">
    <div className="col-sm-12">
      <div className="card">
        <div className="card-header">
          <h5 className="card-header-text">books</h5>
        </div>
        <div className="card-block">
  {profile.user.enrolledbooks && profile.user.enrolledbooks.length > 0 ? (
    // Render content when enrolledbooks array is not empty
    <>
      {profile.user.enrolledbooks.map((book) => (
        <div key={book._id}>
          <h4>{book.title}</h4>
          <p>{book.description}</p>
          <p>Type: {book.type}</p>
          <p>Category: {book.category}</p>
          <p>Hours: {book.hours}</p>
          <p>Stipend: {book.stipend}</p>
          <p>Organization: {book.organization && book.organization.orgName}</p> {/* Assuming organization has a "name" field */}
          {/* Add additional fields as needed */}
        </div>
      ))}
    </>
  ) : profile.user.books && profile.user.books.length > 0 ? (
    // Render content when enrolledbooks array is empty and books array is not empty
    <>
      {profile.user.books.map((book) => (
        <div key={book._id}>
          <h4>{book.title}</h4>
          <p>{book.description}</p>
          <p>Type: {book.type}</p>
          <p>Category: {book.category}</p>
          <p>Hours: {book.hours}</p>
          <p>Stipend: {book.stipend}</p>
          <p>Organization: {profile.user.orgName && profile.user.orgName}</p> {/* Assuming organization has a "name" field */}
          {/* Add additional fields as needed */}
        </div>
      ))}
    </>
  ) : (
    // Render content when both enrolledbooks and books arrays are empty
    <>
      {/* Fallback content */}
    </>
  )}
</div>



      </div>
    </div>
  </div>
</div>

            {/* Applications Pane         */}
            <div className="tab-pane" id="Applications">
  <div className="row">
    <div className="col-sm-12">
      <div className="card">
        <div className="card-header">
          <h5 className="card-header-text">Applications</h5>
        </div>
        <div className="card-block">
          {/* Applications content */}
          {profile.user.appliedbooks && profile.user.appliedbooks.length > 0 ? (
            <>
              {profile.user.appliedbooks.map((x) => (
                <div key={x._id}>
                  <h4>{x.title}</h4>
                  <p>{x.description}</p>
                  <p>Type: {x.type}</p>
                  <p>Category: {x.category}</p>
                  <p>Hours: {x.hours}</p>
                  <p>Stipend: {x.stipend}</p>
                  <p>Organization: {x.organization && x.organization.orgName}</p>
                  {/* Add additional fields as needed */}
                </div>
              ))}
            </>
          ) : profile.user.books && profile.user.books.length > 0 ? (
            <>
              {profile.user.books.map((book) => (
                <div className=" mt-4" key={book._id}>
                
                  {book.applications.map((app) => (
                    <div key={app._id}>
                      <div className="container " style={{marginTop:"12px", marginBottom:"20px"}}>

<div className=" card-post">
  <img
    src={app.avatar.url && app.avatar.url}
  
    className="d-none rounded-circle d-md-block blog-card-img card-img-top"
  />
  <div className="card-body blog-card-body d-sm-12 ">
    <h3 className="card-title" style={{ fontWeight: "bold" }}>
    {book.title}
    </h3>
    <h4>Name: {app.firstName} {app.lastName}</h4>
    <p
      className="card-title d-none d-lg-block"
      style={{ fontSize: 20, color: "rgb(123, 123, 123)" }}
    >
    Email: {app.email}
    </p>
    <p className="card-text" style={{ color: "rgb(193, 193, 193)" }}>
    <button className="btn btn-danger" onClick={() => handleAccept(app._id, book._id)}>Accept</button>
                     <Link to={`/profile/${app._id}`}><button className="btn  m-2 btn-primary">Check Profile</button> </Link>
                      
      <b>
       
      </b>
    </p>
   
  </div>
</div>
</div>
                    </div>
                  ))}
                </div>
              ))}
            </>
          ) : (
            // Render content when both appliedbooks and books arrays are empty
            <>
              {/* Fallback content */}
            </>
          )}
        </div>

      </div>
    </div>
  </div>
</div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
   </Fragment>
  )
}

export default Profile