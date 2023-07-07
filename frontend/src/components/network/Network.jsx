import React, { Fragment } from 'react'
import Navbar from '../Layout/Headers/Navbar'
import SideMenu from '../users/SideMenu'
import { useSelector } from 'react-redux'
import NetworkTab from './NetworkTab'
import { fetchProfile } from '../../Actions/userAction'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
const Network = () => {
  const dispatch=useDispatch()
const {isAuthenticated,user}=useSelector(state=>state.user)
const profile = useSelector((state) => state.user.profile);

useEffect(() => {
  dispatch(fetchProfile(user.user._id));
}, [dispatch, user.user._id]);

  return (
    <Fragment>
     <Navbar/>

     <div className="container-fluid" >
      <div className="row">
        <SideMenu user={profile}/>
        <div className="col-md-8 shadow news-feed">

        <NetworkTab profile={profile} />
        </div>
      
        </div>
        </div>

    </Fragment>
  )
}

export default Network