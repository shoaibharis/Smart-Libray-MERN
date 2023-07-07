import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import UserReg from './components/users/userReg';
import React from "react";
import WebFont from 'webfontloader';
import { useSelector } from 'react-redux';
import UserOptions from "../src/components/Layout/Headers/UserOptions"
import Home from "./components/Home"
import UserLogin from './components/users/userLogin';
import Book from './components/books/Book';
import Profile from "./components/users/Profile";
import Logout from "./components/users/Logout";
import RegForm from './components/users/Reg';
import Roles from './components/Roles';
import OrganizationLogin from './components/users/orgLogin';
import OrgReg from './components/users/orgReg';
import Createbook from './components/books/Createbook';
import Navbar from './components/Layout/Headers/Navbar';
import Books from './components/books/MyBooks';
import Network from "./components/network/Network";
import Notifications from './components/notifications/Notifications';
import ProjectDetails from './components/project/ProjectDetails';
import ProjectProgressPage from './components/project/ProjectProgress';
import UpdateUser from './components/users/UpdateUser';
import BooksList from './components/books/BooksList';
import BorrowBook from './components/books/BorrowBook';
import ReturnBook from './components/books/ReturnBook';
import UpdateBook from './components/books/UpdateBook';
import UpdateForm from './components/books/UpdateForm';

function App() {
  React.useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto","Droid Sans","Chilanks"]
      }
    })
    
  },[])

  const {isAuthenticated,user}=useSelector(state=>state.user)
  
  return (
    <Router>
     
      <Routes>
      <Route path="/" element={<Roles />}/>
      <Route path="/login/member" element={<UserLogin/>} />
      <Route path="/login/organization" element={<OrganizationLogin/>} />
      <Route path="/register/member" element={<UserReg/>}/>
      <Route path="/register/organization" element={<OrgReg/>}/>
      {isAuthenticated && <Route path="/home" element={<Home />} />}
       <Route path="/mybooks/:id" element={<Books user={user}/>} />
       <Route path='/notifications' element={<Notifications/>} />
       <Route path="/network" element={<Network/>} />
      <Route exact path="/books/:id" element={<Book />}  />
      <Route path="/project/Progress" element={<ProjectProgressPage />}  />
      <Route exact path="/project/assignment/:empID/:bookID" element={<ProjectDetails />}  />
      <Route exact path="/profile/:id" element={<Profile/>} />
      <Route path="/logout" element={<Logout />} />
       <Route exact path="/book/addBook" element={<Createbook/>}/>
      <Route exact path="/updateUser/:id" element={<UpdateUser/>} />
      <Route path="/borrow" element={<BooksList/>} />
      <Route path="/return" element={<ReturnBook/>} />
      <Route path="/updateBook" element={<UpdateBook/>} />
      <Route exact path="/borrow/:id" element={<BorrowBook/>} />
      <Route exact path="/updateBook/:id" element={<UpdateForm/>} />
      </Routes>
    </Router>
      );
}

export default App;
