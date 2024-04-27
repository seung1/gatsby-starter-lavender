import { graphql, useStaticQuery } from "gatsby";

export const useCheckMainPage = (): boolean =>
  useStaticQuery<GatsbyTypes.CheckMainPageQuery>(graphql`
    query CheckMainPage {
      allSitePage(filter: { path: { eq: "/" } }) {
        edges {
          node {
            id
            path
          }
        }
      }
    }
  `).allSitePage.edges.some(
    (edge) => edge.node.path === window.location.pathname
  );
