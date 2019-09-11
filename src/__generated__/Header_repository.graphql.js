/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type Header_repository$ref: FragmentReference;
declare export opaque type Header_repository$fragmentType: Header_repository$ref;
export type Header_repository = {|
  +name: string,
  +description: ?string,
  +owner: {|
    +avatarUrl: string,
    +login: string,
  |},
  +$refType: Header_repository$ref,
|};
export type Header_repository$data = Header_repository;
export type Header_repository$key = {
  +$data?: Header_repository$data,
  +$fragmentRefs: Header_repository$ref,
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "Header_repository",
  "type": "GitHubRepository",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "name",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "description",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "owner",
      "storageKey": null,
      "args": null,
      "concreteType": null,
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "avatarUrl",
          "args": [
            {
              "kind": "Literal",
              "name": "size",
              "value": 192
            }
          ],
          "storageKey": "avatarUrl(size:192)"
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "login",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '7e100c6e85f672f64a65e296da8b3cb0';
module.exports = node;
