const firebaseConfig = {
  apiKey: "AIzaSyChBVtUghFCvRaq9V9_m6B2mdQpTbZ32TM",
  authDomain: "zhambyltipo-kz.firebaseapp.com",
  databaseURL: "https://zhambyltipo-kz.firebaseio.com",
  projectId: "zhambyltipo-kz",
  storageBucket: "zhambyltipo-kz.appspot.com",
  messagingSenderId: "209735873429",
  appId: "1:209735873429:web:48fa2ecd9689ee1b"
};

firebase.initializeApp(firebaseConfig);

var messaging = firebase.messaging();

// messaging.usePublicVapidKey('BBbQ8B9U0pCqF_5sL0C9OAHkMXUP0JKmEQhjRq5qgatBNPOhuz6mJZjQZ_79Z3E26lwGzdyfOeZZP37ICZiyvas');

navigator.serviceWorker
.register('firebase-messaging-sw.js')
.then(function(registration) {
  console.log('serviceWorker', registration);

  messaging.useServiceWorker(registration);

  // Request permission and get token.....
  Notification.requestPermission().then(function(permission) {
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      
      messaging.getToken().then(function(currentToken) {
        if (currentToken) {
          console.log('token', currentToken);
          // sendTokenToServer(currentToken);
          // updateUIForPushEnabled(currentToken);
        } else {
          // Show permission request.
          console.log('No Instance ID token available. Request permission to generate one.');
          // Show permission UI.
          // updateUIForPushPermissionRequired();
          // setTokenSentToServer(false);
        }
      }).catch(function(err) {
        console.log('An error occurred while retrieving token. ', err);
        // showToken('Error retrieving Instance ID token. ', err);
        // setTokenSentToServer(false);
      });
    } else {
      console.log('Unable to get permission to notify.');
    }
  }).catch(function(err) {
    console.log('serviceWorker error.', err);
  });
});

messaging.onTokenRefresh(function() {
  messaging.getToken().then(function(refreshedToken) {
    console.log('Token refreshed.', refreshedToken);
    // Indicate that the new Instance ID token has not yet been sent to the
    // app server.
    // setTokenSentToServer(false);
    // Send Instance ID token to app server.
    // sendTokenToServer(refreshedToken);
    // ...
  }).catch(function(err) {
    console.log('Unable to retrieve refreshed token ', err);
    // showToken('Unable to retrieve refreshed token ', err);
  });
});

messaging.onMessage(function(payload) {
  console.log('Message received. ', payload);
});
