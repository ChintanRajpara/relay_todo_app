import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import createAnimatedSwitchNavigator from "react-navigation-animated-switch";
import TodoViewer from "./screens/todos/TodoViewer";
import SplashScreen from "./screens/splashScreen/SplashScreen";
import { Transition } from "react-native-reanimated";

export const ROUTES_CONSTANTS = {
    SPLASH_SCREEN: 'SPLASH_SCREEN',
    TODOS: "TODOS"
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

// const AuthSwitch = createSwitchNavigator({
//     [ROUTES_CONSTANTS.AUTH_SIGNIN]: {
//         screen: SignInForm,
//         navigationOptions: () => ({ header: null })
//     },
//     [ROUTES_CONSTANTS.AUTH_SIGNUP]: {
//         screen: SignUpForm,
//         navigationOptions: () => ({ header: null })
//     },
//     [ROUTES_CONSTANTS.AUTH_FORGOT_PASSWORD]: {
//         screen: ForgotPasswordForm,
//         navigationOptions: () => ({ header: null })
//     },
//     [ROUTES_CONSTANTS.AUTH_CHANGE_PASSWORD]: {
//         screen: ChangePasswordUponRequest,
//         path: "auth/changePassword/:uuid",
//         navigationOptions: () => ({ header: null })
//     },
//     [ROUTES_CONSTANTS.AUTH_MESSAGE_DISPLAYER]: {
//         screen: MessageDisplayer,
//         navigationOptions: () => ({ header: null })
//     },
//     [ROUTES_CONSTANTS.AUTH_ACTIVATE_ACCOUNT]: {
//         screen: ActivateUserAccount,
//         path: "activateUserAccount/:activation_token",
//         navigationOptions: () => ({ header: null })
//     }
// },
//     {
//         initialRouteName: ROUTES_CONSTANTS.AUTH_SIGNIN
//     }
// )


const AppNavigator = createAnimatedSwitchNavigator({

    [ROUTES_CONSTANTS.SPLASH_SCREEN]: {
        screen: SplashScreen,
        navigationOptions: () => ({ header: null })
    },
    // [ROUTES_CONSTANTS.APP_STACK]: {
    //     screen: AppStack,
    //     path: "app",
    //     navigationOptions: () => ({ header: null })
    // },
    // [ROUTES_CONSTANTS.AUTH_STACK]: {
    //   screen: AuthSwitch,
    //   navigationOptions: () => ({ header: null })
    // }
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
}
)

export default AppNavigator;
