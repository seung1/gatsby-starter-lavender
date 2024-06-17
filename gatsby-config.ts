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
      path: `${__dirname}/content/blog/study`,
      name: "study",
    },
  },
  {
    resolve: "gatsby-source-filesystem",
    options: {
      path: `${__dirname}/content/blog/ticle`,
      name: "ticle",
    },
  },
  {
    resolve: "gatsby-source-filesystem",
    options: {
      path: `${__dirname}/content/blog/til`,
      name: "til",
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
                sort: { order: DESC, fields: [frontmatter___date] },
              ) {
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
  "gatsby-plugin-sitemap",
  // 서치콘솔에서 입력이 되는걸로 보아 일단 보류
  // {
  //   resolve: "gatsby-plugin-sitemap",
  //   options: {
  //     query: `
  //     {
  //       allSitePage {
  //         nodes {
  //           path
  //         }
  //       }
  //       allWpContentNode(filter: {nodeType: {in: ["Post", "Page"]}}) {
  //         nodes {
  //           ... on WpPost {
  //             uri
  //             modifiedGmt
  //           }
  //           ... on WpPage {
  //             uri
  //             modifiedGmt
  //           }
  //         }
  //       }
  //     }
  //   `,
  //     resolveSiteUrl: () => siteMetadata.siteUrl,
  //     resolvePages: ({
  //       allSitePage: { nodes: allPages },
  //       allWpContentNode: { nodes: allWpNodes },
  //     }) => {
  //       const wpNodeMap = allWpNodes.reduce((acc, node) => {
  //         const { uri } = node;
  //         acc[uri] = node;

  //         return acc;
  //       }, {});

  //       return allPages.map((page) => {
  //         return { ...page, ...wpNodeMap[page.path] };
  //       });
  //     },
  //     serialize: ({ path, modifiedGmt }) => {
  //       return {
  //         url: path,
  //         lastmod: modifiedGmt,
  //       };
  //     },
  //   },
  // },
];

export { siteMetadata };

export const flags = {
  DEV_SSR: true,
  PARALLEL_QUERY_RUNNING: false, // Disabled due to PQR-related build issue. see https://github.com/gatsbyjs/gatsby/discussions/32389#discussioncomment-1034690
};
