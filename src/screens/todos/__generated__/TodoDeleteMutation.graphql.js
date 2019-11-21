/**
 * @flow
 * @relayHash 1cb18fb5e9386fbeda0728dca3ee8dcb
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type deleteTodoInput = {|
  id?: ?string,
  clientMutationId?: ?string,
|};
export type TodoDeleteMutationVariables = {|
  input: deleteTodoInput
|};
export type TodoDeleteMutationResponse = {|
  +deleteTodo: ?{|
    +status: ?string,
    +message: ?string,
    +clientMutationId: ?string,
  |}
|};
export type TodoDeleteMutation = {|
  variables: TodoDeleteMutationVariables,
  response: TodoDeleteMutationResponse,
|};
*/


/*
mutation TodoDeleteMutation(
  $input: deleteTodoInput!
) {
  deleteTodo(input: $input) {
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
    "type": "deleteTodoInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "deleteTodo",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "deleteTodoPayload",
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
    "name": "TodoDeleteMutation",
    "type": "RootMutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "TodoDeleteMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "TodoDeleteMutation",
    "id": null,
    "text": "mutation TodoDeleteMutation(\n  $input: deleteTodoInput!\n) {\n  deleteTodo(input: $input) {\n    status\n    message\n    clientMutationId\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'a06e83e6d34439e7c03c85ef0af6df42';
module.exports = node;
