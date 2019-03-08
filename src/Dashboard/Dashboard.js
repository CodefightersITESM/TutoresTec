import React, { Component } from 'react';
import css from './Dashboard.css';
import firebase from 'firebase/app';
import 'firebase/auth';

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
                <h1>Dashboard</h1>
                <h2>Hola {this.state.name}</h2>
                <hr></hr>
                <button className={css.DashboardButton}>Perfil</button>
                <button className={css.DashboardButton}>Tutores</button>
                <button className={css.DashboardButton}>Estudiantes</button>
                <button className={css.DashboardButton}>Material</button>
            </div>
        )
    }
}

export default Dashboard;