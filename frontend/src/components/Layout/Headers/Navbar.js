import React from 'react'
import "./nav.css"
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Navbar = () => {
  const {isAuthenticated,user}=useSelector(state=>state.user)
  const id=user.user._id;

  return (
    
//     <div>
//   <nav className="navbar navbar-expand-lg navbar-light bg-light">
//     <div className="container">
//       <Link className="mt-2 navbar-brand" to="/">
//    <img src='/LOGO1.png' className="rounded-circle" height={40} alt="" loading="lazy" ></img>
//       </Link>

//       <form className="input-group" style={{ width: 400 }}>
//         <input
//           type="search"
//           className="form-control"
//           placeholder="Type query"
//           aria-label="Search"
//         />
//         <button
//           className="btn btn-outline-primary"
//           type="button"
//           data-mdb-ripple-color="dark"
//           style={{ padding: ".45rem 1.5rem .35rem" }}
//         >
//           Search
//         </button>
//       </form>

//       <button
//         className="navbar-toggler"
//         type="button"
//         data-toggle="collapse"
//         data-target="#navbarSupportedContent"
//         aria-controls="navbarSupportedContent"
//         aria-expanded="false"
//         aria-label="Toggle navigation"
//       >
//         <i className="fas fa-bars" />
//       </button>

//       <div className="collapse navbar-collapse" id="navbarSupportedContent">
//         <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
//           <li className="nav-item mt-2">
//             <Link
//               className="nav-link active d-flex flex-column text-center"
//               aria-current="page"
//               to="/home"
//             >
//               <i className="fas fa-home fa-lg" />
//               <span className="small m-1">Home</span>
//             </Link>
//           </li>
//           <li className="nav-item mt-2">
//             <Link
//               className="nav-link d-flex flex-column text-center"
//               aria-current="page"
//               to="/network"
//             >
//               <i className="fas fa-user-friends fa-lg" />
//               <span className="small m-1">My Network</span>
//             </Link>
//           </li>
//           <li className="nav-item mt-2">
//             <Link
//               className="nav-link d-flex flex-column text-center"
//               aria-current="page"
//               to={`/mybooks/${id}`}
//             >
//               <i className="fas fa-briefcase fa-lg" />
//               <span className="small m-1">books</span>
//             </Link>
//           </li>
         
//           <li className="nav-item mt-2">
//             <Link
//               className="nav-link d-flex flex-column text-center"
//               aria-current="page"
//               to="/notifications"
//             >
//               <i className="fas fa-bell fa-lg" />
//               <span className="small m-1">Notifications</span>
//             </Link>
//           </li>

//           <li className="nav-item dropdown">
//   <div className="nav-link dropdown-toggle d-flex align-items-center" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-expanded="false">
//     <img src={user.user.avatar.url} className="rounded-circle" height={30} alt="" loading="lazy" />
//   </div>
//   <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
//     <li>
//     <Link className="dropdown-item" to={`/profile/${id}`}>
//   My profile
// </Link>
//     </li>
//     <li>
//       <Link className="dropdown-item" to="#">
//         Settings
//       </Link>
//     </li>
//     <li>
//       <Link className="dropdown-item" to="/logout">
//         Logout
//       </Link>
//     </li>
//   </ul>
// </li>

//         </ul>
//       </div>
//     </div>
//   </nav>
  
// </div>


<></>

  
  )
}

export default Navbar