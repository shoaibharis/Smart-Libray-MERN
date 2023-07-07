import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { login } from '../../Actions/userAction';
import { useDispatch } from 'react-redux';

const UpdateUser = () => {
    const dispatch=useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const alert = useAlert();
  const { isAuthenticated, user } = useSelector(state => state.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      firstName,
      lastName,
      email,
    };

    try {
      const response = await axios.put(`/api/v2/updatemember/${id}`, userData);
      alert.success(response.data.message);
      navigate("/home")
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      // Handle error
    }
  };



  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
    
      <button type="submit">Update</button>
    </form>
  );
};

export default UpdateUser;
