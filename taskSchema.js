const mongoose = require('mongoose')
, Schema = mongoose.Schema
, taskScheme = new Schema({
  // _id: Schema.Types.ObjectId,
  title: String,
  text: String,
  completed: Boolean,
  createdDate: { type: Date, default: Date.now },
  updated: Boolean
}, {
  versionKey:false
});


taskScheme.statics.insertTask = function (taskData) {
  let task = new this(taskData);
  return task.save();
}




taskScheme.statics.getTasksAndUpdateComplete = function () {
  return this.find({}, (err, tasks) => {
          if(err) console.log(err);
          for(let i = 0; i < tasks.length; i++){
             tasks[i].completed = false;
             tasks[i].save()
          };
        })
}

taskScheme.statics.getTasksAndDeleteComplete = function () {
// Task.find({completed: true}).remove().exec();
  return this.find({completed: true}).remove().exec((err, result) => {
    console.log(result);
  });
}

// Task.find({completed: false}, {createdDate: 1, completed: 1, _id: 0}).sort({createdDate: -1}).exec((err, docs) => {
//   if(err) console.log(err);
//   console.log(docs);
// });

taskScheme.statics.getTasksSortedByDate = function () {
  return this.find({completed: false}, {createdDate: 1, completed: 1, _id: 0}).sort({createdDate: -1}).exec((err, docs) => {
    if(err) console.log(err);
    console.log(docs);
  });
}
































module.exports = mongoose.model("Task", taskScheme);
