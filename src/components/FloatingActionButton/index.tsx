import { Link } from "gatsby";
import React, { memo } from "react";

import { useCheckScroll } from "~/hooks/useCheckScroll";
import ChatIcon from "~/components/Icons/ChatIcon";
import MainIcon from "~/components/Icons/MainIcon";
import UpIcon from "~/components/Icons/UpIcon";

import { Container, Button, ButtonText } from "./styles";

const FloatingActionButton = () => {
  const { isAtTop, scrollToTop, scrollToBottom } = useCheckScroll();

  return (
    <Container>
      {isAtTop ? (
        <Button onClick={scrollToBottom}>
          <ChatIcon />
          <ButtonText>댓글</ButtonText>
        </Button>
      ) : (
        <Button onClick={scrollToTop}>
          <UpIcon />
          <ButtonText>상단</ButtonText>
        </Button>
      )}

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
