// connectionActions.js
import axios from 'axios';
import { SEND_CONNECTION_REQUEST,
    ACCEPT_CONNECTION_REQUEST,
    GET_SENT_REQUESTS,
    GET_RECEIVED_REQUESTS,
    GET_CONNECTIONS,
    CONNECTION_ERROR } from '../Constants/userConstants';



// Send connection request
export const sendConnectionRequest = (senderId, receiverId) => async (dispatch) => {
  try {
    const response = await axios.post('/api/v2/send-request', { senderId, receiverId });
    dispatch({
      type: SEND_CONNECTION_REQUEST,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: CONNECTION_ERROR,
      payload: error.response.data.error
    });
  }
};

// Accept connection request
export const acceptConnectionRequest = (senderId, receiverId) => async (dispatch) => {
  try {
    const response = await axios.post('/api/connection/accept-request', { senderId, receiverId });
   
    dispatch({
      type: ACCEPT_CONNECTION_REQUEST,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: CONNECTION_ERROR,
      payload: error.response.data.error
    });
  }
};

// Get sent connection requests
export const getSentRequests = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/v2/sent-requests/${userId}`);
   
    dispatch({
      type: GET_SENT_REQUESTS,
      payload: response.data.sentRequests
    });
  } catch (error) {
    dispatch({
      type: CONNECTION_ERROR,
      payload: error.response.data.error
    });
  }
};

// Get received connection requests
export const getReceivedRequests = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/v2/received-requests/${userId}`);
    console.log(response)
    dispatch({
      type: GET_RECEIVED_REQUESTS,
      payload: response.data.receivedRequests
    });
  } catch (error) {
    dispatch({
      type: CONNECTION_ERROR,
      payload: error.response.data.error
    });
  }
};

// Get connections
export const getConnections = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/v2/get-connections/${userId}`);
    dispatch({
      type: GET_CONNECTIONS,
      payload: response.data.connections
    });
  } catch (error) {
    dispatch({
      type: CONNECTION_ERROR,
      payload: error.response.data.error
    });
  }
};

