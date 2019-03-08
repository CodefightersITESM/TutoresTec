import React, { Component } from 'react';
import firebase from 'firebase/app';
import css from './LoginComponent.css';
import 'firebase/auth';

class LoginComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        })
    }

    handleLogin = () => {
        const auth = firebase.auth();
        auth.signInWithEmailAndPassword(this.state.email, this.state.password).then((response) => {
          this.props.auth();
        }).catch((error) => {
          alert(error);
        });
    }

    render () {
        return (
            <div className={css.AuthContainer}>
                <h1>Iniciar Sesión</h1>
                <input placeholder="Correo" name="email" className={css.AuthComponent} onChange={this.handleChange} value={this.state.email}/>
                <input placeholder="Contraseña" name="password" type="password" className={css.AuthComponent} onChange={this.handleChange} value={this.state.password}/>
                <button onClick={this.handleLogin}>Ingresar</button>
            </div>
        )
    }
}

export default LoginComponent;