import React, { Component } from 'react';
import { getUsers, postKudo } from '../api.js';

const UserSelect = ({ name, value, changeHandler, users }) => (
    <select name={name} className='user-select'
        value={value} onChange={changeHandler}
    >
        <option value='' disabled>Select a user</option>
        {users ? users.map(user => (
            <option value={user._id} key={user._id}>{user.name}</option>
        )) : ''}
    </select>
);

class Header extends Component {
    state = {
        users: null,
        _input_title: '',
        _input_body: '',
        _input_from: '',
        _input_to: ''
    }

    changeHandler = e => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({
            ['_input_' + name]: value
        })
    }

    submitHandler = e => {
        e.preventDefault();
        postKudo({
            title: this.state._input_title,
            body: this.state._input_body,
            from: this.state._input_from,
            to: this.state._input_to
        }, data => {
            console.log(data);
            this.props.refreshKudos();
            this.setState({
                _input_title: '',
                _input_body: ''
            })
        })
    }

    render() {
        if (!this.state.users) {
            getUsers(users => {
                this.setState({ users })
            })
        }
        return (
            <header>
                <h1>Tiny Improvements</h1>
                <div className='kudo-form'>
                    <div className='kudo-users'>
                        <p>Sender:</p>
                        <UserSelect
                            name='from'
                            value={this.state._input_from}
                            changeHandler={this.changeHandler}
                            users={this.state.users}
                        />
                        <p>Receiver:</p>
                        <UserSelect
                            name='to'
                            value={this.state._input_to}
                            changeHandler={this.changeHandler}
                            users={this.state.users}
                        />
                    </div>
                    <div className='kudo-text'>
                        <input type='text' name='title' className='kudo-title' placeholder='Title'
                            value={this.state._input_title} onChange={this.changeHandler}
                        />
                        <textarea type='text' name='body' className='kudo-body' placeholder='Body'
                            value={this.state._input_body} onChange={this.changeHandler}
                        ></textarea>
                    </div>
                    <button className='kudo-submit' onClick={this.submitHandler}>Send Kudos</button>
                </div>
            </header>
        )
    }
}

export default Header;