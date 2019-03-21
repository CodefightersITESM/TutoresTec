import React, { Component } from 'react';
import firebase from 'firebase/app';
import css from './SignUpComponent.css';
import 'firebase/auth';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
        alert(this.state.username);
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
        console.log(e.target.value);
        this.setState({
          [e.target.name]: e.target.value
        })
    }

    render () {
        return (
           <Card className={css.Container} elevation={1} style={{backgroundColor: '#fcfcfc'}}>
                <h3>Registro</h3>
                <TextField className={css.textbox} label='Nombre' name='username' variant='outlined' onChange={this.handleChange} value={this.state.username}/>
                <TextField className={css.textbox} label='Correo' name='email' variant='outlined' onChange={this.handleChange}/>
                <TextField className={css.textbox} label='Contraseña' name='password' type='password' variant='outlined' onChange={this.handleChange}/>
                <TextField className={css.textbox} label='Confirm Password' name='confirmPassword' type='password' variant='outlined' onChange={this.handleChange}/>

                <Button onClick={this.handleSignUp} className={css.button} variant='outlined' color='primary'>Registrarse</Button>
            </Card>
        )
    }

}

export default SignUpComponent;