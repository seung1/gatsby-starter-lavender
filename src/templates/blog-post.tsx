// import { DiscussionEmbed } from "disqus-react";
import { PageProps, graphql } from "gatsby";
import React from "react";

import ArticleNavigator from "~/components/ArticleNavigator";
import FloatingActionButton from "~/components/FloatingActionButton";
import Profile from "~/components/Profile";
import ScorllProgressBar from "~/components/ScorllProgressBar";
import Seo from "~/components/Seo";
import Tags from "~/components/Tags";
// import Utterances from "~/components/Utterances";
// import { useComment } from "~/hooks/useComment";
import Layout from "~/layout";

import "katex/dist/katex.min.css";

import {
  Article,
  TableOfContents,
  Content,
  Footer,
  Header,
  ArticleMetadata,
  HashTagArea,
  HashTag,
  Title,
} from "./styles";
import Quiz from "~/components/Quiz";

const BlogPostTemplate = ({
  data,
  location,
}: PageProps<GatsbyTypes.BlogPostBySlugQuery>) => {
  const post = data.markdownRemark!;
  const siteUrl = data.site?.siteMetadata?.siteUrl ?? "";
  const siteTitle = data.site?.siteMetadata?.title ?? "";
  const siteThumbnail = data.site?.siteMetadata?.thumbnail;
  const { previous, next } = data;
  const { title, description, date, tags, thumbnail } = post.frontmatter!;
  // const commentConfig = useComment().site?.siteMetadata?.comment;

  // const disqusConfig = {
  //   title,
  //   identifier: post.fields?.slug,
  // };

  // console.log(post.frontmatter?.question);

  const meta: Metadata[] = [];

  if (siteThumbnail || thumbnail) {
    const properties = ["og:image", "twitter:image"];

    for (const property of properties) {
      meta.push({
        property,
        content: `${siteUrl}${thumbnail ?? siteThumbnail}`,
      });
    }
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        lang="ko"
        title={title ?? ""}
        description={description ?? post.excerpt ?? ""}
        meta={meta}
      />

      <ScorllProgressBar />

      <Article itemScope itemType="http://schema.org/Article">
        <Header>
          <Title itemProp="headline">{title}</Title>
          <ArticleMetadata>
            <span>{date}</span>
            <Tags tags={tags as string[]} />
          </ArticleMetadata>
        </Header>

        <TableOfContents
          dangerouslySetInnerHTML={{ __html: post.tableOfContents ?? "" }}
        />

        <Content
          dangerouslySetInnerHTML={{ __html: post.html ?? "" }}
          itemProp="articleBody"
        />

        {/* <Quiz
          hasQuiz={post.frontmatter?.hasQuiz}
          question={post.frontmatter?.question}
          options={post.frontmatter?.options}
          answer={post.frontmatter?.answer}
        /> */}

        <Footer>
          <HashTagArea>
            {post.frontmatter?.hashtags?.map((hashtag) => (
              <HashTag key={hashtag}>{hashtag}</HashTag>
            ))}
          </HashTagArea>

          <Profile />
        </Footer>
      </Article>

      {/* {commentConfig?.utterances && (
        <Utterances repo={commentConfig.utterances} />
      )} */}

      {/* {commentConfig?.disqusShortName && (
        <DiscussionEmbed
          shortname={commentConfig?.disqusShortName}
          config={disqusConfig}
        />
      )} */}

      <ArticleNavigator previousArticle={previous} nextArticle={next} />

      <FloatingActionButton />
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
        siteUrl
        thumbnail
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      tableOfContents
      excerpt(pruneLength: 160)
      html
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        description
        tags
        hashtags
        thumbnail
        hasQuiz
        question
        options
        answer
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`;
