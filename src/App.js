import React, { Component } from 'react';
import css from './App.css';
import firebase from 'firebase/app';
import 'firebase/auth';
import LoginComponent from './LoginComponent/LoginComponent';
import SignUpComponent from './SignUpComponent/SignUpComponent';
import Dashboard from './Dashboard/Dashboard';
import AuthComponent from './AuthComponent/AuthComponent.js';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';



import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

const styles = theme => ({
    root: {
      width: '100%',
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing.unit,
        width: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing.unit * 9,
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
      width: '100%',
    },
    inputInput: {
      paddingTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 10,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 120,
        '&:focus': {
          width: 200,
        },
      },
    },
  });

class App extends Component {

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
    
    render() {
        
        let appContent = null;
        let appBarContent = (
            <Toolbar>
                <IconButton className={this.props.classes.menuButton} color="inherit" aria-label="Open drawer">
                    <MenuIcon />
                </IconButton>
                <Typography className={this.props.classes.title} variant="h6" color="inherit" noWrap>
                    TutoresTec
                </Typography>
                <div className={this.props.classes.grow} />
                <div className={this.props.classes.search}>
                    <div className={this.props.classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                    placeholder="Search…"
                    classes={{
                        root: this.props.classes.inputRoot,
                        input: this.props.classes.inputInput,
                    }}
                    />
                </div>
            </Toolbar>
        );
        
        if(this.state.user){
            appContent = <Dashboard user={this.state.user}/>
        } else {
            appContent = <AuthComponent auth={this.auth}/>;
        }
        return (
        <div className={css.App}>
            <AppBar position='static' color='primary'>
                {appBarContent}
            </AppBar>
            {appContent}
        </div>
        );
    }
}

export default withStyles(styles)(App);
