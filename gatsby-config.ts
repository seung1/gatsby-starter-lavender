import siteMetadata from "./blog-config";

interface FeedSerializeProps {
  query: {
    site: GatsbyTypes.Site;
    allMarkdownRemark: {
      nodes: GatsbyTypes.MarkdownRemark[];
    };
  };
}

export const plugins = [
  "gatsby-plugin-image",
  {
    resolve: "gatsby-plugin-module-resolver",
    options: {
      root: "./src",
      aliases: {
        "~": "./",
      },
    },
  },
  {
    resolve: "gatsby-source-filesystem",
    options: {
      path: `${__dirname}/content/blog`,
      name: "blog",
    },
  },
  {
    resolve: "gatsby-source-filesystem",
    options: {
      name: "images",
      path: `${__dirname}/src/images`,
    },
  },
  {
    resolve: "gatsby-transformer-remark",
    options: {
      plugins: [
        {
          resolve: "gatsby-remark-images",
          options: {
            maxWidth: 700,
          },
        },
        {
          resolve: "gatsby-remark-video",
          options: {
            width: "auto",
            height: "100%",
            maxHeight: "25rem",
            preload: "auto",
            muted: true,
            autoplay: true,
            playsinline: true,
            controls: false,
            loop: true,
          },
        },
        {
          resolve: "gatsby-remark-responsive-iframe",
          options: {
            wrapperStyle: "margin-bottom: 1.0725rem",
          },
        },
        {
          resolve: "gatsby-remark-autolink-headers",
          options: {
            className: "heading-anchor",
            isIconAfterHeader: true,
          },
        },
        {
          resolve: "gatsby-remark-katex",
          options: {
            strict: "ignore",
          },
        },
        // 마크다운에서 커스텀한 것들 목록을 여기에 추가하기
        // {
        //   resolve: "gatsby-remark-component",
        //   options: { components: ["custom-box"] },
        // },
        "gatsby-remark-external-links",
        "gatsby-remark-prismjs",
        "gatsby-remark-copy-linked-files",
        "gatsby-remark-smartypants",
      ],
    },
  },
  "gatsby-transformer-sharp",
  "gatsby-plugin-sharp",
  {
    resolve: "gatsby-plugin-google-analytics",
    options: {
      trackingId: siteMetadata.googleAnalytics,
      head: true,
      anonymize: true,
      defer: true,
    },
  },
  {
    resolve: "gatsby-plugin-feed",
    options: {
      query: `
        {
          site {
            siteMetadata {
              title
              description
              siteUrl
              site_url: siteUrl
            }
          }
        }
      `,
      feeds: [
        {
          serialize: ({
            query: { site, allMarkdownRemark },
          }: FeedSerializeProps) =>
            allMarkdownRemark.nodes.map((node) => {
              const url = `${site.siteMetadata?.siteUrl ?? ""}${
                node.fields?.slug ?? ""
              }`;
              return {
                ...node.frontmatter,
                url,
                description: node.excerpt,
                date: node.frontmatter?.date,
                guid: url,
                custom_elements: [{ "content:encoded": node.html }],
              };
            }),
          query: `
            {
              allMarkdownRemark(
                sort: {frontmatter: {date: DESC}}) {
                nodes {
                  excerpt
                  html
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    date
                  }
                }
              }
            }
          `,
          output: "/rss.xml",
          title: "seung1 blog",
        },
      ],
    },
  },
  {
    resolve: "gatsby-plugin-manifest",
    options: {
      name: siteMetadata.title,
      short_name: siteMetadata.title,
      start_url: "/",
      background_color: "#ffffff",
      theme_color: "#663399",
      display: "minimal-ui",
      icon: siteMetadata.icon,
    },
  },
  "gatsby-plugin-react-helmet",
  "gatsby-plugin-offline",
  "gatsby-plugin-typegen",
  // {
  //   resolve: "gatsby-plugin-sitemap",
  //   options: {
  //     query: `
  //       {
  //         allMarkdownRemark(
  //           sort: {frontmatter: {date: DESC}}) {
  //           nodes {
  //             excerpt
  //             html
  //             fields {
  //               slug
  //             }
  //             frontmatter {
  //               title
  //               date
  //             }
  //           }
  //         }
  //       }
  //     `,
  //     resolveSiteUrl: () => siteMetadata.siteUrl,
  //     resolvePages: ({
  //       allSitePage,
  //       allWpContentNode,
  //     }: {
  //       allSitePage: any;
  //       allWpContentNode: any;
  //     }) => {
  //       const wpNodeMap = allWpContentNode.nodes.reduce(
  //         (
  //           acc: { [x: string]: { path: any; modifiedGmt: any } },
  //           node: { uri: any; modifiedGmt: any }
  //         ) => {
  //           const { uri, modifiedGmt } = node;
  //           acc[uri] = { path: uri, modifiedGmt };

  //           return acc;
  //         },
  //         {}
  //       );

  //       interface GatsbyPage {
  //         path: string;
  //         modifiedGmt: string | null;
  //       }

  //       const gatsbyPages: GatsbyPage[] = allSitePage.nodes.map(
  //         (page: { path: string }) => ({
  //           path: page.path,
  //           modifiedGmt: null, // Gatsby 페이지의 마지막 수정 날짜를 여기에 설정하거나 null로 유지할 수 있습니다.
  //         })
  //       );

  //       // WordPress와 Gatsby 페이지를 합칩니다.
  //       const allPages = [...gatsbyPages, ...Object.values(wpNodeMap)];

  //       return allPages;
  //     },
  //     serialize: ({
  //       path,
  //       modifiedGmt,
  //     }: {
  //       path: string;
  //       modifiedGmt: string;
  //     }) => {
  //       return {
  //         url: path,
  //         lastmod: modifiedGmt, // 마지막 수정 날짜를 설정합니다.
  //       };
  //     },
  //   },
  // },
];

export { siteMetadata };

export const flags = {
  DEV_SSR: true,
  PARALLEL_SOURCING: true,
  // PARALLEL_QUERY_RUNNING: false, // Disabled due to PQR-related build issue. see https://github.com/gatsbyjs/gatsby/discussions/32389#discussioncomment-1034690
};
