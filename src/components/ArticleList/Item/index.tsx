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
    <Link to={slug} itemProp="url">
      <Article
        className="post-list-item"
        itemScope
        itemType="http://schema.org/Article"
      >
        {thumbnail !== "" ? <Thumbnail src={thumbnail} /> : null}
        <Content>
          <Header>
            <Title>
              <span itemProp="headline">{title}</span>
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
    </Link>
  </li>
);

export default memo(ArticleListItem);
