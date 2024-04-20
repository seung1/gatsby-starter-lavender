import { Link } from "gatsby";
import React, { memo } from "react";

import { Article, Content, Header, Section, Thumbnail, Title } from "./styles";

interface Props {
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
}

const ArticleListItem = ({ slug, title, description, thumbnail }: Props) => (
  <li key={slug}>
    <Article
      className="post-list-item"
      itemScope
      itemType="http://schema.org/Article"
    >
      <Thumbnail src={thumbnail} />
      <Content>
        <Header>
          <Title>
            <Link to={slug} itemProp="url">
              <span itemProp="headline">{title}</span>
            </Link>
          </Title>
        </Header>
        <Section>
          <p
            dangerouslySetInnerHTML={{
              __html: description,
            }}
            itemProp="description"
          />
        </Section>
      </Content>
    </Article>
  </li>
);

export default memo(ArticleListItem);
