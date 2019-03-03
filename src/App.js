import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase/app';
import 'firebase/auth';
class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      action: "login",
      username: ''
    };
  }

  handleToggleAction = () => {
    this.setState((prevState) => {
      console.log(prevState);
      return {
        action: prevState.action === "login" ? "signup" : "login"
      }
    })
  }

  handleSignUp = () => {
    const auth = firebase.auth();
    const database = firebase.database();
    auth.createUserWithEmailAndPassword(this.state.email, this.state.password).then((response) => {
      console.log("Response: " + response);
      console.log("Usuario: " + response.user);
      const user = response.user;
      console.log("User ID: " + user.uid);
      console.log("Username: " + this.state.username);
      console.log("User email: " + user.email);
      const currUser = firebase.auth().currentUser;
      if(currUser){
        console.log("User logged in");
      } else {
        console.log("User not logged in");
      }
      database.ref(`Usuarios/${user.uid}`).set({
        username:this.state.username,
        email: user.email
      });
    }).catch((error) => {
      alert(error);
    }).then(() => {

    });
  }

  handleLogin = () => {
    const auth = firebase.auth();
    auth.signInWithEmailAndPassword(this.state.email, this.state.password).then((response) => {
      console.log(response);
    }).catch((error) => {
      alert(error);
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  getAuthComponent = () => {
    if(this.state.action === "login"){
      return (        
        <div className="AuthContainer">
          <input placeholder="Correo" name="email" className="AuthComponent" onChange={this.handleChange} value={this.state.email}/>
          <input placeholder="Contraseña" name="password" type="password" className="AuthComponent" onChange={this.handleChange} value={this.state.password}/>
          <button onClick={this.handleLogin}>Ingresar</button>
          </div>
    );
    } else {
      return (
        <div className="AuthContainer">
        <input placeholder="Nombre" name="username" className="AuthComponent" onChange={this.handleChange} value={this.state.username}/>
        <input placeholder="Correo" name="email" className="AuthComponent" onChange={this.handleChange} value={this.state.email}/>
        <input placeholder="Contraseña" name="password" type="password" className="AuthComponent" onChange={this.handleChange} value={this.state.password}/>
        <input placeholder="Confirmar Contraseña" type="password" className="AuthComponent"/>
        <form>
          <input type="radio" name="type" value="estudiante" />Estudiante
          <input type="radio" name="type" value="tutor" />Tutor
        </form>
        <button onClick={this.handleSignUp}>Crear</button>
      </div>
      );
    }
  }


  render() {

    return (
      <div className="App">
        <h1>Tutores Tec</h1>
        <h2>{this.state.action === "login" ? "Login" : "Sign Up"}</h2>
        {this.getAuthComponent()}
        <button onClick={this.handleToggleAction}>{this.state.action === "login" ? "Crear Cuenta" : "Entrar a Cuenta"}</button>

        </div>
    );
  }
}

export default App;
