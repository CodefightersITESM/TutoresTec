import React, {Component} from 'react';
import css from './UserPad.css';
import profilePicturePlaceholder from './profilePicPlaceholder.png'
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';


const styles = {
    root: {
      flexGrow: 1,
      width: '100%',
      padding: 20
    },
};

class UserPad extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Paper style={styles.root}>
                <img className={css.ProfilePicture} src={profilePicturePlaceholder}/>
                <h1>{this.props.user.name}</h1>
                <h3>{this.props.user.email}</h3>
            </Paper>
        )
    }
}

export default UserPad;