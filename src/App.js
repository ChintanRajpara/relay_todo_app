/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from "react";
import { Environment, Store, RecordSource } from 'relay-runtime'
import { View } from 'react-native'
import { createAppContainer } from "react-navigation";
import { RelayEnvironmentProvider } from "relay-hooks";
import { EnvironmentContext } from "./environmentContextDef";
import AppNavigator from "./AppNavigation";

import modernEnvironment, { network } from "../Environment";

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            environment: modernEnvironment,
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
