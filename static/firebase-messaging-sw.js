importScripts('https://www.gstatic.com/firebasejs/7.9.3/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.9.3/firebase-messaging.js');
firebase.initializeApp({
	apiKey: "AIzaSyA5TNI2M93v-iWUj1_eQTulCf308BDhX10",
	authDomain: "gatsby-firebase-notifica-ae4f4.firebaseapp.com",
	databaseURL: "https://gatsby-firebase-notifica-ae4f4.firebaseio.com",
	projectId: "gatsby-firebase-notifica-ae4f4",
	storageBucket: "gatsby-firebase-notifica-ae4f4.appspot.com",
	messagingSenderId: "921558333196",
	appId: "1:921558333196:web:bb51f91a1ed2175119fb29",
});
var messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
     const promiseChain = clients
          .matchAll({
               type: "window",
               includeUncontrolled: true,
          })
          .then((windowClients) => {
               for (let i = 0; i < windowClients.length; i++) {
                    const windowClient = windowClients[i];
                    windowClient.postMessage(payload);
               }
          })
          .then(() => {
               return registration.showNotification("my notification title");
          });
     return promiseChain;
});
self.addEventListener("notificationclick", function(event) {
     console.log(event);
});