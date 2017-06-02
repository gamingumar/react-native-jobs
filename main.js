import Expo, { Notifications } from 'expo';
import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';

import { Provider } from 'react-redux';
import store from './store';

import registerForNotifications from './services/push_notifications';

import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import SettingsScreen from './screens/SettingsScreen';
import ReviewScreen from './screens/ReviewScreen';

// Send Push notifications from here..
// http://rallycoding.herokuapp.com/api/tokens

class App extends React.Component {
    componentDidMount() {
        registerForNotifications();
        Notifications.addListener((notification) => {
            const { data: { text }, origin } = notification;

            if (origin === 'received' && text) {
                Alert.alert(
                    'new push notification',
                    text,
                    [{ text: 'OK.' }]
                );
            }
        });
    }

    render() {
        const MainNavigator = TabNavigator({
            welcome: { screen: WelcomeScreen },
            auth: { screen: AuthScreen },
            main: {
                screen: TabNavigator({
                    map: { screen: MapScreen },
                    deck: { screen: DeckScreen },
                    review: {
                        screen: StackNavigator({
                            review: { screen: ReviewScreen },
                            settings: { screen: SettingsScreen }
                        })
                    }

                }, {
                    tabBarPosition: 'bottom',
                    lazy: true,
                    animationEnabled: false,
                    swipeEnabled: false,
                    tabBarOptions: {
                        labelStyle: { fontSize: 12 }
                    }


                })
            }
        }, {
            tabBarPosition: 'bottom',
            swipeEnabled: false,
            lazy: true,
            animationEnabled: false,
            navigationOptions: {
                tabBarVisible: false
            }
        });

        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <MainNavigator />
                </View>
            </Provider>

        );
    }
}

const styles = StyleSheet.create({
    container: {

        flex: 1,
        // backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
         marginTop: 30
    },
});

Expo.registerRootComponent(App);
