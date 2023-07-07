import React from 'react';
import Navbar from '../Layout/Headers/Navbar';
import SideMenu from '../users/SideMenu';
import { Fragment } from 'react';
import NotificationsList from './NotificationsList';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProfile } from '../../Actions/userAction';

const Notifications = () => {
  const { isAuthenticated, user } = useSelector(state => state.user);
  const profile = useSelector((state) => state.user.profile);


  const dispatch=useDispatch();
  useEffect(() => {
    dispatch(fetchProfile(user.user._id));
  }, [dispatch, user.user._id]);

  return (
    <Fragment>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <SideMenu user={user} />
          <div className="col-md-8 shadow news-feed">
            <h2 className='m-2'>Notifications</h2>
        
            {profile.user.notifications.reverse().map((x, index) => (
              
              <NotificationsList key={index}  notification={x}/>
            
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Notifications;
