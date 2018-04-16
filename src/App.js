import React, { Component } from 'react';
import styles from './App.css';
import CSSModules from 'react-css-modules';

class App extends Component {
  render() {
    return (
      <div styleName="App">
        hello vw-layout
      </div>
    );
  }
}

export default CSSModules(App, styles);
