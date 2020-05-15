import React, { Component } from 'react';
import { askForPermissioToReceiveNotifications } from '../../../utils/push-notification';

class Landing extends Component {
  render() {
    return (
      <div className="landing container">
        <h1>Landing</h1>
        <p>
          The Landing Page is open to everyone, even though the user
          isn't signed in.
        </p>
        <button onClick={askForPermissioToReceiveNotifications} >
          Get Notification when click
        </button>
      </div>
    );
  }
}

export default Landing;
