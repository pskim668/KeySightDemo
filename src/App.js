import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const ICONS = {
  'add': '\u{002B}',
  'subtract': '\u{2212}',
  'max': '\u{004D}',
  'min': '\u{006D}',
  'fibonacci': '\u{0192}',
  'mystery': '\u{003F}'
}

// Function class
class Function extends React.Component {
  constructor(props) {
    super(props)

    // Bind handlers
    this.handleDragStart = this.handleDragStart.bind(this);
  }
  handleDragStart(event) {
    // Transfer data
    event.dataTransfer.setData("icon", this.props.icon);
    event.dataTransfer.setData("argNum", this.props.argNum);
  }
  render() {
    const unicodeIcon = ICONS[this.props.icon];
    return (
      <div className={this.props.className} draggable="true" onDragStart={this.handleDragStart}>
        {this.props.className} {unicodeIcon}
      </div>
    );
  }
}

// Function container class
class FunctionContainer extends React.Component {
  constructor() {
    super();
    
    // Declare initial state
    this.state = {
      icons: [],
      args: []
    };
    
    // Bind handlers
    this.handleDrop = this.handleDrop.bind(this);
    this.allowDrop = this.allowDrop.bind(this);
    this.resetContainer = this.resetContainer.bind(this);
  }
  handleDrop(event) {
    // Receive data
    const iconData = event.dataTransfer.getData("icon");
    const argsData = event.dataTransfer.getData("argNum");
    
    // Only allow one function to be in the function container at a time
    if((this.state.icons.length === 0) && (this.state.args.length === 0)) {
      // Push icons to the icon array
      const newIcons = this.state.icons.slice();
      newIcons.push(ICONS[iconData]);
      this.setState({
        icons: newIcons 
      });
      // Push number of arguments to args array
      const newArgs = this.state.args.slice();
      var i = argsData;
      while(i > 1) {
        newArgs.push(i);
        i--;
      }
      newArgs.push(argsData);
      this.setState({
        args: newArgs 
      });
    }
  }
  allowDrop(event) {
    event.preventDefault();
  }
  resetContainer() {
    // Reset state back to original
    this.setState({icons:[], args:[]})
  }
  render() {
    const iconsToRender = this.state.icons.map((icon, idx) => (
      <div key={idx}>
        <div className='icon'>{icon}</div>
      </div>
    ));
    const argsToRender = this.state.args.map((argNum, idx) => (
      <div key={idx}>
        <div className='argContainer'></div>
      </div>
    ));
    return (
      <div className="drag-container" onDrop={this.handleDrop} onDragOver={this.allowDrop}>
      <button className="resetButton" onClick={this.resetContainer}>Reset</button>
        <div className="drag-area">
          {iconsToRender} {argsToRender}
        </div>
      </div>
    )
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">KeySight Demo Application</h1>
        </header>
        <p className="App-intro">
          Drag and drop a function into the container to begin.
        </p>
        <div className="FunctionContainer"><FunctionContainer /></div>
        <div class="flex-container">
          <Function className="Add" icon={'add'} argNum={2} />
          <Function className="Subtract" icon={'subtract'} argNum={2} />
          <Function className="Max" icon={'max'} argNum={2} />
          <Function className="Min" icon={'min'} argNum={2} />
          <Function className="Fibonacci" icon={'fibonacci'} argNum={1} />
          <Function className="Mystery" icon={'mystery'} argNum={5} />
        </div>
      </div>
    );
  }
}

export default App;
