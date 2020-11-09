import { graphqlWithAuth } from "../util/octkit";

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
      q: `org:${ process.env.GITHUB_ORG } ${ keyword }`,
    }
  );

  return search.edges.map(edge => edge.node).filter(node => !!node.title);
}
