import React from 'react';
import Header from './Components/Header';
import Main from './Components/Main/main';
import Features from './Components/Features/features';
import Footer from './Components/Footer/footer';

import FetchData from './service/FetchData'

import './style.css';




class App extends React.Component {
  
  fetchData = new FetchData();

  state = {
    rocket: 'Falcon 1',
    rocketFeatures: null,
    rockets: [],
  };
  
  componentDidMount() {
    this.updateRocket();
  }

  updateRocket() {

    this.fetchData.getRocket()
      .then(data => {
        this.setState({ rockets: data.map(item => item.name) })
        return data;
      })
      .then(data => data.find(item => item.name === this.state.rocket))
      .then(rocketFeatures => this.setState({ rocketFeatures }));

  }

  changeRocket = rocket => {
    this.setState({
      rocket
    }, this.updateRocket());
  }

  render () {
    console.log(this.state);
    return (
      <>
        <Header rockets={this.state.rockets} changeRocket={this.changeRocket}/>
        <Main rocket={this.state.rocket}/>
        <Features />
        <Footer />
        
      </>
    );

  }
}

export default App;
