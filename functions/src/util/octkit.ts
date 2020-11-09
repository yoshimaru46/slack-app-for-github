// https://github.com/octokit/graphql.js
const { graphql } = require("@octokit/graphql");

import * as functions from "firebase-functions";
const config = functions.config();

export const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${ config.github.access_token }`,
  },
});
