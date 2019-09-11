/**
 * @flow
 * @relayHash 65652394993541ae55dec3ecf27c25b6
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type Header_repository$ref = any;
type Post_post$ref = any;
export type App_Post_QueryVariables = {|
  issueNumber: number,
  owner: string,
  repo: string,
|};
export type App_Post_QueryResponse = {|
  +gitHub: ?{|
    +repository: ?{|
      +issue: ?{|
        +labels: ?{|
          +nodes: ?$ReadOnlyArray<?{|
            +name: string
          |}>
        |},
        +$fragmentRefs: Post_post$ref,
      |},
      +$fragmentRefs: Header_repository$ref,
    |}
  |}
|};
export type App_Post_Query = {|
  variables: App_Post_QueryVariables,
  response: App_Post_QueryResponse,
|};
*/


/*
query App_Post_Query(
  $issueNumber: Int!
  $owner: String!
  $repo: String!
) @persistedQueryConfiguration(accessToken: {environmentVariable: "OG_GITHUB_TOKEN"}) {
  gitHub {
    repository(name: $repo, owner: $owner) {
      ...Header_repository
      issue(number: $issueNumber) {
        labels(first: 100) {
          nodes {
            name
            id
          }
        }
        ...Post_post
        id
      }
      id
    }
  }
}

fragment Header_repository on GitHubRepository {
  name
  description
  owner {
    __typename
    avatarUrl(size: 192)
    login
    id
  }
}

fragment Post_post on GitHubIssue {
  id
  number
  title
  body
  createdAt
  updatedAt
  assignees(first: 10) {
    nodes {
      id
      name
      login
      avatarUrl
      url
    }
  }
  reactionGroups {
    content
    viewerHasReacted
    users {
      totalCount
    }
  }
  comments {
    totalCount
  }
  repository {
    name
    owner {
      __typename
      login
      avatarUrl(size: 192)
      id
    }
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "issueNumber",
    "type": "Int!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "owner",
    "type": "String!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "repo",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "name",
    "variableName": "repo"
  },
  {
    "kind": "Variable",
    "name": "owner",
    "variableName": "owner"
  }
],
v2 = [
  {
    "kind": "Variable",
    "name": "number",
    "variableName": "issueNumber"
  }
],
v3 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 100
  }
],
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v6 = {
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
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "login",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v9 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "totalCount",
    "args": null,
    "storageKey": null
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "App_Post_Query",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "gitHub",
        "storageKey": null,
        "args": null,
        "concreteType": "GitHubQuery",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "repository",
            "storageKey": null,
            "args": (v1/*: any*/),
            "concreteType": "GitHubRepository",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "issue",
                "storageKey": null,
                "args": (v2/*: any*/),
                "concreteType": "GitHubIssue",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "labels",
                    "storageKey": "labels(first:100)",
                    "args": (v3/*: any*/),
                    "concreteType": "GitHubLabelConnection",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "nodes",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "GitHubLabel",
                        "plural": true,
                        "selections": [
                          (v4/*: any*/)
                        ]
                      }
                    ]
                  },
                  {
                    "kind": "FragmentSpread",
                    "name": "Post_post",
                    "args": null
                  }
                ]
              },
              {
                "kind": "FragmentSpread",
                "name": "Header_repository",
                "args": null
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "App_Post_Query",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "gitHub",
        "storageKey": null,
        "args": null,
        "concreteType": "GitHubQuery",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "repository",
            "storageKey": null,
            "args": (v1/*: any*/),
            "concreteType": "GitHubRepository",
            "plural": false,
            "selections": [
              (v4/*: any*/),
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
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/)
                ]
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "issue",
                "storageKey": null,
                "args": (v2/*: any*/),
                "concreteType": "GitHubIssue",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "labels",
                    "storageKey": "labels(first:100)",
                    "args": (v3/*: any*/),
                    "concreteType": "GitHubLabelConnection",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "nodes",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "GitHubLabel",
                        "plural": true,
                        "selections": [
                          (v4/*: any*/),
                          (v8/*: any*/)
                        ]
                      }
                    ]
                  },
                  (v8/*: any*/),
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "number",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "title",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "body",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "createdAt",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "updatedAt",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "assignees",
                    "storageKey": "assignees(first:10)",
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "first",
                        "value": 10
                      }
                    ],
                    "concreteType": "GitHubUserConnection",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "nodes",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "GitHubUser",
                        "plural": true,
                        "selections": [
                          (v8/*: any*/),
                          (v4/*: any*/),
                          (v7/*: any*/),
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "avatarUrl",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "url",
                            "args": null,
                            "storageKey": null
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "reactionGroups",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "GitHubReactionGroup",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "content",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "viewerHasReacted",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "users",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "GitHubReactingUserConnection",
                        "plural": false,
                        "selections": (v9/*: any*/)
                      }
                    ]
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "comments",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "GitHubIssueCommentConnection",
                    "plural": false,
                    "selections": (v9/*: any*/)
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "repository",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "GitHubRepository",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/),
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "owner",
                        "storageKey": null,
                        "args": null,
                        "concreteType": null,
                        "plural": false,
                        "selections": [
                          (v5/*: any*/),
                          (v7/*: any*/),
                          (v6/*: any*/),
                          (v8/*: any*/)
                        ]
                      },
                      (v8/*: any*/)
                    ]
                  }
                ]
              },
              (v8/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "App_Post_Query",
    "id": "14f310b8-2eea-4b4a-908c-97b426d8fd06",
    "text": null,
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'c4df1dca9624d26c6aff678c20ac282d';
module.exports = node;
