'use strict';

class CreateToDo extends Component {
  constructor(props) {
    super(props);
    window.addButtonClickedHandler = this.addButtonClickedHandler
  }
  addButtonClickedHandler() {
    const data = {
      toDo: inp.value,
      // id: id
    }
    // id++;
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {  'Content-Type': 'application/json' }
    }
    if( inp.value ) {
      const f = fetch('/api/todos', options);
      f.then((res)=>{
        return  res.json();
      }).then((toDosArr)=>{
            clientArr = toDosArr;
            render(App, {
              title: toDosArr
            });
            console.log(clientArr);
      });
    }
  }
  render() {
    // const {title} = this.props; //this.props.title
    return (`
            <label for='inp'>to do</label>
            <input id='inp'>
            <button id='addBtnid' onclick='addButtonClickedHandler()'>add</button>
            `) // onclick='addButtonClickedHandler()'
  }
};

class OrderList extends Component {
  constructor(props) {
    super(props);
    window.editHandler = this.editHandler;
    window.deleteHandler = this.deleteHandler
  }
  editHandler(elId, editValue){
    const data = {
      toDo: editValue,
      id: elId
    };
    console.log(data);
    const options = {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const f = fetch(`/api/todos/${elId}`, options);
    f.then((res)=>{
      return  res.json();
    }).then((toDosArr)=>{
          clientArr = toDosArr;
          render(App, {
            title: toDosArr
          });
          console.log(clientArr);
    });
}
    deleteHandler(elId){
      const data = {
        // toDo: deleteValue,
        id: elId
      };
      console.log(data);
      const options = {
        method: 'DELETE',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const f =  fetch(`/api/todos/${elId}`, options);
      f.then((res)=>{
        return  res.json();
      }).then((toDosArr)=>{
            clientArr = toDosArr;
            render(App, {
              title: toDosArr
            });
            console.log(clientArr);
      });

  }
  render() {

    const {title} = this.props;
    const items = title.map((el, i, arr)=>{

        return  `<li> <input id='id${el.id}mtom' value='${el.toDo}'>
                    <button id='edit${el.id}' onclick='editHandler(${el.id}, id${el.id}mtom.value)' > edit/save </button>
                    <button id='del${el.id}' onclick='deleteHandler(${el.id})'> delete </button>
                </li>`                              // id${el.id}mtom.value
    });
    return (`
            <ol id='ol'>${items.join('')}</ol>
          `)
  }
};

class App extends Component {
  constructor(props) {
      super(props);
  }
  render() {
    const createtodo = new CreateToDo(this.props);
    const orderList = new OrderList(this.props);
    return createtodo.render() + orderList.render()
  }
}

// let id = 0;
let clientArr = [];

render(App, {
  title: []
});

fetch('/api/todos', {
  headers: {
    'Content-Type': 'application/json'
  }
}).then((res)=>{
  return  res.json();
}).then((toDosArr)=>{
      render(App, {
        title: toDosArr
      });
});
