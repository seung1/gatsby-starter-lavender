import React, { memo } from "react";

import {
  Article,
  Category,
  Content,
  Date,
  Front,
  Header,
  Section,
  Thumbnail,
  Title,
} from "./styles";

interface Props {
  slug: string;
  title: string;
  tags: string[];
  description: string;
  thumbnail: string;
}

const ArticleDraftListItem = ({
  slug,
  title,
  tags,
  description,
  thumbnail,
}: Props) => (
  <li key={slug}>
    <Article
      className="post-list-draft-item"
      itemScope
      itemType="http://schema.org/Article"
    >
      <Front>
        <Category>{tags[0]}</Category>
        <Date>작성중</Date>
      </Front>
      {thumbnail !== "" ? <Thumbnail src={thumbnail} /> : null}

      <Content>
        <Header>
          <Title>
            <span itemProp="headline">/* {title} */</span>
          </Title>
        </Header>
        <Section>
          <h4
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

export default memo(ArticleDraftListItem);
