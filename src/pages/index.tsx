import { PageProps, graphql } from "gatsby";
import React, { useCallback, useEffect, useRef } from "react";

import ArticleFilter from "~/components/ArticleFilter";
import ArticleList from "~/components/ArticleList";
import Profile from "~/components/Profile";
import Seo from "~/components/Seo";
import { TAG } from "~/constants";
import { useArticleTags } from "~/hooks/useArticleTags";
import { useInfiniteScroll } from "~/hooks/useInfiniteScroll";
import { usePage } from "~/hooks/usePage";
import { useSearchFilter } from "~/hooks/useSearchFilter";
import { useSeo } from "~/hooks/useSeo";
import { useTag } from "~/hooks/useTag";
import Layout from "~/layout";
import { filterPostsByTag, filterPostsByTitle } from "~/utils/filterPosts";

const BlogIndex = ({
  data,
  location,
}: PageProps<GatsbyTypes.BlogIndexQuery>) => {
  const infiniteScrollRef = useRef(null);
  const [page, setPage] = usePage();
  const [titleFilter, setTitleFilter] = useSearchFilter();
  const [currentTag, setCurrentTag] = useTag();
  const siteMetadata = useSeo().site?.siteMetadata;
  const tags = useArticleTags().allMarkdownRemark?.distinct as string[];

  const [isLoaded, setIsLoaded] = React.useState(false);

  const siteUrl = data.site?.siteMetadata?.siteUrl ?? "";
  const siteTitle = data.site?.siteMetadata?.title ?? "";
  const siteThumbnail = data.site?.siteMetadata?.thumbnail;

  const posts = filterPostsByTag(
    filterPostsByTitle(data.allMarkdownRemark.nodes, titleFilter),
    currentTag
  ).filter((post) =>
    currentTag !== TAG._Story
      ? !post.frontmatter?.tags?.includes("_Story")
      : post.frontmatter?.tags?.includes("_Story")
  );

  const articlePerPage = 5;
  const totalPage = Math.ceil(posts.length / articlePerPage);

  // const onTitleFilterChange = useCallback(
  //   (event: React.ChangeEvent<HTMLInputElement>) => {
  //     setTitleFilter(event.target.value);
  //   },
  //   []
  // );

  const resetFilter = () => {
    setTitleFilter("");
    setCurrentTag(TAG.MAIN);
  };

  const meta: Metadata[] = [];
  if (siteThumbnail) {
    const properties = ["og:image", "twitter:image"];

    for (const property of properties) {
      meta.push({
        property,
        content: `${siteUrl}${siteThumbnail}`,
      });
    }
  }

  useInfiniteScroll(
    infiniteScrollRef,
    useCallback(() => {
      if (page < totalPage) {
        setPage(page + 1);
      }
    }, [page, setPage, totalPage])
  );

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <Layout location={location} title={siteTitle} resetFilter={resetFilter}>
      <Seo
        lang="ko"
        title={siteMetadata?.title ?? ""}
        description={siteMetadata?.description ?? ""}
        meta={meta}
        noSiteName
      />

      <Profile />

      <ArticleFilter
        tags={tags}
        currentTag={currentTag}
        setCurrentTag={setCurrentTag}
      />

      {isLoaded ? (
        posts.length === 0 ? (
          <p>No posts found.</p>
        ) : (
          <ArticleList posts={posts.slice(0, page * articlePerPage)} />
        )
      ) : null}

      <div className="infinite-scroll" ref={infiniteScrollRef} />
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query BlogIndex {
    site {
      siteMetadata {
        title
        siteUrl
        thumbnail
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          title
          description
          tags
          thumbnail
          draft
          date
          hashtags
        }
        html
      }
    }
  }
`;
