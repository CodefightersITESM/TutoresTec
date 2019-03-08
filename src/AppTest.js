import React, { Component } from 'react';
import css from './App.css';
import firebase from 'firebase/app';
import 'firebase/auth';
import LoginComponent from './LoginComponent/LoginComponent';
import SignUpComponent from './SignUpComponent/SignUpComponent';
import Dashboard from './Dashboard/Dashboard';
import Button from '@material-ui/core/Button';

import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

class AppTest extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoggingIn: false,
            isSigningUp: false,
            user: null
        }
    }

    componentDidMount () {
        if(firebase.auth().currentUser){
            this.setState(prevState => {
                return {
                    ...prevState,
                    user: firebase.auth().currentUser
                }
            })
        } else {
            console.log("User not logged in");
        }
    }

    auth = () => {
        if(firebase.auth().currentUser){
            this.setState((prevState) => {
                return {
                    ...prevState,
                    user: firebase.auth().currentUser
                }
            })
        } else {
            alert("Error signing in");
        }
    }

    handleLoginPress = () => {
        this.setState((prevState) => {
            return {
                ...prevState,
                isSigningUp: false,
                isLoggingIn: true
            }
        });
    }

    handleSignUpPress = () => {
        this.setState((prevState) => {
            return {
                ...prevState,
                isSigningUp: true,
                isLoggingIn: false
            }
        });
    }
    
    render() {


        let content = null;

        if(this.state.user){
            content = <Dashboard user={this.state.user}/>
        } else {
            let authComponent = null;
            if(this.state.isLoggingIn){
                authComponent = <LoginComponent auth={this.auth}/>
            } else if(this.state.isSigningUp){
                authComponent = <SignUpComponent auth={this.auth}/>
            }
            content = authComponent;
        }
        return (
        <div className={css.App}>
            <h1>Tutores Tec</h1>
            <div className={css.test}>
                <Button variant='outlined' color='primary' onClick={this.handleLoginPress}>Iniciar Sesion</Button>
                <Button variant='outlined' color='secondary' onClick={this.handleSignUpPress}>Registrarse</Button>
            </div>
            {content}
        </div>
        );
    }
}

export default AppTest;
