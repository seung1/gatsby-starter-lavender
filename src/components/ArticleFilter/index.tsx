import React, {
  // ChangeEventHandler,
  memo,
  MouseEvent,
  useCallback,
  useState,
} from "react";

import { TAG } from "~/constants";

import { Container, TagListWrapper, Tag } from "./styles";

interface Props {
  tags: string[];
  // titleFilter: string;
  // onTitleFilterChange: ChangeEventHandler<HTMLInputElement>;
  currentTag: string;
  setCurrentTag: (tag: string) => void;
}

const ArticleFilter = ({ tags, currentTag, setCurrentTag }: Props) => {
  const [tilClickCount, setClickCount] = useState(0);

  const onClickTag = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      const tag = (e.target as HTMLButtonElement).dataset["tag"] as string;

      if (tag === TAG.TIL) {
        setClickCount((prev) => prev + 1);
      }

      if (tag === TAG.MAIN) {
        setClickCount(0);
      }

      setCurrentTag(tag);
    },
    [setCurrentTag]
  );

  const tagsWithout_Story = tags.filter((tag) => tag !== TAG._Story);

  return (
    <Container>
      {/* <InputWrapper> */}
      {/* <Input
          type="text"
          placeholder="Article name.."
          value={titleFilter}
          onChange={onTitleFilterChange}
        /> */}
      <TagListWrapper>
        <Tag
          type="button"
          data-tag={TAG.MAIN}
          onClick={onClickTag}
          filtered={currentTag === TAG.MAIN}
        >
          {TAG.MAIN}
        </Tag>

        {(tilClickCount >= 3 ? tags : tagsWithout_Story).map((tag) => (
          <Tag
            type="button"
            key={tag}
            data-tag={tag}
            onClick={onClickTag}
            filtered={currentTag === tag}
          >
            {tag}
          </Tag>
        ))}
      </TagListWrapper>
      {/* </InputWrapper> */}
    </Container>
  );
};

export default memo(ArticleFilter);
