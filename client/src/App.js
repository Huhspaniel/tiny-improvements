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
    console.log(kudos[0]);
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
        {this.state.kudos && this.state.kudos[0] ?
          KudoList({ kudos: this.state.kudos })
          : <div style={{ padding: '10px' }}>No kudos have been given :(</div>}
      </div>
    );
  }
}

// const DOM = {
//   kudoTitle: document.querySelector('.kudo-title'),
//   kudoBody: document.querySelector('.kudo-body'),
//   kudoSubmit: document.querySelector('.kudo-submit'),
//   kudoTo: document.querySelector('.kudo-to'),
//   kudoFrom: document.querySelector('.kudo-from'),
//   kudoList: document.querySelector('.kudo-list')
// }

// function getKudoInput() {
//   return {
//     title: DOM.kudoTitle.value,
//     body: DOM.kudoBody.value,
//     to: DOM.kudoTo.value,
//     from: DOM.kudoFrom.value
//   };
// }
// function clearKudoInput() {
//   DOM.kudoTitle.value = '';
//   DOM.kudoBody.value = '';
// }
// function clearKudos() {
//   DOM.kudoList.innerHTML = '';
// }
// function clear() {
//   clearKudoInput();
//   clearKudos();
// }

// function renderKudos(kudos) {
//   if (!kudos[0]) return DOM.kudoList.innerHTML = '<div style=padding:10px>No kudos have been given :(</div>';
//   kudos.forEach(props => {
//     DOM.kudoList.innerHTML += Kudo(props);
//   })
// }
// function renderUserSelects(users) {
//   let user;
//   users.forEach(({ _id, name }) => {
//     user = `<option value="${_id}">${name}</option>`;
//     DOM.kudoFrom.innerHTML += user;
//     DOM.kudoTo.innerHTML += user;
//   });
// }

// getKudos(renderKudos);
// getUsers(renderUserSelects);

// document.querySelector('.kudo-submit').addEventListener('click', e => {
//   e.preventDefault();
//   const kudo = getKudoInput();
//   if (kudo) {
//     postKudo(kudo, data => {
//       if (!data.errors) getKudos(kudos => {
//         clear();
//         renderKudos(kudos);
//       })
//       else {
//         console.log(data);
//       }
//     });
//   }
// });


export default App;
