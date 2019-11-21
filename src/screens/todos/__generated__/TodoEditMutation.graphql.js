/**
 * @flow
 * @relayHash 6af89c3897979c99a415103b795f2bb3
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type editTodoInput = {|
  id?: ?string,
  completed?: ?boolean,
  title?: ?string,
  clientMutationId?: ?string,
|};
export type TodoEditMutationVariables = {|
  input: editTodoInput
|};
export type TodoEditMutationResponse = {|
  +editTodo: ?{|
    +status: ?string,
    +message: ?string,
    +clientMutationId: ?string,
  |}
|};
export type TodoEditMutation = {|
  variables: TodoEditMutationVariables,
  response: TodoEditMutationResponse,
|};
*/


/*
mutation TodoEditMutation(
  $input: editTodoInput!
) {
  editTodo(input: $input) {
    status
    message
    clientMutationId
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "editTodoInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "editTodo",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "editTodoPayload",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "status",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "message",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "clientMutationId",
        "args": null,
        "storageKey": null
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "TodoEditMutation",
    "type": "RootMutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "TodoEditMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "TodoEditMutation",
    "id": null,
    "text": "mutation TodoEditMutation(\n  $input: editTodoInput!\n) {\n  editTodo(input: $input) {\n    status\n    message\n    clientMutationId\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '12fae77fdad641ab2b538b316487c61d';
module.exports = node;
