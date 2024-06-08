import React, { memo, useState } from "react";

import {
  Article,
  TilCard,
  New,
  Header,
  OpenSection,
  CloseSection,
  Title,
  Description,
  HashTagArea,
  HashTag,
} from "./styles";

interface Props {
  slug: string;
  title: string;
  date: string;
  description: string;
  hashtags: string[];
  html: string;
}

const TilListItem = ({
  slug,
  title,
  date,
  description,
  hashtags,
  html,
}: Props) => {
  const [isTilOpen, setIsTilOpen] = useState(false);

  const [, month, day] = date.split("-");

  const isNewArticleWithinWeek =
    new Date(date).getTime() > new Date().getTime() - 1000 * 60 * 60 * 24 * 7;

  const convertedTitle = title.replace(/\s/g, "-");

  return (
    <TilCard key={slug} onClick={() => setIsTilOpen(!isTilOpen)}>
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

        {isTilOpen ? (
          <OpenSection>
            <h4
              dangerouslySetInnerHTML={{
                __html: html,
              }}
              itemProp="description"
            />
          </OpenSection>
        ) : (
          <CloseSection>
            <h4
              dangerouslySetInnerHTML={{
                __html: html,
              }}
              itemProp="description"
            />
          </CloseSection>
        )}

        <Description>{description}</Description>

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
