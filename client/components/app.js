import React from 'react';
import NavigationBar from './navigationBar';
import Footer from './footer';

class App extends React.Component {
  render() {
    return (
      <div id="wrap">
        <NavigationBar />
        { this.props.children }
        <Footer />
      </div>
    );
  }
}

export default App;