import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    fetch('/express_backend').then(res => {
      if (res.status !== 200) {
        return console.log('Problem connecting to server');
      }
      return res
        .json()
        .then(data => this.setState({ data: data.express }));
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
          <p>This is the data: {this.state.data}</p>
        </header>
      </div>
    );
  }
}

export default App;
