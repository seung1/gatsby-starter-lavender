import { styled } from "~/stitches.config";

export const Article = styled("article", {
  display: "flex",
  gap: "2rem",
  padding: "1rem",
  marginBottom: "0.5rem",
  opacity: 0.5,

  "@md": {
    gap: "1.5rem",
    padding: "1.5rem",
    marginBottom: "1rem",
  },
});

export const Content = styled("div", {});

export const Front = styled("span", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.5rem",
  maxWidth: "3rem",
  minWidth: "3rem",
  color: "$text200",
  fontStyle: "italic",

  "@md": {
    margin: "0rem 0.5rem",
  },
});

export const Category = styled("span", {
  fontSize: "1.3rem",
  lineHeight: 1.5,
  fontWeight: 600,
});

export const Date = styled("span", {
  fontSize: "1.1rem",
});

export const Header = styled("header", {
  margin: "0rem auto 1rem",
});

export const Title = styled("h2", {
  color: "$text200",
});

export const Section = styled("section", {
  color: "$text200",

  ">h4": {
    margin: "0.5rem auto",
    fontWeight: 600,
    lineHeight: 1.5,
  },
});

export const Thumbnail = styled("img", {
  borderRadius: "0.5rem",

  width: "6rem",
  height: "6rem",
  margin: "0 1.5rem 0 0",
});
