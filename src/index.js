import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDVfChrnv_Ltg46Ewe7bxFoJSMAoC1oqro",
    authDomain: "tutores-tec.firebaseapp.com",
    databaseURL: "https://tutores-tec.firebaseio.com",
    projectId: "tutores-tec",
    storageBucket: "tutores-tec.appspot.com",
    messagingSenderId: "742317966501"
  };

firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
