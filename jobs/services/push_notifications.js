import { Permissions, Notifications } from 'expo';
import { AsyncStorage } from 'react-native';
import axios from 'axios';

const PUSH_ENDPOINT = 'http://rallycoding.herokuapp.com/api/tokens';

export default async () => {
	let previousToken = await AsyncStorage.getItem('pushtoken');
	console.log(previousToken);
	if(previousToken) {
		return;
	} else {
		try {
			let { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);

			if (status !== 'granted') {
				return;
			}
			let token = await Notifications.getExpoPushTokenAsync();
			console.log(token);
			await axios.post(PUSH_ENDPOINT, { token: { token } });
		} catch(e) {
			console.log(e);
		}

		AsyncStorage.setItem('pushtoken', token);
	}
};

// ExponentPushToken[PkvsrzLeSdU-9rb_PP_CIn]