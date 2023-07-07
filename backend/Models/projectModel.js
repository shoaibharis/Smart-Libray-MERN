const mongoose=require("mongoose")

const ProjectSchema = new mongoose.Schema({
    title: String,
    description: String,
    tasks: [{
      task: String,
    }],
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'employee',
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'organization',
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'jobs',
    },
    progress:{
        type:Number,
        default:0
    },
    finishedTasks: [String] 

  });
  
  module.exports= mongoose.model('Project', ProjectSchema);