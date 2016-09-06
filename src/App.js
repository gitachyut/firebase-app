import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';


// Initialize Firebase
var config = {
  apiKey: "AIzaSyC6haDDOQ50rjQwNfjS2G9OKm2JDj5yWbU",
  authDomain: "chat-app-74da8.firebaseapp.com",
  databaseURL: "https://chat-app-74da8.firebaseio.com",
  storageBucket: "chat-app-74da8.appspot.com",
};
firebase.initializeApp(config);


class App extends Component {

  constructor(props){
    super(props);
    this.state ={
      speed:10
    }

  }

  componentDidMount(){

    const rootRef = firebase.database().ref().child('react');

    // var usersRef = ref.child("users");
    rootRef.set({
      alanisawesome: [
        {
          date_of_birth: "June 23, 1912",
          full_name: "Alan Turing"
        },
        {
          date_of_birth: "June 23, 1914",
          full_name: "Ala hdn Turing"
        },

      ],
      gracehop: {
        date_of_birth: "December 9, 1906",
        full_name: "Grace Hopper"
      }
    });

    const speedRef = rootRef.child('gracehop');
    console.log(speedRef);
    speedRef.on('value',snap => {
    console.log(snap.val());
      this.setState ({
        speed: snap.val().full_name
      });
    }) ;

  }

  submitHandle(e){
    e.preventDefault();
    var user = document.getElementById('user').value;
    var pass = document.getElementById('pass').value;
    var auth = firebase.auth();
    const login = auth.createUserWithEmailAndPassword(
      user,pass
    );
    login.then(function(user){
      console.log(user);
    }).catch(function(e){
      console.log(e.message);
    });


  }
  render() {

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Achyuts App</h2>
        </div>


        <h1> {this.state.speed}</h1>

        <form >
        <input type="text" id='user' placeholder="Email Id " />
        <input type="password" id='pass' placeholder="Username" />
        <button onClick={this.submitHandle.bind(this)}>Submit</button>
        </form>
      </div>
    );
  }
}

export default App;
