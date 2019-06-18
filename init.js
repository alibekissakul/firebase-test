var firebaseConfig = {
  projectId: 'zhambyltipo-kz',
  messagingSenderId: '209735873429',
  appId: '1:209735873429:web:48fa2ecd9689ee1b'
};

firebase.initializeApp(firebaseConfig);

var messaging = firebase.messaging();

navigator.serviceWorker.register('firebase-messaging-sw.js')
.then(function(registration) {
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
