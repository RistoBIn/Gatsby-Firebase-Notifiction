import React, { Component, Fragment } from 'react';

import Navigation from '../components/molecules/Navigation/Navigation';
import getFirebase, { FirebaseContext } from './Firebase';
import withAuthentication from './Session/withAuthentication';
import SEO from './SEO';
import '../styles/index.scss';


if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./firebase-messaging-sw.js")
    .then(function(registration) {
      console.log("Registration successful, scope is:", registration.scope);
    })
    .catch(function(err) {
      console.log("Service worker registration failed, error:", err);
    });
}


class Layout extends Component {
  state = {
    firebase: null,
  };

  componentDidMount() {
    const app = import('firebase/app');
    const auth = import('firebase/auth');
    const database = import('firebase/database');
    const messaging = import('firebase/messaging');

    Promise.all([app, auth, messaging, database]).then(values => {
      const firebase = getFirebase(values[0]);
      this.setState({ firebase });
    });

  }

  render() {
    return (
      <FirebaseContext.Provider value={this.state.firebase}>
        <AppWithAuthentication {...this.props} />
      </FirebaseContext.Provider>
    );
  }
}

const AppWithAuthentication = withAuthentication(
  ({ hideNav, seo, children }) => (
    <Fragment>
      <SEO {...seo} />
      {!hideNav && <Navigation />}
      {children}
    </Fragment>
  ),
);

export default Layout;
