import { graphqlWithAuth } from "../util/octkit";

import * as functions from "firebase-functions";
const config = functions.config();

export const getIssues = async (keyword: string) => {
  const { search } = await graphqlWithAuth(`
  query ($q: String!) {
    search(query: $q, type: ISSUE, first: 5) {
      edges {
        node {      
          ... on Issue {
            repository {
              name
            }
            author {
              login
            }
            title
            url
          }
          ... on PullRequest {
            repository {
              name
            }
            author {
              login
            }
            title
            url
          }
        }
      }
    }
  }`,
    {
      q: `org:${ config.github.org } ${ keyword }`,
    }
  );

  return search.edges.map((edge: any) => edge.node).filter((node: any) => !!node.title);
}
