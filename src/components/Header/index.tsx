import { Link } from "gatsby";
import React, { memo } from "react";

import ThemeSwitch from "~/components/ThemeSwitch";

import { Circle, Container, Title, TitleWrapper } from "./styles";

interface Props {
  title: string;
  resetFilter?: () => void;
}

const Header = ({ title, resetFilter }: Props) => {
  return (
    <Container>
      <meta
        name="google-site-verification"
        content="UTxT7NGuLOoWm9RUU1LWe7jSHe8PWqjoNXduQFiFq7o"
      />
      <TitleWrapper>
        <Circle />
        <Title>
          <Link to={"/"} onClick={resetFilter}>
            {title}
          </Link>
        </Title>
      </TitleWrapper>
      <ThemeSwitch />
    </Container>
  );
};

export default memo(Header);
