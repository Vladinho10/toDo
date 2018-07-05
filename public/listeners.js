'use strict';

function render(App, props) {
  const app = new App(props);
  root.innerHTML = app.render();
};

class Component {
  constructor(props) {
    this.props = props
  }
};
