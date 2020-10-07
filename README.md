This repo powers the [OneGraph changelog](https://onegraph.com/changelog). All of the entries in the changelog are issues in this repo.

See the [https://onegraph.com/oneblog](https://onegraph.com/oneblog) for how to deploy your own changelog backed by GitHub issues.

### Developing on this repo

What follows are implementation details specific to this repo. For setting up a general oneblog, see [https://github.com/oneblog](https://github.com/oneblog).

Staging triggers a build on [staging cloudbuild](https://console.cloud.google.com/cloud-build/builds?project=sourcecodeshots) on every push to non-master and deploys to staging firebase hosting/cloud run.

Production triggers a build on (https://console.cloud.google.com/cloud-build/builds?project=onegraph-dashboard) on pushes to master and deploys to prod firebase hosting/cloud run.

Check the cloudbuild-staging.yaml, cloudbuild.yaml, and Dockerfile for implementation details.

### Developing locally

Install dependencies

```
yarn install
yarn dev
```

If you need to change one of the queries

Go to [the Server-Side auth page for the OneGraph changelog app](https://www.onegraph.com/dashboard/app/570a3d6b-6ff3-4b7a-9b0d-fe4cf6384388/auth/server-side) and get a personal token with access to GitHub.

Go to [the Persisted queries page for the OneGraph changelog app](https://www.onegraph.com/dashboard/app/570a3d6b-6ff3-4b7a-9b0d-fe4cf6384388/persisted-queries) and get a dashboard access token to persist queries.

Create a `.env` file with the following

```
OG_GITHUB_TOKEN="YOUR_SERVER_SIDE_AUTH_TOKEN"
OG_DASHBOARD_ACCESS_TOKEN="YOUR_TOKEN_TO_PERSIST_QUERIES"
```
