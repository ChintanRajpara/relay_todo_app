import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { useQuery, graphql } from 'relay-hooks'
import TodoPagination from './TodoPagination';

const TodoViewer = () => {
  const TodoViewerQuery = graphql`
    query TodoViewerQuery($completed: Boolean, $first: Int, $cursor: String) {
      viewer {
        id
        ...TodoPagination_user
          @arguments(completed: $completed, first: $first, cursor: $cursor)
      }
    }
  `
  // const TodoViewerQuery = graphql`
  // query TodoViewerQuery {
  //     viewer {
  //         id
  //         email
  //         firstName
  //         lastName
  //     }
  // }`


  // const { props, error, retry, cached } = useQuery({
  //     query: TodoViewerQuery,
  //     cacheConfig: {
  //         force: true
  //     }
  // });

  const { props, error, retry, cached } = useQuery({
    query: TodoViewerQuery,
    variables: {
      first: 10,
      cursor: null,
      completed: null
    }
  });



  console.log({ props })

  return props && props.viewer
    ? <TodoPagination TodoViewerQuery={TodoViewerQuery} viewer={props.viewer} />
    : <View><ActivityIndicator /></View>
}

export default TodoViewer
