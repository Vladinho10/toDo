const mongoose = require('mongoose')
, Schema = mongoose.Schema
, taskScheme = new Schema({
  toDo: String,
}, {
  versionKey:false
});

taskScheme.statics.insertTask = function (taskData, res) {
  let task = new this(taskData);
  console.log('task: ', task);
  task.save().then(() => {
    this.getAllData(res)
  });
}

taskScheme.statics.getAllData = function (res) {
  this.find({}).then((dataArr) => {
    res.json(dataArr);
  })
}

taskScheme.statics.getByIdAndUpdate = function (id, newToDo, res) {
   this.findByIdAndUpdate(id, {toDo: newToDo}, () => {
     this.getAllData(res)
   });
   ;
}

taskScheme.statics.getByIdAndDelete = function (id, res) {
   this.findByIdAndRemove(id, () => {
     this.getAllData(res)
   });
   ;
}

module.exports = mongoose.model("Task", taskScheme);
