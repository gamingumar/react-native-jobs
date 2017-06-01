import React, {Component} from 'react';
import {View, Text, Platform} from 'react-native';
import {Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {clearLikedJobs} from '../actions';

class SettingScreen extends Component {
    static navigationOptions = {
        // headerStyle: {
        //     marginTop: Platform.OS === 'android' ? 24 : 0
        // }
    };
    render() {
        return (
            <View style={{ marginTop: 20 }}>
                <Button
                    title="Reset Liked Jobs"
                    large
                    icon={{name: 'delete-forever'}}
                    backgroundColor="#F44336"
                    onPress={this.props.clearLikedJobs}
                />

            </View>
        );
    }
}

export default connect(null, {clearLikedJobs})(SettingScreen);
