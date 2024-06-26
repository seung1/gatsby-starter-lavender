import { styled } from "~/stitches.config";

export const Article = styled("article", {
  position: "relative",

  "& .heading-anchor": {
    borderBottom: 0,

    svg: {
      fill: "$text500",
    },
  },
});

export const TableOfContents = styled("div", {
  marginBottom: "1.5rem",

  "> ul": {
    marginLeft: 0,
  },

  ul: {
    listStyle: "none",

    li: {
      paddingTop: "0.125rem",
      paddingBottom: "0.125rem",

      color: "$text200",
      fontSize: "0.875rem",

      transition: "color $transitionDuration $transitionTiming",

      a: {
        textDecoration: "underline",
      },
    },
  },
});

export const Header = styled("header", {
  marginBottom: "2rem",
});

export const Title = styled("h1", {
  fontSize: "1.75rem",
  lineHeight: 1.5,

  "@md": {
    fontSize: "2.25rem",
  },
});

export const ArticleMetadata = styled("div", {
  display: "flex",
  alignItems: "center",
  marginTop: "0.5rem",

  color: "$text200",

  fontWeight: 700,

  transition: "color $transitionDuration $transitionTiming",
});

export const Content = styled("section", {
  wordBreak: "keep-all",

  h1: {
    marginTop: "2rem",
    marginBottom: "1.25rem",
    paddingBottom: "0.25rem",
    borderBottom: "1px solid $borderGray",

    a: {
      borderBottom: "none",
    },
  },

  h2: {
    marginTop: "3rem",
    marginBottom: "1rem",
    paddingBottom: "0.25rem",
    borderBottom: "1px solid $borderGray",
    color: "orange",

    a: {
      borderBottom: "none",
    },
  },

  h3: {
    marginTop: "2rem",
    lineHeight: 1.5,
  },

  ul: {
    lineHeight: 1.3,
  },

  ol: {
    marginTop: "1rem",
  },

  blockquote: {
    color: "$text300",
    opacity: 0.7,
    fontWeight: 600,
    margin: "1rem 0",
  },

  video: {
    marginTop: "1rem",
    width: "100%",
    height: "100%",
    maxHeight: "25rem",
    borderRadius: "1rem",
    border: "3px solid $primary300",
    backgroundColor: "black",
  },

  a: {
    borderBottom: "1px solid $borderPrimary",

    color: "$link",

    transition:
      "color $transitionDuration $transitionTiming, border-bottom-color $transitionDuration $transitionTiming",

    // 컨텐트안에 이미지를 감싸고있는 a태그에 대한 스타일 적용
    "&.gatsby-resp-image-link": {
      border: "none",
      overflow: "hidden",
      borderRadius: "0.5rem",
      marginTop: "2rem",
      marginBottom: "1rem",
      maxHeight: "25rem",
    },

    img: {
      boxShadow: "none !important",
      width: "auto !important",
      left: "50% !important",
      transform: "translateX(-50%)",
    },
  },

  b: {
    color: "orange",
    fontWeight: 700,
    margin: "0 0.5rem",
  },

  // 코드 스타일 pre: 감싸는부분 code: 내용부분
  pre: {
    code: {
      wordBreak: "break-all",
      overflowWrap: "break-word",
      fontSize: "0.75rem", // 12px

      "@md": {
        fontSize: "0.875rem", // 14px
      },
    },
  },
  "pre, code": {
    fontVariantLigatures: "none",
  },
});

export const Footer = styled("footer", {
  "&:before": {
    display: "block",
    width: "100%",
    height: "0.2rem",
    margin: "3rem auto",

    backgroundColor: "$primary200",

    transition: "background-color $transitionDuration $transitionTiming",

    content: "",
  },
});

export const HashTagArea = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  marginBottom: "3rem",
  columnGap: "1rem",
  rowGap: "0.5rem",
});

export const HashTag = styled("h2", {
  color: "$text200",
  fontSize: "1.25rem",
  display: "flex",
  padding: "0 0.25rem",

  "&::before": {
    content: "#",
    width: "1rem",
    display: "inline-block",
  },
});
