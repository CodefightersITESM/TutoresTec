import React, { Component } from 'react';
import firebase from 'firebase/app';
import css from './LoginComponent.css';
import 'firebase/auth';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
            // <div className={css.AuthContainer}>
            //     <h1>Iniciar Sesión</h1>
            //     <input placeholder="Correo" name="email" className={css.AuthComponent} onChange={this.handleChange} value={this.state.email}/>
            //     <input placeholder="Contraseña" name="password" type="password" className={css.AuthComponent} onChange={this.handleChange} value={this.state.password}/>
            //     <button onClick={this.handleLogin}>Ingresar</button>
            // </div>
            <Card className={css.Container} elevation={1} style={{backgroundColor: '#fcfcfc'}}>
                    <h3>Iniciar Sesión</h3>
                    <TextField className={css.textbox} label='Correo' name='email' type='email' variant='outlined' onChange={this.handleChange} value={this.state.email}/>
                    <TextField className={css.textbox} label='Contraseña' name='password' type='password' variant='outlined' onChange={this.handleChange} value={this.state.password}/>
                    <Button onClick={this.handleLogin} className={css.button} variant='outlined' color='primary'>Confirmar</Button>
            </Card>
        )
    }
}

export default LoginComponent;