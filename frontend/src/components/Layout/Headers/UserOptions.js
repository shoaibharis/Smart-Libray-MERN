import { SpeedDial, SpeedDialAction } from '@mui/material'
import React,{Fragment, useState} from 'react'
import { userReducer } from '../../../Reducers/userReducer';
import "./UserOptions.css"
import { MdDashboard,MdPerson,MdExitToApp,MdListAlt} from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { logout } from '../../../Actions/userAction';
import Backdrop from "@material-ui/core/Backdrop";
import { useNavigate } from 'react-router-dom/dist';
const UserOptions = ({user}) => {

const history=useNavigate();
const dispatch=useDispatch();
const alert=useAlert()
    const options=[
        {icon:<MdListAlt></MdListAlt>, name:"Orders",func:orders},
        {icon:<MdPerson/>, name:"Profile",func:profile},
        {icon:<MdExitToApp></MdExitToApp>, name:"Logout",func:Userlogout}
] 
 
if(user.role==="admin"){
    options.unshift({icon:<MdDashboard/>,name:"Dashboard",func:dashboard})
}

function dashboard(){
    history.push("/dashboard")
}
function orders(){
    history.push("/orders")
}
function profile(){
    history.push("/profile")
}
function Userlogout(){
    dispatch(logout())
    alert.success("Logout Successfuly")
}
    const [open,  setOpen]=useState(false);
    return (
 <Fragment>
       <Backdrop open={open} style={{ zIndex: "10" }} />
    <SpeedDial
    className="speedDial"
    ariaLabel='SpeedDial'
    onClose={()=>setOpen(false)}
    onOpen={()=>setOpen(true)}
    open={open}
    style={{ zIndex: "11" }}
    icon={<img className='speedDialIcon' src={user.avatar.url ? user.avatar.url : "/Profile.png"} />}
    direction="down"
    >
{options.map((item)=>(
    <SpeedDialAction icon={item.icon} onClick={item.func} tooltipTitle={item.name}></SpeedDialAction>
))}
    </SpeedDial>
 </Fragment>
  )
}

export default UserOptions