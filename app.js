const bodyParser = require("body-parser")
, cookieParser = require("cookie-parser")
, express = require("express")
, app = express()
, _port = 3000;

app.use(express.static(__dirname+"/public"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.set('view engine', 'pug');

let toDoList = [ ];

app.get('/', (req, res) => {
  let page = 'form';
  res.render(page, {
    toDosArr: toDoList
  } )
});

let id = 0;
app.post('/form', (req, res)=>{
  if( req.body.toDoText ) {
    let obj = {
      str: req.body.toDoText,
      id: id++
    }
    toDoList.push(obj)
  };
  res.redirect('/')
});

app.post('/edit/:id', (req, res)=>{
  // console.log(req.params);
  // console.log(req.params.id);
  let elem = toDoList.find((el) => {
    return el.id==req.params.id
  })
  console.log(elem);
  console.log('elemmmmmmmmm');
  res.render('edit', {
    obj: elem,
    title: 'edit'
  })

});

app.post('/demo/:id', (req, res)=>{
  console.log('demo00000000000');
  console.log(req.body);
  console.log(req.params.id);
  let elem = toDoList.find((el) => {
    return el.id==req.params.id
  });
  elem.str = req.body.toDoText;
  console.log(elem);
  console.log('saveeeeeeeeeeeee');
  let num = toDoList.indexOf(elem);
  // console.log(num+'num');
  // toDoList.splice(num, 1, req.body);
  res.redirect('/')
});

app.post('/del/:id', (req, res)=>{
  let elem = toDoList.find((el) => {
    return el.id==req.params.id
  })
  console.log('deeeelll');
  console.log(elem);
  let num = toDoList.indexOf(elem);
  console.log(num+'num');
  toDoList.splice(num, 1);
  res.redirect('/')
});

app.listen(_port, () => console.log(`${_port}`));
