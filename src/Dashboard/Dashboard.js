import React, { Component } from 'react';
import css from './Dashboard.css';
import firebase from 'firebase/app';
import 'firebase/auth';
import UserPad from './UserPad/UserPad';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const styles = {
    root: {
      flexGrow: 1,
    },
};

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: ''
        }
    }

    componentDidMount () {
        const uid = this.props.user.uid;
        firebase.database().ref(`/Usuarios/${uid}`).once('value').then((snapshot) => {
            const username = snapshot.val() && snapshot.val().username;
            this.setState(prevState => {
                return {
                    ...prevState,
                    name: username,
                    email: snapshot.val().email
                }
            })
        });
    }

    render () {
        return (
            <div className={css.Dashboard}>
                <UserPad user={this.state}/>
                <Paper style={styles.root}>
                    <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                    >
                    <Tab label="Tus Tutores" />
                    <Tab label="Asesorías" />
                    <Tab label="Tus Cursos" />
                    <Tab label="Tu perfil" />
                    </Tabs>
                </Paper>
            </div>
        )
    }
}

export default Dashboard;