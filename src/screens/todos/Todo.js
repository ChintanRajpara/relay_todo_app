import React from 'react'
import { View, Text, Button } from 'react-native'
import { ConnectionHandler } from 'relay-runtime'
import { graphql, useMutation } from 'relay-hooks'

const Todo = (props) => {
    const [editMutate, { loading: editTodoLoading }] = useMutation(
        graphql`
        mutation TodoEditMutation($input:editTodoInput!) {
            editTodo(input:$input) {
                status
                message
                clientMutationId
            }
        }`
    )

    const [deleteMutate, { loading: deleteTodoLoading }] = useMutation(
        graphql`
        mutation TodoDeleteMutation($input:deleteTodoInput!) {
         deleteTodo (input:$input) {
             status
             message
             clientMutationId
         }
        }
        `
    )

    const editTodoMutation = (id, completed) => {
        const sharedUpdater = store => {
            store.get(id).setValue(completed, "completed")
        }
        editMutate({
            variables: {
                input: {
                    id,
                    completed
                }
            },
            optimisticUpdater: sharedUpdater,
            updater: store => {
                const status = store.getRootField("editTodo").getValue("status")
                console.log({ status })
                if (status === "SUCCESS") {
                    sharedUpdater(store)
                }
            }
        })
    }

    const deleteTodoMutation = id => {
        const sharedUpdater = store => {
            const viewerProxy = store.get(props.viewerId)
            const todos = ConnectionHandler.getConnection(viewerProxy, "TodoPagination_todos")
            ConnectionHandler.deleteNode(todos, id)

        }
        deleteMutate({
            variables: { input: { id } },
            optimisticUpdater: sharedUpdater,
            updater: store => {
                const status = store.getRootField("deleteTodo").getValue("status")
                if (status === "SUCCESS") {
                    sharedUpdater(store)
                }
            }
        })
    }

    return (
        <View style={{ flexDirection: "row" }}>
            <Text>{props.item.node.title}</Text>
            <Button
                disabled={editTodoLoading}
                onPress={() => {
                    editTodoMutation(props.item.node.id, !props.item.node.completed)
                }}
                title={props.item.node.completed ? "Mark as uncompleted" : "Mark as completed"}
            />
            <Button disabled={deleteTodoLoading} onPress={() => { deleteTodoMutation(props.item.node.id) }} title={"delete"} />
        </View>
    )
}

export default Todo
