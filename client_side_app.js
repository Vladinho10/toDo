const bodyParser = require("body-parser")
, express = require("express")
, app = express()
, _port = 3000;

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
  res.json(toDoList)
});

app.post('/api/todos', (req, res)=>{
  toDoList.push(req.body);
  res.json(toDoList)
});

app.put('/api/todos/:id', (req, res)=>{
  let idNumber = req.params.id;
  // console.log(idNumber);
  // console.log( 'reqbody', req.body);
  let elem = toDoList.find((el) => {
    return el.id==req.params.id
  });
  // console.log('elem befor',elem);
  // console.log('befor', toDoList);
  toDoList[idNumber].toDo = req.body.toDo;
  // elem.toDo = req.body.toDoText;
  // console.log('elem',elem);
  // console.log('after', toDoList);

  // console.log('saveeeeeeeeeeeee');
  // let num = toDoList.indexOf(elem);
  res.json(toDoList)

});

app.delete('/api/todos/:id', (req, res)=>{
  let idNumber = req.params.id;
  let elem = toDoList.find((el) => {
    return el.id==req.params.id
  });
  toDoList.splice(idNumber, 1);
  res.json(toDoList)

});

app.listen(_port, () => console.log(`${_port}`));
