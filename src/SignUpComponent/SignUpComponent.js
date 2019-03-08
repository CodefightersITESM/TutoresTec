import React, { Component } from 'react';
import firebase from 'firebase/app';
import css from './SignUpComponent.css';
import 'firebase/auth';

class SignUpComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        }

    }

    handleSignUp = () => {
        const auth = firebase.auth();
        const database = firebase.database();
        auth.createUserWithEmailAndPassword(this.state.email, this.state.password).then((response) => {
          const user = response.user;
          database.ref(`Usuarios/${user.uid}`).set({
            username:this.state.username,
            email: user.email
          });
          this.props.auth();
        }).catch((error) => {
          alert(error);
        }).then(() => {
        });
    }

    handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        })
    }

    render () {
        return (
            <div className={css.AuthContainer}>
                <h1>Registro</h1>
                <input placeholder="Nombre" name="username" className={css.AuthComponent} onChange={this.handleChange} value={this.state.username}/>
                <input placeholder="Correo" name="email" className={css.AuthComponent} onChange={this.handleChange} value={this.state.email}/>
                <input placeholder="Contraseña" name="password" type="password" className={css.AuthComponent} onChange={this.handleChange} value={this.state.password}/>
                <input placeholder="Confirmar Contraseña" name="confirmPassword" type="password" className={css.AuthComponent} onChange={this.handleChange} value={this.state.confirmPassword}/>
                <form>
                    <input type="radio" name="type" value="estudiante" />Estudiante
                    <input type="radio" name="type" value="tutor" />Tutor
                </form>
                <button onClick={this.handleSignUp}>Crear</button>
            </div>
        )
    }

}

export default SignUpComponent;