import React, { useState } from 'react'
import { View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native'
import { useMutation, graphql } from 'relay-hooks'
import { LocalStorage } from '../../utils/localstorage'
import { useEnvironmentContext } from '../../environmentContextDef'
import { ROUTES_CONSTANTS } from '../../AppNavigation'

const SignIn = (props) => {
    const { resetEnvironment } = useEnvironmentContext()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const [mutate, { loading, data, error }] = useMutation(graphql`
    mutation SignInMutation($input: loginInput!) {
        login(input:$input) {
            status
            message
            token
            clientMutationId
        }
    } 
    `,
        {
            onCompleted: async ({ login }) => {
                const { status, message, token } = login
                if (status === "SUCCESS" && token) {
                    setEmail("")
                    setPassword("")

                    await Promise.all([
                        LocalStorage.storeToken(token),
                        resetEnvironment()
                    ]);

                    props.navigation.navigate(ROUTES_CONSTANTS.TODOS)


                } else {
                    Alert.alert("Login Failed", message)
                }

            }, onError: error => { }
        }
    )

    const _signIn = () => {
        mutate({
            variables: {
                input: {
                    email,
                    password
                }
            }
        })
    }

    const _renderFormInput = (placeholder, value, setter, secureTextEntry = false) => {
        return (
            <View>
                <TextInput
                    placeholder={placeholder}
                    value={value}
                    onChangeText={setter}
                    secureTextEntry={secureTextEntry}
                />
            </View>
        )
    }

    return (
        <View >
            <View>
                {_renderFormInput("Email", email, setEmail)}

                {_renderFormInput("Password", password, setPassword, true)}
            </View>
            <Button disabled={loading} title="Sign In" onPress={_signIn} />
            <TouchableOpacity onPress={() => { props.navigation.navigate(ROUTES_CONSTANTS.SIGN_UP) }}><Text>sign up?</Text></TouchableOpacity>

        </View>
    )
}

export default SignIn
