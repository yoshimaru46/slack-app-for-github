// https://github.com/octokit/graphql.js
const { graphql } = require("@octokit/graphql");
import * as dotenv from "dotenv"

dotenv.config()

export const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${ process.env.GITHUB_TOKEN }`,
  },
});

