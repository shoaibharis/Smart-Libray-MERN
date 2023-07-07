import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Layout/Headers/Navbar';
import SideMenu from '../users/SideMenu';
import '../home.css';
import BooksTab from './BooksTab';
import { fetchProfile } from '../../Actions/userAction';

const Books = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isAuthenticated,user}=useSelector(state=>state.user)

  const profile = useSelector((state) => state.user.profile);

useEffect(() => {
  dispatch(fetchProfile(user.user._id));
}, [dispatch, user.user._id]);


  return (
    <Fragment>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <SideMenu user={profile} />
          <div className="col-md-8 shadow news-feed">
           <BooksTab profile={profile}></BooksTab>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Books;
