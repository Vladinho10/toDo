'use strict';

class CreateToDo extends Component {
  constructor(props) {
    super(props);
    window.addButtonClickedHandler = this.addButtonClickedHandler
  }
  addButtonClickedHandler() {
    const data = {
      toDo: inp.value,
    }
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
            console.log(`clientArr from Add`, clientArr);
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
  editHandler(elId){
    const tempId = document.getElementById(elId);
    console.log(tempId.value);

    const data = {
      toDo: tempId.value,
      id: elId
    };
    console.log('edited data', data);
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
          console.log('clientArr', clientArr);
    });
}
    deleteHandler(elId){
      const data = {
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
            // console.log(clientArr);
      });

  }
  render() {

    const {title} = this.props;
    const items = title.map((el, i, arr)=>{

        return  `<li> <input id=${el._id} value=${el.toDo}>
                    <button onclick="editHandler('${el._id}')"> edit/save </button>
                    <button onclick="deleteHandler('${el._id}')"> delete </button>
                </li>`

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
