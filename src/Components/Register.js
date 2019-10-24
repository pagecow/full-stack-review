import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {updateUser} from '../redux/reducer';
import {connect} from 'react-redux';

class Register extends Component {
    constructor(){
        super();

        this.state = {
            email: '',
            password: ''
        }
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleRegister = () => {
        axios
            .post('/auth/register', {email: this.state.email, password: this.state.password})
            .then(res => {
                this.setState({
                    email: '',
                    password: ''
                })

                this.props.updateUser(res.data);
                this.props.history.push('/account')
            })
            .catch(err => console.log(err))
    }

    render(){
        return(
            <div>
                <h1>Register Here</h1>
                <input
                    value={this.state.email}
                    name='email'
                    onChange={(e) => this.handleInput(e)}/>
                <input
                    type='password'
                    value={this.state.password}
                    name='password'
                    onChange={(e) => this.handleInput(e)}/>
                <button onClick={this.handleRegister}>Register</button>
                <Link to='/account'>My Account</Link>
            </div>
        )
    }
}

const mapDispatchToProps = {
    updateUser
}

export default connect(null, mapDispatchToProps)(Register);