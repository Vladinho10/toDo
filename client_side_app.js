const bodyParser = require("body-parser")
, express = require("express")
, app = express()
, mongoose = require("mongoose")
, Schema = mongoose.Schema
, Task = require('./taskSchema')
, _port = 3000
, _urlDB = "mongodb://localhost:27017/toDo"
, db = mongoose.connection;

mongoose.connect(_urlDB, { useNewUrlParser: true });
db.once("open", function () {
    console.log("you connected");
});

app.use(express.static(__dirname+"/public"));
app.use(express.static(__dirname+"/views"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.set('view engine', 'html');

let toDoList = [ ];

app.get('/', (req, res) => {
  res.sendFile('/index.html')
});

app.get('/api/todos', (req, res) => {
  Task.getAllData(res);
});

app.post('/api/todos', (req, res)=>{
  Task.insertTask({toDo: req.body.toDo}, res);
});

app.put('/api/todos/:id', (req, res)=>{
  // console.log( 'reqbody', req.body);
  Task.getByIdAndUpdate(req.params.id, req.body.toDo, res);
});

app.delete('/api/todos/:id', (req, res)=>{
  Task.getByIdAndDelete(req.params.id, res);
});

app.listen(_port, () => console.log(`${_port}`));
