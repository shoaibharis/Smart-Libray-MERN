const express = require('express');
const router = express.Router();

const {
  sendRequest,
  acceptRequest,
  deleteRequest,
  getReceivedRequests,
  getSentRequests,
  getAllConnections
} = require('../controllers/connectionController');
const { isAuthenticatedUser } = require('../Middlewares/auth');

// Send connection request
router.post('/send-request', isAuthenticatedUser, sendRequest);

// Accept connection request 
router.post('/accept-request', isAuthenticatedUser, acceptRequest);

// Delete connection request
router.post('/delete-request', isAuthenticatedUser, deleteRequest);

// Get all received requests
router.get('/received-requests/:id', isAuthenticatedUser, getReceivedRequests);

// Get all sent requests
router.get('/sent-requests/:id', isAuthenticatedUser, getSentRequests);

//Get all Connections
router.get("/get-connections/:id", isAuthenticatedUser, getAllConnections)

module.exports = router;
