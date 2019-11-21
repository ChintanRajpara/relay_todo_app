import React, { useState } from 'react'
import { View, TextInput, Button, Alert, TouchableOpacity, Text } from 'react-native'
import { useMutation, graphql } from 'relay-hooks'
import { ROUTES_CONSTANTS } from '../../AppNavigation'

const SignUp = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    const [mutate, { loading, data, error }] = useMutation(
        graphql`
        mutation SignUpMutation($input: registerInput!) {
        register(input:$input) {
            status
            message
            clientMutationId
        }
    } 
    `,
        {
            onCompleted: ({ register }) => {
                const { status, message } = register
                if (status === "SUCCESS") {
                    setEmail("")
                    setPassword("")
                    setFirstName("")
                    setLastName("")
                    Alert.alert(
                        "Registered!",
                        "You are registered successfully."
                        , [
                            {
                                text: "Go to signin.",
                                onPress: () => {
                                    props.navigation.navigate(ROUTES_CONSTANTS.SIGN_IN)
                                }
                            }
                        ]
                    )
                } else {
                    Alert.alert("Failed!", `${message}, use different email.`)

                }
            }
        })

    const _signUp = () => {
        mutate({
            variables: {
                input: {
                    email,
                    password,
                    firstName,
                    lastName,
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

                {_renderFormInput("First Name", firstName, setFirstName)}

                {_renderFormInput("Last Name", lastName, setLastName)}
            </View>
            <Button disabled={loading} title="Sign Up" onPress={_signUp} />
            <TouchableOpacity onPress={() => { props.navigation.navigate(ROUTES_CONSTANTS.SIGN_IN) }}><Text>sign in?</Text></TouchableOpacity>

        </View>
    )
}

export default SignUp
