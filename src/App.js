/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from "react";
import { Environment, Store, RecordSource } from 'relay-runtime'
import { Keyboard, View, Text, Dimensions } from 'react-native'
import { createAppContainer } from "react-navigation";
import { RelayEnvironmentProvider } from "relay-hooks";
import { EnvironmentContext } from "./environmentContextDef";

// import {
//     setCustomTextInput,
//     setCustomText,
//     setCustomTouchableOpacity
// } from "react-native-global-props";
import AppNavigator from "./AppNavigation";

// import AppNavigator from "./router/AppNavigator";
import myEnvironment, { network } from "../Environment";
// import * as pushNotifications from "./components/pushNotifications";
// import * as Sentry from "@sentry/react-native";
// import NavigationService from "./router/NavigationService";
// import { BASE_COLORS } from "./common/colors";
// import changeNavigationBarColor from 'react-native-navigation-bar-color';
// import NetInfo from "@react-native-community/netinfo";


// Sentry.init({
//     dsn: 'https://27c75ae0424f433ca7ca30886e2c0a70@sentry.io/1778800',
// });
// const _globalFontRender = {
//     style: {
//         fontFamily: "Segoe UI"
//     }
// };
// setCustomTextInput(_globalFontRender);
// setCustomText(_globalFontRender);
// setCustomTouchableOpacity(_globalFontRender);


const AppContainer = createAppContainer(AppNavigator);
// pushNotifications.configure();
const { width } = Dimensions.get('window');

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            environment: myEnvironment,
        }
    }

    _resetRelayStore = async () => {
        const res = await new Promise((resolve, reject) => {
            this.setState({ environment: null }, () => {
                const store = new Store(new RecordSource());

                const newEnvironment = new Environment({ network, store })

                this.setState({ environment: newEnvironment }, () => {
                    resolve("STORE HAS BEEN RESET!")
                })
            })
        })
        return res
    }

    render() {
        return (
            <View style={{
                flex: 1,
            }}>
                <EnvironmentContext.Provider
                    value={{
                        environment: this.state.environment,
                        resetEnvironment: this._resetRelayStore
                    }}
                >
                    <RelayEnvironmentProvider environment={this.state.environment}>
                        <AppContainer />
                    </RelayEnvironmentProvider>
                </EnvironmentContext.Provider>
            </View>
        )
    };
}