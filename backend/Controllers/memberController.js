const member=require("../Models/Users/memberModel");
const cloudinary=require("cloudinary")
const catchAsyncErrors=require("../Middlewares/catchAsyncErrors")
const ErrorHandler=require("../Utils/errorHandler");
const sendToken=require("../Utils/jwtToken")
const crypto=require("crypto")
const sendEmail=require("../Utils/sendEmail");
const admin=require("../Models/Users/adminModel")


exports.registermember = catchAsyncErrors(async (req, res, next) => {

  // Extract member information from request body
  const {
    firstName,
    lastName,
   email,
    password
  } = req.body;
  
  // Create a new member in the database
  const user = await member.create({
    firstName,
    lastName,
   email,
    password
  });

  if (!user) {
    return next(new ErrorHandler(400, 'User already registered'));
  }
  
  // Send token to the client
  sendToken(user, 200, res);
});


exports.loginUser=catchAsyncErrors(async(req,res,next)=>{
  const{email,password}=req.body;
  //
  if(!email || !password){
    return next(new ErrorHandler("Please Enter email and password",400))
  }
  const user=await member.findOne({email}).select("+password");
  if(!user){
    return next(new ErrorHandler("Invalid email or password",401));
  }
  const isPasswordMatched=await user.comparePassword(password);

//   isPasswordMatched.then(function(result){
//    if(!result){
//     return next(new ErrorHandler("Invalid Email or Password",401)) ;
//    }
//   else{
//     sendToken(user,200,res);
//   }
// })    

   if(!isPasswordMatched){
     return next(new ErrorHandler("Invalid Email or Password",401))  
 }
   
 sendToken(user,200,res);
  
})

//logout
exports.logout=catchAsyncErrors(async(req,res,next)=>{
  
  res.cookie("token",null,{
    expires:new Date(Date.now()),
    httpOnly:true,
  })
    res.status(200).json({
      success:true,
      message:"Logged Out"
    })
  })

  //Forget Password
exports.forgetPassword=catchAsyncErrors(async(req,res,next)=>{
  const user=await member.findOne({email:req.body.email})
 
  if(!user){
    return next(new ErrorHandler("user not found",400));
  }
  
  const resetToken = user.getResetPasswordToken();
 
  await user.save({validateBeforeSave: false});

  const resetPasswordUrl= `${req.protocol}://${req.get("host")}/api/v2/password/reset/${resetToken}`

const message= `Your password reset Token is: \n\n  ${resetPasswordUrl} \n\n  if you have not requested this then ignore it`;

 try{
    await sendEmail({
     email:user.email,
     subject:`Saleable Password Recovery`,
     message,
    
    })
    res.status(200).json({
      success:true,
      message:`Email sent to ${user.email} sucessfully`
    })
   
} catch(error){
  user.resetPasswordToken=undefined;
  user.resetPasswordExpire=undefined;
  await user.save({validateBeforeSave:false});
  return next(new ErrorHandler(error.message,500))

}})

//Reset Password
exports.resetPassword=catchAsyncErrors(async(req,res,next)=>{

//creating has
  const resetPasswordToken=crypto
  .createHash("sha256")
  .update(req.params.token)
  .digest("hex")
  
  const user=await member.findOne({
    resetPasswordToken,
    resetPasswordExpire:{$gt:Date.now()},
  });
  if(!user){
    return next(new ErrorHandler("Reset Password Token is invalid or expired",400));
  }
  
  if(req.body.password!==req.body.confirmPassword){
    return next(new ErrorHandler("Password Does not Match",400))
  }

    user.password=req.body.password;
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;
    await user.save();
    sendToken(user,200,res);
})
  
exports.getProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await member
  .findById(req.params.id)
  .populate({
    path: "borrowedBooks",
    populate: {
      path: "book",
    },
  })
  
  if (!user) {
    // User not found in member collection, look in organization collection
    try {
      const admin = await admin.findById(req.params.id)
      
      if (admin) {
        res.status(200).json({
          success: true,
          user: admin,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "User not found",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  } else {
    // User found in member collection
    res.status(200).json({
      success: true,
      user,
    });
  }
});


exports.getAllmembers=async (req,res,next)=>{
  const members=member.find();
  if(members){
    res.status(200).json({
      sucess:true,
      members
    })
  }
  else{
    res.staus(404).json({
      success:false,
      message:"no member found"
    })
  }
}

exports.updateMember=async(req,res,next)=>{
  try {
    const memberId = req.params.id;
    const updatedMemberData = req.body;
console.log(req.params.id)
console.log(req.body)
    const updatedMember = await member.findByIdAndUpdate(memberId, updatedMemberData, { new: true });

    if (!updatedMember) {
      return res.status(404).json({ error: 'Member not found' });
    }

    res.json({
      updatedMember,
      message:"Updated Successfully"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

  }


  exports.deletemember=async (req,res)=>{
    try {
      const memberId = req.params.id;
  
      const deletedMember = await member.findByIdAndDelete(memberId);
  
      if (!deletedMember) {
        return res.status(404).json({ error: 'Member not found' });
      }
  
      res.json({ message: 'Member deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }