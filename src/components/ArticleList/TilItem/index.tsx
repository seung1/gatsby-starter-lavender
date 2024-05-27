import React, { memo } from "react";

import {
  Article,
  TilCard,
  TilDate,
  New,
  Content,
  Front,
  Header,
  Section,
  Title,
} from "./styles";

interface Props {
  slug: string;
  title: string;
  date: string;
  hashtags: string[];
  html: string;
}

const TilListItem = ({ slug, title, date, hashtags, html }: Props) => {
  const [, month, day] = date.split("-");

  const isNewArticleWithinWeek =
    new Date(date).getTime() > new Date().getTime() - 1000 * 60 * 60 * 24 * 7;

  return (
    <TilCard key={slug}>
      <Article
        className="post-list-item"
        itemScope
        itemType="http://schema.org/Article"
      >
        <Front>
          <TilDate>{`${month}/${day}`}</TilDate>
          <New>
            {isNewArticleWithinWeek ? <span className="new">NEW</span> : null}
          </New>
        </Front>

        <Content>
          <Header>
            <Title>
              <span itemProp="headline">{title}</span>
            </Title>
          </Header>
          <Section>
            <h4
              dangerouslySetInnerHTML={{
                __html: html,
              }}
              itemProp="description"
            />
          </Section>
        </Content>
      </Article>
    </TilCard>
  );
};

export default memo(TilListItem);
