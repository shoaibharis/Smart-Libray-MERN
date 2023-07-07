import React from 'react'
import { Fragment } from 'react'
import { useSelector } from 'react-redux';
import "./home.css";
import { Link } from 'react-router-dom';
import BooksList from './books/BooksList';
import { useDispatch} from 'react-redux';
import { fetchbooks } from '../Actions/bookAction';
import { useEffect } from 'react';
import SideMenu from './users/SideMenu';
import Navbar from './Layout/Headers/Navbar';
import { fetchProfile } from '../Actions/userAction';
import UserDetails from './users/UserDetails';
import ReturnBook from './books/ReturnBook';
const Home = () => {
  const {user}=useSelector(state=>state.user)


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProfile(user.user._id));
  }, [dispatch, user.user._id]);

  return (
   <Fragment >
  
    <div className="container-fluid" >
  
      <div className="row">
      <div className="col-md-3"><SideMenu/></div>
        <div className="col-md-8  mt-5 shadow news-feed">
          <h2 className='m-2'>Home</h2>
          {/* <BooksList books={books} /> */}
          <div className='row m-1 '>
    <div
    className='col-md-4 text-center py-5 text-light shadow bg-secondary' style={{borderRadius:"4px"}}>
    <h5>Name: {user.user.firstName} {user.user.lastName}</h5>
    <h6>Email: {user.user.email}</h6>
    <Link to={`/updateUser/${user.user._id}`}>
    <button className='mt-1 btn btn-primary'>Update</button>
    </Link> 
    </div>
    <div className='col-md-4'></div>
    <div className='col-md-4' style={{fontSize:"200px"}}><i class="fa-solid fa-book-open-reader" ></i>
    </div>
    
  
    </div>
          
        </div>
      </div>
    </div>
    </Fragment>
  )
}

export default Home