// connectionActions.js
import axios from 'axios';
import { SEND_CONNECTION_REQUEST,
    ACCEPT_CONNECTION_REQUEST,
    GET_SENT_REQUESTS,
    GET_RECEIVED_REQUESTS,
    GET_CONNECTIONS,
    CONNECTION_ERROR
 } from '../Constants/userConstants';


 const initialState = {
    sentRequests: [],
    receivedRequests: [],
    connections: [],
    error: null
  };
  
  const connectionReducer = (state = initialState, action) => {
    switch (action.type) {
      case SEND_CONNECTION_REQUEST:
      case ACCEPT_CONNECTION_REQUEST:
        return {
          ...state,
          error: null
        };
      case GET_SENT_REQUESTS:
        return {
          ...state,
          sentRequests: action.payload,
          error: null
        };
      case GET_RECEIVED_REQUESTS:
        return {
          ...state,
          receivedRequests: action.payload,
          error: null
        };
      case GET_CONNECTIONS:
        return {
          ...state,
          connections: action.payload,
          error: null
        };
      case CONNECTION_ERROR:
        return {
          ...state,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default connectionReducer;