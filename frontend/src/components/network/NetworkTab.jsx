import React from 'react'
import { sendConnectionRequest,
    acceptConnectionRequest,
    getSentRequests,
    getReceivedRequests,
    getConnections, } from '../../Actions/connectionAction'

import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Fragment } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
const NetworkTab = ({profile}) => {

const alert=useAlert()

const navigate=useNavigate();

    const handleAcceptRequest = async (senderId, receiverId) => {

        try {
    
          const response=  axios.post("/api/v2/accept-request",{senderId,receiverId})
      
          alert.success((await response).data.message)
          navigate("/home")
      
        } catch (error) {
          alert.error(error.message)
        }
        
      };

  return (
    <Fragment>

<div className="card social-tabs">
                    <ul
                      className="nav nav-tabs md-tabs tab-timeline"
                      role="tablist"
                    >
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          data-toggle="tab"
                          href="#requests"
                          role="tab"
                        >
                        Requests
                        </a>
                        <div className="slide" />
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          data-toggle="tab"
                          href="#sentRequests"
                          role="tab"
                        >
                         Sent Requests
                        </a>
                        <div className="slide" />
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          data-toggle="tab"
                          href="#connections"
                          role="tab"
                        >
                        Connections
                        </a>
                        <div className="slide" />
                      </li>
                      </ul>
                  </div>
                  

                  <div className="tab-content">
                  <div className="tab-pane active" id="requests">
                    <div className="row">
    <div className="col-sm-12">
      <div className="card">
        <div className="card-header">
          <h5 className="card-header-text">Requests</h5>
        </div>
        <div className="card-block">
 
</div>{profile.user.recievedRequests && profile.user.recievedRequests .length > 0 ? (
    // Render content when enrolledbooks array is not empty
    <>
      {profile.user.recievedRequests.reverse().map((req) => (
        <div key={req._id}>

<div className="container mt-5" style={{marginTop:"12px", marginBottom:"20px"}}>

<div className=" card-post">
  <img
    src={req.avatar.url && req.avatar.url}
  
    className="d-none rounded-circle d-md-block blog-card-img card-img-top"
  />
  <div className="card-body blog-card-body d-sm-12 ">
    <h4 className="card-title" style={{ fontWeight: "bold" }}>
    {req.firstName ? `${req.firstName} ${req.lastName}` : req.orgName}
    </h4>
    <p
      className="card-title d-none d-lg-block"
      style={{ fontSize: 20, color: "rgb(123, 123, 123)" }}
    >
     {req.email ? `${req.email}` : req.orgEmail}
    </p>
    <p className="card-text" style={{ color: "rgb(193, 193, 193)" }}>
    <button className="btn mt-2 mr-2 btn-danger" onClick={() => handleAcceptRequest(req._id,profile.user._id)}>Accept</button>
    <Link to={`/profile/${req._id}`}>
                        <button className="btn mt-2 btn-primary">Check Profile</button>
                      </Link>
      <b>
       
      </b>
    </p>
   
  </div>
</div>
</div>

            </div>
             ))}
             </>
           ) : (
            <>
            <p>No requests</p>
            </>
           ) }
        
</div>
</div>
</div>
</div>


<div className="tab-pane " id="sentRequests">
                    <div className="row">
    <div className="col-sm-12">
      <div className="card">
        <div className="card-header">
          <h5 className="card-header-text">Sent Requests</h5>
        </div>
        <div className="card-block">
 
</div>{profile.user.sentRequests  && profile.user.sentRequests.length > 0 ? (
    // Render content when enrolledbooks array is not empty
    <>
      {profile.user.sentRequests.reverse().map((req) => (
        <div key={req._id}>

<div className="container mt-5" style={{marginTop:"12px", marginBottom:"20px"}}>

<div className=" card-post">
  <img
    src={req.avatar.url && req.avatar.url}
  
    className="d-none rounded-circle d-md-block blog-card-img card-img-top"
  />
  <div className="card-body blog-card-body d-sm-12 ">
    <h4 className="card-title" style={{ fontWeight: "bold" }}>
    {req.firstName ? `${req.firstName} ${req.lastName}` : req.orgName}
    </h4>
    <p
      className="card-title d-none d-lg-block"
      style={{ fontSize: 20, color: "rgb(123, 123, 123)" }}
    >
     {req.email ? `${req.email}` : req.orgEmail}
    </p>
    <p className="card-text" style={{ color: "rgb(193, 193, 193)" }}>

    <Link to={`/profile/${req._id}`}>
                        <button className="btn mt-2 btn-primary">Check Profile</button>
                      </Link>
      <b>
       
      </b>
    </p>
   
  </div>
</div>
</div>

            </div>
             ))}
             </>
           ) : (
            <>
            <p>No Requests</p>
            </>
           ) }
        
</div>
</div>
</div>
</div>

<div className="tab-pane " id="connections">
                    <div className="row">
    <div className="col-sm-12">
      <div className="card">
        <div className="card-header">
          <h5 className="card-header-text">Connections</h5>
        </div>
        <div className="card-block">
 
</div>{profile.user.connections && profile.user.connections.length > 0 ? (
    // Render content when enrolledbooks array is not empty
    <>
      {profile.user.connections.reverse().map((req) => (
        <div key={req._id}>

<div className="container mt-5" style={{marginTop:"12px", marginBottom:"20px"}}>

<div className=" card-post">
  <img
    src={req.avatar.url && req.avatar.url}
  
    className="d-none rounded-circle d-md-block blog-card-img card-img-top"
  />
  <div className="card-body blog-card-body d-sm-12 ">
    <h4 className="card-title" style={{ fontWeight: "bold" }}>
    {req.firstName ? `${req.firstName} ${req.lastName}` : req.orgName}
    </h4>
    <p
      className="card-title d-none d-lg-block"
      style={{ fontSize: 20, color: "rgb(123, 123, 123)" }}
    >
     {req.email ? `${req.email}` : req.orgEmail}
    </p>
    <p className="card-text" style={{ color: "rgb(193, 193, 193)" }}>
    <Link to={`/profile/${req._id}`}>
                        <button className="btn mt-2 btn-primary">Check Profile</button>
                      </Link>
      <b>
       
      </b>
    </p>
   
  </div>
</div>
</div>

            </div>
             ))}
             </>
           ) : (
            <>
            <p>No Connections</p>
            </>
           ) }
        
</div>
</div>
</div>
</div>
                    </div>
                
    </Fragment>
  )
}

export default NetworkTab