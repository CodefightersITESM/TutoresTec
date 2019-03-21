import React from 'react';
import css from './AuthComponent.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import firebase from 'firebase/app';
import 'firebase/auth';
import { withStyles } from '@material-ui/core/styles';
import LoginComponent from '../LoginComponent/LoginComponent.js';
import SignUpComponent from '../SignUpComponent/SignUpComponent.js';


const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
  });

class AuthComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authState: 'login',
            user: null
        }
    }

    handleButtonPress = (state) => {
        this.setState({
            authState: state
        })
    }

    auth = () => {
        if(firebase.auth().currentUser){
            this.setState((prevState) => {
                return {
                    ...prevState,
                    user: firebase.auth().currentUser
                }
            })
            alert("User logged in");
        } else {
            alert("Error signing in");
        }
    }

    render() {
        return (
            <div className={css.AuthComponent}>
                <AppBar position='fixed' color='primary'>
                    <Toolbar />
                </AppBar>
                <div className={css.Container}>
                    <div className={css.left}>
                        <h1>TutoresTEC</h1>
                        <div>
                            <Button onClick={() => this.handleButtonPress('login')} className={this.props.classes.button} color="primary" variant="outlined">Iniciar Sesion</Button>
                            <Button onClick={() => this.handleButtonPress('signup')} color="secondary" variant="outlined">Registrarse</Button>
                        </div>
                    </div>
                    <div className={css.divider}/>
                    <div className={css.right}>
                        <div className={css.rightItem}>
                            {this.state.authState === 'login' ? <LoginComponent auth={this.auth}/> : <SignUpComponent auth={this.auth}/>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(AuthComponent);