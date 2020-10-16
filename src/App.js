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
    company: null,
  };
  
  componentDidMount() {
    this.updateRocket();
    this.updateCompany();
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

  updateCompany = () => {
    this.fetchData.getCompany()
      .then(data => this.setState({company: data}));  
  }

  render () {
    
    return (
      <>
        <Header rockets={this.state.rockets} changeRocket={this.changeRocket}/>
        <Main rocket={this.state.rocket}/>
        {this.state.rocketFeatures && <Features {...this.state.rocketFeatures}/>} {/* ... спред оператор */}
        {this.state.company && <Footer {...this.state.company.links}  />}
        
      </>
    );

  }
}

export default App;
