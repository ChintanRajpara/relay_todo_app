/**
 * @flow
 * @relayHash 69e361347783c1b9eef40c960e24f2e0
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type SplashScreenQueryVariables = {||};
export type SplashScreenQueryResponse = {|
  +viewer: ?{|
    +id: ?string,
    +email: ?string,
    +firstName: ?string,
    +lastName: ?string,
  |}
|};
export type SplashScreenQuery = {|
  variables: SplashScreenQueryVariables,
  response: SplashScreenQueryResponse,
|};
*/


/*
query SplashScreenQuery {
  viewer {
    id
    email
    firstName
    lastName
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "viewer",
    "storageKey": null,
    "args": null,
    "concreteType": "User",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "id",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "email",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "firstName",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "lastName",
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
    "name": "SplashScreenQuery",
    "type": "RootQuery",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "SplashScreenQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "SplashScreenQuery",
    "id": null,
    "text": "query SplashScreenQuery {\n  viewer {\n    id\n    email\n    firstName\n    lastName\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'a7babe34d5db15b9a3edcd65ee4099d1';
module.exports = node;
