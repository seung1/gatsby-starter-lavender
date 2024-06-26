import { styled, globalCss } from "~/stitches.config";

export const globalStyles = (colorScheme: "light" | "dark") =>
  globalCss({
    ":root": {
      fontFamily:
        '"Pretendard", apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      textRendering: "optimizeLegibility",
      colorScheme: colorScheme,
    },
    "*": {
      boxSizing: "border-box",
      margin: 0,
      padding: 0,
      "::-webkit-scrollbar": {
        width: "0.5rem",
      },
      "::-webkit-scrollbar-thumb": {
        backgroundColor: "$text200",
        borderRadius: "0.25rem",
      },
    },
    html: {
      minHeight: "100vh",
    },
    body: {
      minHeight: "100vh",

      backgroundColor: "$backgroundColor",
    },
    "#___gatsby, #gatsby-focus-wrapper": {
      minHeight: "100vh",
    },
    a: {
      color: "inherit",

      textDecoration: "none",
    },
    h1: {
      fontSize: "1.75rem",
    },
    h2: {
      fontSize: "1.5rem",
    },
    h3: {
      fontSize: "1.25rem",
    },
    h4: {
      fontSize: "1rem",
    },
    h5: {
      fontSize: "0.875rem",
    },
    h6: {
      fontSize: "0.75rem",
    },
    hr: {
      marginTop: "0.25rem",
      marginBottom: "0.25rem",
      border: 0,
      borderTop: "0.125rem solid $borderGray",
    },
    // 이미지 자체에 스타일 적용
    img: {
      display: "block",
      margin: "0 auto",
      maxWidth: "100%",
      borderRadius: "0.5rem",
    },
    table: {
      width: "100%",
      marginTop: "0.75rem",
      marginBottom: "0.75rem",
      borderCollapse: "collapse",

      lineHeight: "1.75rem",
    },
    tr: {
      borderBottom: "1px solid $borderGray",
    },
    th: {
      paddingTop: "0.75rem",
      paddingBottom: "0.75rem",
    },
    td: {
      paddingTop: "0.75rem",
      paddingBottom: "0.75rem",
    },
    // 글 스타일 수정
    p: {
      marginTop: "0.5rem",
      marginBottom: "0.5rem",

      lineHeight: 1.5,

      '> code[class*="language-"]': {
        whiteSpace: "pre-wrap",
      },
    },
    span: {
      lineHeight: 1.3,
    },
    blockquote: {
      paddingLeft: "1rem",
      borderLeft: "0.25rem solid $borderPrimary",
      marginBottom: "0.5rem",
    },
    u: {
      textDecoration: "#816eec wavy underline",
    },
    del: {
      color: "$text300",
      opacity: 0.5,
    },
    article: {
      overflowWrap: "break-word",

      "ul, ol": {
        marginLeft: "1.5rem",

        "ul, ol": {
          marginLeft: "1rem",
        },

        li: {
          marginTop: "0.375rem",
          marginBottom: "0.375rem",

          p: {
            margin: 0,
          },
        },
      },

      // 코드 박스에 스타일 적용
      'pre[class^="language-"]': {
        borderRadius: "0.5rem",
      },
    },

    // 마우스로 드래그시 선택되는 부분의 스타일
    "::selection": {
      backgroundColor: "$selectionBackground",
    },

    // ':not(pre) > code[class*="language-"]': {
    //   background: "$inlineCodeBackground",
    // },
  })();
export const Root = styled("div", {
  display: "flex",
  minHeight: "100vh",

  color: "$text500",

  backgroundColor: "$backgroundColor",

  transition:
    "color $transitionDuration $transitionTiming, background-color $transitionDuration $transitionTiming",
});

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  maxWidth: "$contentWidth",
  margin: "0 auto",
  paddingRight: "1em",
  paddingLeft: "1em",

  "@md": {
    padding: 0,
  },
});
