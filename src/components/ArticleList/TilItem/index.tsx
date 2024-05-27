import React, { memo } from "react";

import {
  Article,
  TilCard,
  New,
  Header,
  Section,
  Title,
  HashTagArea,
  HashTag,
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

  const convertedTitle = title.replace(/\s/g, "-");

  return (
    <TilCard key={slug}>
      <Article itemScope itemType="http://schema.org/Article">
        <Header>
          <Title>
            <a href={`#${convertedTitle}`}>
              <span itemProp="headline" id={convertedTitle}>
                {title}
              </span>
            </a>
            <New>{isNewArticleWithinWeek ? "NEW" : null}</New>
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

        <HashTagArea>
          {[`${month}/${day}`, ...hashtags]?.map((hashtag) => (
            <HashTag>{hashtag}</HashTag>
          ))}
        </HashTagArea>
      </Article>
    </TilCard>
  );
};

export default memo(TilListItem);
