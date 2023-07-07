const employee=require("../Models/Users/employeeModel");
const cloudinary=require("cloudinary")
const catchAsyncErrors=require("../Middlewares/catchAsyncErrors")
const ErrorHandler=require("../Utils/errorHandler");
const sendToken=require("../Utils/jwtToken")
const crypto=require("crypto")
const sendEmail=require("../Utils/sendEmail");
const organization=require("../Models/Users/organizationModel")


exports.registerEmployee = catchAsyncErrors(async (req, res, next) => {
  // Upload avatar image to Cloudinary

  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: 'avatars',
    width: 150,
    crop: 'scale'
  });

  // Extract employee information from request body
  const {
    firstName,
    lastName,
    phone,
    email,
    institute,
    degree,
    session,
    expertise,
    bio,
    github,
    twitter,
    instagram,
    password
  } = req.body;
  
  // Create a new employee in the database
  const user = await employee.create({
    firstName,
    lastName,
    phone,
    email,
    education: {
      institute,
      degree,
      session
    },
    expertise,
    bio,
    github,
    twitter,
    instagram,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url
    }
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
  const user=await employee.findOne({email}).select("+password");
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
  const user=await employee.findOne({email:req.body.email})
 
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
  
  const user=await employee.findOne({
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
  const user = await employee
  .findById(req.params.id)
  .populate({
    path: "enrolledJobs",
    populate: {
      path: "organization",
    },
  })
  .populate({
    path: "appliedJobs",
    populate: {
      path: "organization",
    },
  })
  .populate("recievedRequests").populate("sentRequests").populate("connections")
  
  
  if (!user) {
    // User not found in employee collection, look in organization collection
    try {
      const organizationUser = await organization.findById(req.params.id)
      .populate({
        path: 'jobs',
        populate: [
          {
            path: 'applications',
            model: 'employee'
          },
          {
            path: 'enrolledEmployees',
            model: 'employee'
          },
        ]
      }).populate("sentRequests").populate("connections").populate("recievedRequests")
      .exec();
      if (organizationUser) {
        res.status(200).json({
          success: true,
          user: organizationUser,
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
    // User found in employee collection
    res.status(200).json({
      success: true,
      user,
    });
  }
});


exports.getAllEmployees=async (req,res,next)=>{
  const employees=employee.find();
  if(employees){
    res.status(200).json({
      sucess:true,
      employees
    })
  }
  else{
    res.staus(404).json({
      success:false,
      message:"no employee found"
    })
  }
}

exports.updateEmployee=async(req,res,next)=>{

 try{
  if(req.body.avatar){
  const myCloud=await cloudinary.v2.uploader.upload(req.body.avatar,{
    folder:"avatars",
    width:150,
    crop:"scale"
  })
}
const {firstName,lastName,email,password}=req.body
const emp=await employee.findById(req.params.id);

if(emp){
  emp.firstName=firstName || emp.firstName;
  emp.lastName=lastName || emp.lastName;
  emp.email=email || emp.email;
  emp.password=password ||emp.password;
  emp.avatar={
    public_id:myCloud.public_id,
    url:myCloud.secure_url
  } || emp.avatar

  const updatedEmp=await emp.save();}

  else{
    res.status(404).json({ message: 'employee not found' });
  }}
  catch(error){
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
  }

  exports.deleteEmployee=async(req,res,next)=>{
    try{
    const emp=await employee.findById(req.params.id);

    if(emp){
     await emp.remove();
     res.status(200).json({message:"employee removed"})
    }
    else{
      res.status(400).json({message:"employee not found"})
    }}
    catch(error){
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }

  }