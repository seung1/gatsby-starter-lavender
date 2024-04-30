import { Link } from "gatsby";
import React, { memo } from "react";

import {
  Article,
  ArticleCard,
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
  date: string;
  tags: string[];
  description: string;
  thumbnail: string;
}

const ArticleListItem = ({
  slug,
  title,
  date,
  tags,
  description,
  thumbnail,
}: Props) => {
  const [, month, day] = date.split("-");

  return (
    <ArticleCard key={slug}>
      <Link to={slug} itemProp="url">
        <Article
          className="post-list-item"
          itemScope
          itemType="http://schema.org/Article"
        >
          <Front>
            <Category>{tags[0]}</Category>
            <Date>
              {month}/{day}
            </Date>
          </Front>
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
    </ArticleCard>
  );
};

export default memo(ArticleListItem);
