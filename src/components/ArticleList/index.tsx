import React, { memo } from "react";

import ArticleListItem from "~/components/ArticleList/Item";
// import ArticleDraftListItem from "~/components/ArticleList/DraftItem";
// import GoogleAdsList from "~/components/GoogleAdsList";

import { Container } from "./styles";

interface Props {
  posts: GatsbyTypes.BlogIndexQuery["allMarkdownRemark"]["nodes"];
}

const ArticleList = ({ posts }: Props) => (
  <Container>
    {posts.map((post) => {
      if (post === undefined) {
        return null;
      }

      const title = post.frontmatter?.title ?? post.fields?.slug ?? "";
      const slug = post.fields?.slug ?? "";
      const description = post.frontmatter?.description ?? post.excerpt ?? "";
      const thumbnail = post.frontmatter?.thumbnail ?? "";
      const draft = post.frontmatter?.draft ?? false;
      const date = post.frontmatter?.date ?? "";
      const tags = post.frontmatter?.tags ?? [];

      if (draft) return null;
      // <ArticleDraftListItem
      //   key={slug}
      //   title={title}
      //   tags={tags as string[]}
      //   description={description}
      //   thumbnail={thumbnail}
      // />

      return (
        <ArticleListItem
          key={slug}
          title={title}
          date={date}
          tags={tags as string[]}
          slug={slug}
          description={description}
          thumbnail={thumbnail}
        />
      );
    })}
    {/* <GoogleAdsList /> */}
  </Container>
);

export default memo(ArticleList);
