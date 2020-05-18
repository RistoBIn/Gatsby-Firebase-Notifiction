import React, { Component } from 'react';
import getFirebase, { withFirebase } from '../../../utils/Firebase';

class Landing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      deviceToken: ""
    }
    this.askForPermissioToReceiveNotifications = this.askForPermissioToReceiveNotifications.bind(this)
  }
  async sendTokenToServer(currentToken) {
    const { firebase } = this.props;
    const database = getFirebase().db;
    const docRef = database.collection("tokens").doc();

    if (!this.isTokenSentToServer()) {
      console.log('Sending token to server...');
      await docRef.set({
        token: currentToken
      })
      this.setTokenSentToServer(true);
    } else {
      console.log('Token already sent to server so won\'t send it again ' +
          'unless it changes');
    }

  }

  isTokenSentToServer() {
    return window.localStorage.getItem('sentToServer') === '1';
  }

  setTokenSentToServer(sent) {
    window.localStorage.setItem('sentToServer', sent ? '1' : '0');
  }

  askForPermissioToReceiveNotifications = async () => {
    try {
      const messaging = getFirebase().messaging;

      await messaging.requestPermission();
      const token = await messaging.getToken();
      this.sendTokenToServer(token)
      this.setState({
        deviceToken: token
      })
    } catch (error) {
      console.error(error);
    }
    navigator.serviceWorker.addEventListener("message", (message) => console.log(message));
  }
  render() {
    const { deviceToken } = this.state
    return (
      <div className="landing container">
        <h1>Landing</h1>
        <p>
          The Landing Page is open to everyone, even though the user
          isn't signed in.
        </p>
        <h3>
          Here is getting request token
        </h3>
        <br />
        <button onClick={this.askForPermissioToReceiveNotifications} >
          Get Notification when click
        </button>
        <h4>token:  {deviceToken}</h4>
      </div>
    );
  }
}

export default Landing;
