import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';

export class AuthScreen extends Component {
	componentDidMount() {
		this.props.facebookLogin();
		// for testing only . remove in production
		AsyncStorage.removeItem('fb_token');
	}
	render() {
		return (
			<View>
				<Text>AuthScreen</Text>
				<Text>AuthScreen</Text>
				<Text>AuthScreen</Text>
				<Text>AuthScreen</Text>
			</View>
		);
	}
}

export default connect(null, actions)(AuthScreen);