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
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-LY5PD0355G"
      ></script>

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
