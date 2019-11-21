import React from 'react'
import { View, Text, ActivityIndicator, FlatList } from 'react-native'
import { graphql, usePagination, useMutation } from 'relay-hooks'
import Todo from './Todo';

const TodoPagination = (props) => {
    const fragmentSpec = graphql`
    fragment TodoPagination_user on User
    @argumentDefinitions(
        completed: { type: "Boolean" }
        first: { type: "Int", defaultValue: 10 }
        cursor: { type: "String" }
    ) {
        todos( after: $cursor, first: $first, completed:$completed)
        @connection(
            key: "TodoPagination_todos"
            filters: []
        ) {
            pageInfo {
                hasNextPage
                hasPreviousPage
                startCursor
                endCursor
            }
            edges {
                node {
                    id
                    title
                    completed
                }
            }
        }
    }`;

    const connectionConfig = {
        getVariables(props, { cursor }, fragmentVariables, options) {
            return {
                cursor,
                completed: fragmentVariables.completed,
                first: fragmentVariables.first
            };
        },
        query: props.TodoViewerQuery
    };

    const [viewer, { hasMore, isLoading, loadMore }] = usePagination(
        fragmentSpec,
        props.viewer
    );

    const _loadMore = () => {
        if (!hasMore() || isLoading()) {
            return;
        }

        loadMore(
            connectionConfig,
            1, // Fetch the next 10 feed items
            error => {
                if (error) {
                    console.log(error);
                }
            },
        );
    };

    const _renderItem = ({ item, index }) => {
        return <Todo viewerId={props.viewer.id} item={item} />
    }

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                style={{ flex: 1 }}
                data={viewer.todos.edges}
                onEndReached={_loadMore}
                renderItem={_renderItem}
                keyExtractor={(item) => item.node.id}
                ListFooterComponent={hasMore() ? (
                    <View>
                        <ActivityIndicator />
                    </View>
                ) : null}
            />
        </View>
    )
}

export default TodoPagination
