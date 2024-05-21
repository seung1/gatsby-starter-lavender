import { Link } from "gatsby";
import React, { memo } from "react";

import { useCheckScroll } from "~/hooks/useCheckScroll";
import DownIcon from "~/components/Icons/DownIcon";
import MainIcon from "~/components/Icons/MainIcon";
import UpIcon from "~/components/Icons/UpIcon";

import { Container, Button, ButtonText } from "./styles";

const FloatingActionButton = () => {
  const { scrollToTop, scrollToBottom } = useCheckScroll();

  return (
    <Container>
      <Button onClick={scrollToTop}>
        <UpIcon />
        <ButtonText>상단</ButtonText>
      </Button>
      <Button onClick={scrollToBottom}>
        <DownIcon />
        <ButtonText>하단</ButtonText>
      </Button>

      <Link to={"/"}>
        <Button>
          <MainIcon />
          <ButtonText>메인</ButtonText>
        </Button>
      </Link>
    </Container>
  );
};

export default memo(FloatingActionButton);
