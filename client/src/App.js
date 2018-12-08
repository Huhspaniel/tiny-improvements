import React, { Component } from 'react';
import './App.scss';
import KudoList from './components/KudoList.js';
import Header from './components/Header.js';
import { getKudos } from './api.js'

class App extends Component {
  state = {
    kudos: null
  }
  refreshKudos = getKudos.bind(null, kudos => {
    this.setState({
      kudos: kudos
    })
  })
  render() {
    if (!this.state.kudos) {
      this.refreshKudos();
    }
    return (
      <div className='root'>
        <Header refreshKudos={this.refreshKudos} />
        {
          this.state.kudos ?
            this.state.kudos[0] ?
              KudoList({ kudos: this.state.kudos })
              : <div style={{ padding: '10px' }}>No kudos have been given :(</div>
            : ''
        }
      </div>
    );
  }
}

export default App;
