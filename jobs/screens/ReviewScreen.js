import React, { Component } from 'react';
import { View, Text, Platform, ScrollView, Linking } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { MapView } from 'expo';

export class ReviewScreen extends Component {

	static navigationOptions = ({ navigation }) => {
 		return {
     		title: 'Review Jobs',
            tabBarIcon: ({ tintColor }) => {
                return <Icon name="favorite" size={30} color={tintColor} />;
                },
     		headerRight: (
         		<Button 
         			title='Settings' 
         			onPress={() => navigation.navigate('settings')}
         			backgroundColor="rgba(0,0,0,0)"
         			color="rgba(0,122,255,1)"
         		/>
        	),
        	headerStyle: {
        		marginTop: Platform.OS === 'android' ? 24 : 0
        	}
     	};
 	}

    renderLikedJobs() {
        return this.props.likedJobs.map(job => {
            const { 
                company, 
                formattedRelativeTime, 
                url, 
                longitude, 
                latitude, 
                jobtitle,
                jobkey 
            } = job;

            const initialRegion = {
                latitude,
                longitude,
                latitudeDelta: 0.045,
                longitudeDelta: 0.02
            }

            return(
                <Card title={jobtitle} key={jobkey}>
                    <View style={{ height: 200 }}>
                        <MapView
                            style={{ flex: 1}}
                            cacheEnabled={Platform.OS === 'android'}
                            scroolEnabled={false}
                            initialRegion={initialRegion}
                        />
                        <View style={styles.detailedWrapper}>
                            <Text style={styles.italics}>{company}</Text>
                            <Text style={styles.italics}>{formattedRelativeTime}</Text>
                        </View>
                        <Button 
                            title="Apply Now!"
                            backgroundColor="#03A9F4"
                            onPress={() => Linking.openURL(url)}
                        />
                    </View>
                </Card>
            );
        });
    }

	render() {
		return (
			<ScrollView>
                {this.renderLikedJobs()}         
            </ScrollView>
		);
	}
}

const styles = {
    detailedWrapper: {
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    italics: {
        fontStyle: 'italic'
    }
}


function mapStateToProps({likedJobs}) {
    return {
        likedJobs
    };
}

export default connect(mapStateToProps)(ReviewScreen);