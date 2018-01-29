import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Slides from '../components/Slides';

const SLIDE_DATA = [
	{ text: 'Welcome to JobApp', color: '#03A9F4' },
	{ text: 'Set your location, then swipe away', color:'#009688'},
	{ text: 'Use it to get your dream job', color:'#03A9F4'}
];

export class WelcomeScreen extends Component {
	onSlidesComplete() {
		this.props.navigation.navigate('auth');
	}

	render() {
		return (
			<Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete.bind(this)}/>
		);
	}
}

export default WelcomeScreen;