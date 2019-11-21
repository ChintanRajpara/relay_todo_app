import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import createAnimatedSwitchNavigator from "react-navigation-animated-switch";
import TodoViewer from "./screens/todos/TodoViewer";
import SplashScreen from "./screens/splashScreen/SplashScreen";
import { Transition } from "react-native-reanimated";
import SignUp from "./screens/auth/SignUp";
import SignIn from "./screens/auth/SignIn";

export const ROUTES_CONSTANTS = {
    SPLASH_SCREEN: 'SPLASH_SCREEN',
    APP_STACK: "APP_STACK",
    AUTH_STACK: "AUTH_STACK",
    SIGN_UP: "SIGN_UP",
    SIGN_IN: "SIGN_IN",
    TODOS: "TODOS",

}

const AppStack = createStackNavigator(
    {
        [ROUTES_CONSTANTS.TODOS]: {
            screen: TodoViewer,
            navigationOptions: () => ({ header: null })
        },
    },
    {
        initialRouteName: ROUTES_CONSTANTS.TODOS,
    }
);

const AuthSwitch = createStackNavigator(
    {
        [ROUTES_CONSTANTS.SIGN_UP]: {
            screen: SignUp,
            navigationOptions: () => ({ header: null })
        },
        [ROUTES_CONSTANTS.SIGN_IN]: {
            screen: SignIn,
            navigationOptions: () => ({ header: null })
        },
    },
    {
        initialRouteName: ROUTES_CONSTANTS.SIGN_UP,
    }
);

// const AuthSwitch = createStackNavigator({
//     [ROUTES_CONSTANTS.SIGN_UP]: {
//         screen: SignUp,
//         navigationOptions: () => ({ header: null })
//     },
// },
//     {
//         initialRouteName: ROUTES_CONSTANTS.SIGN_UP
//     }
// )


const AppNavigator = createAnimatedSwitchNavigator({
    [ROUTES_CONSTANTS.SPLASH_SCREEN]: {
        screen: SplashScreen,
        navigationOptions: () => ({ header: null })
    },
    [ROUTES_CONSTANTS.APP_STACK]: {
        screen: AppStack,
        path: "app",
        navigationOptions: () => ({ header: null })
    },
    [ROUTES_CONSTANTS.AUTH_STACK]: {
        screen: AuthSwitch,
        navigationOptions: () => ({ header: null })
    }
}, {
    initialRouteName: ROUTES_CONSTANTS.SPLASH_SCREEN,
    transition: (
        <Transition.Together>
            <Transition.Out
                type="slide-left"
                durationMs={400}
                interpolation="easeIn"
            />
            <Transition.In type="slide-right" durationMs={500} />
        </Transition.Together>
    )
})

export default AppNavigator;
