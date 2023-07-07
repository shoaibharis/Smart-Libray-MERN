const express = require('express');
const router = express.Router();
const Employee = require('../Models/Users/employeeModel');
const Organization = require('../Models/Users/organizationModel');

// Send connection request
exports.sendRequest = async (req, res) => {
  const { senderId, receiverId } = req.body;
  try {
    let sender = await Employee.findById(senderId);
    let receiver = await Employee.findById(receiverId);
 

    

    if (!sender) {
      sender = await Organization.findById(senderId);
    }

    if (!receiver) {
      receiver = await Organization.findById(receiverId);
    }


    if (!sender || !receiver) {
      return res.status(404).json({ error: 'Sender or receiver not found' });
    }

    sender.sentRequests.push(receiverId);
    receiver.recievedRequests.push(senderId);

    const receiverName = receiver.firstName && receiver.lastName
    ? receiver.firstName + ' ' + receiver.lastName
    : receiver.orgName;  

     const senderName = sender.firstName && sender.lastName
     ? sender.firstName + ' ' + sender.lastName
     : sender.orgName; 

    sender.notifications.push(`Connection Request Sent to ${receiverName}.`)
    receiver.notifications.push(`You have Recieved a Connection Request from ${senderName}. `)


    await sender.save();
    await receiver.save();

    res.status(200).json({ message: 'Request sent successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Accept connection request
exports.acceptRequest = async (req, res) => {
  const { senderId, receiverId } = req.body;

  try {
    let sender = await Employee.findById(senderId);
    let receiver = await Employee.findById(receiverId);
    console.log(receiver)
    console.log(sender)

    if (!sender) {
      sender = await Organization.findById(senderId);
    }

    if (!receiver) {
      receiver = await Organization.findById(receiverId);
    }

    if (!sender || !receiver) {
      return res.status(404).json({ error: 'Sender or receiver not found' });
    }

    const senderRequestIndex = sender.sentRequests.indexOf(receiverId);
    if (senderRequestIndex !== -1) {
      sender.sentRequests.splice(senderRequestIndex, 1);
    }

    const receiverRequestIndex = receiver.recievedRequests.indexOf(senderId);
    if (receiverRequestIndex !== -1) {
      receiver.recievedRequests.splice(receiverRequestIndex, 1);
    }


    sender.connections.push(receiverId);
    receiver.connections.push(senderId);

    
    const receiverName = receiver.firstName && receiver.lastName
    ? receiver.firstName + ' ' + receiver.lastName
    : receiver.orgName;  
     
    const senderName = sender.firstName && sender.lastName
    ? sender.firstName + ' ' + sender.lastName
    : sender.orgName; 
    
    sender.notifications.push(`${receiverName} accepted your connection request.`)
    receiver.notifications.push(`${senderName} is your new Connection!`)
    await sender.save();
    await receiver.save();
  

    res.status(200).json({ message: 'Request accepted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete connection request
exports.deleteRequest = async (req, res) => {
  const { senderId, receiverId } = req.body;

  try {
    let sender = await Employee.findById(senderId);
    let receiver = await Employee.findById(receiverId);

    if (!sender) {
      sender = await Organization.findById(senderId);
    }

    if (!receiver) {
      receiver = await Organization.findById(receiverId);
    }

    if (!sender || !receiver) {
      return res.status(404).json({ error: 'Sender or receiver not found' });
    }

    sender.sentRequests = sender.sentRequests.filter((request) => request.toString() !== receiverId.toString());
    receiver.recievedRequests = receiver.recievedRequests.filter((request) => request.toString() !== senderId.toString());

    await sender.save();
    await receiver.save();

    res.status(200).json({ message: 'Request deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all received requests
exports.getReceivedRequests = async (req, res) => {
  const { id } = req.params;

  try {
    let employee = await Employee.findById(id).populate({
      path: "recievedRequests",
      model: "organization"
    })
  
    if (!employee) {
      employee = await Organization.findById(id).populate('recievedRequests');
    }

    if (!employee) {
      return res.status(404).json({ error: 'Employee or Organization Not Found' });
    }

    const recievedRequests = employee.recievedRequests;
    res.status(200).json({ recievedRequests });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all sent requests
exports.getSentRequests = async (req, res) => {
  const { id } = req.params;

  try {
    let employee = await Employee.findById(id).populate('sentRequests');
    if (!employee) {
      employee = await Organization.findById(id).populate('sentRequests');
    }

    if (!employee) {
      return res.status(404).json({ error: 'Employee or organization not found' });
    }

    const sentRequests = employee.sentRequests;
    res.status(200).json({ sentRequests });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllConnections = async (req, res) => {
    const { id } = req.params;
  
    try {
      let employee = await Employee.findById(id).populate('connections');
      if (!employee) {
        employee = await Organization.findById(id).populate('connections');
      }
  
      if (!employee) {
        return res.status(404).json({ error: 'Employee or organization not found' });
      }
  
      const connections = employee.connections;
      res.status(200).json({ connections });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

// // Routes
// router.post('/send-request', sendRequest);
// router.post('/accept-request', acceptRequest);
// router.post('/delete-request', deleteRequest);
// router.get('/received-requests/:id', getReceivedRequests);
// router.get('/sent-requests/:id', getSentRequests);

// module.exports = router;
