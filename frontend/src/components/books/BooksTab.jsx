import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const BooksTab = ({profile}) => {


    const navigate=useNavigate();
    const alert=useAlert();

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
                      </ul>
                  </div>
                  

                  <div className="tab-content">
                    <div className="tab-pane active" id="books">
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
                <div key={book._id}>
              
                 
                  {book.applications.map((app) => (
                    <div  className="p-3" key={app._id}>

<div className="container  mt-5" style={{marginTop:"12px", marginBottom:"20px"}}>

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
                       {/* <h3>{book.title}</h3> 
                      <h4>Name: {app.firstName} {app.lastName}</h4>
                      <p>Email: {app.email}</p>
                      <button className="btn btn-danger" onClick={() => handleAccept(app._id, book._id)}>Accept</button>
                     <Link to={`/profile/${app._id}`}><button className="btn  m-2 btn-primary">Check Profile</button> </Link>
                       */}
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




{/* <div className="container mt-5" style={{marginTop:"12px", marginBottom:"20px"}}>

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
</div> */}

    </Fragment>
  )
}

export default BooksTab