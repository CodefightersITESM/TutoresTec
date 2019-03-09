import React from 'react';
import css from './AuthComponent.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import LoginComponent from '../LoginComponent/LoginComponent.js';

class AuthComponent extends React.Component {
    constructor(props) {
        super(props);
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
                    </div>
                    <div className={css.divider}/>
                    <div className={css.right}>
                        <div className={css.rightItem}>
                            <LoginComponent/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AuthComponent;