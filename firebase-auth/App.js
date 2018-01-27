import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';
import firebase from 'firebase';

export default class App extends React.Component {

  componentWillMount() {
    var config = {
        apiKey: "AIzaSyDIAcJHTa69pPJ6LNidRCOQMrkWq0L8bEU",
        authDomain: "one-time-password-3751e.firebaseapp.com",
        databaseURL: "https://one-time-password-3751e.firebaseio.com",
        projectId: "one-time-password-3751e",
        storageBucket: "one-time-password-3751e.appspot.com",
        messagingSenderId: "349366798692"
      };
      
      firebase.initializeApp(config);
  }

  render() {
    return (
      <View style={styles.container}>
        <SignUpForm />
        <SignInForm />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
