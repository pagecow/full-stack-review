import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {updateUser} from '../redux/reducer';

class Landing extends Component {
    constructor(){
        super();

        this.state = {
            email: '',
            password: ''
        }
    }
    
    componentDidMount(){
        
    }

    handleLogin = () => {
        axios
            .post('auth/login', {email: this.state.email, password: this.state.password})
            .then(res => {
                this.setState({
                    email: '',
                    password: ''
                })
                
                this.props.updateUser(res.data)
                this.props.history.push('/account')
                
            })
            .catch(err => console.log(err))
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render(){
        console.log(this.props)
        return(
            <div>
                <h1>Login Here</h1>
                <input
                    value={this.state.email}
                    name='email'
                    onChange={(e) => this.handleInput(e)}/>
                <input
                    type="password"
                    value={this.state.password}
                    name='password'
                    onChange={(e) => this.handleInput(e)}/>
                <button onClick={this.handleLogin}>Login</button>
                <Link to='/register'>Register</Link>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    const {user} = reduxState;
    return {
        user
    }
}

const mapDispatchToProps = {
    updateUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing)