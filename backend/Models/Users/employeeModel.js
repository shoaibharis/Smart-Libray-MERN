const mongoose=require("mongoose")
const validator=require("validator");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const crypto=require("crypto")

const employeeSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,"First name is required"],
        maxLength:[40,"Name cannot exceed 40 Characters"],
        minLength:[1,"Name should have more than 4 characters"]
    },
    lastName:{
        type:String,
        required:[true,"last name is required"],
        maxLength:[40,"Name cannot exceed 40 Characters"],
        minLength:[1,"Name should have more than 4 characters"]
    },
    phone:{
        type:String,
        required:[true,"Phone is Required"]
    },
    
education: {   
    degree :{
    type:String,
   
},
institute:{
     type:String,
     
},
session:{
    type:String,
    
}},
    
expertise:{
    type: String,
},

bio:{
    type: String,
},
github:{
    type: String,
},
twitter:{
    type: String,
},
instagram:{
    type: String,
},
     email:{
        type:String,
        required:[true,"Please enter your email"],
        unique:true,
        validate:[validator.isEmail,"Please enter a valid email"]
     },

    password:{
        type:String,
        required:[true,"Please enter your password"],
        minLength:[8,"Password should be greater than 8"],
        select:false
    },
    avatar:{
            
             public_id:{
             type:String,
             required:true
         },
         url:{
             type:String,
             required:true
         }                
    },
    role:{
        type:String,
        default:"employee"
    },

    status:{
        type:String,
        default :"Available"
    },

    enrolledJobs:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"jobs"
    }],
    appliedJobs:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"jobs"
    }],
    recievedRequests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "organization"}],
    //   }, {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "organization"
    //   }],
      sentRequests: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "employee"
    //   }, {
        type: mongoose.Schema.Types.ObjectId,
        ref: "organization"
      }],
      connections: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "employee"
    //   }, {
        type: mongoose.Schema.Types.ObjectId,
        ref: "organization"
      }],
      projects:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Project"
      }],
      notifications:[{
        type:String
      }],

    resetPasswordToken:String,
    resetPasswordExpire:Date,
});

employeeSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next() 
    }
this.password=await bcrypt.hash(this.password,10)
})

employeeSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    })
}

employeeSchema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

//password reset
employeeSchema.methods.getResetPasswordToken=function(){
    //generating token
    const resetToken=crypto.randomBytes(20).toString("hex")
    
    //hashing and adding resetPasswordToken to Schema
    this.resetPasswordToken=crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex")
    
      this.resetPasswordExpire = Date.now()+15*60*1000;
      return resetToken;
    
    }

module.exports=mongoose.model("employee",employeeSchema);