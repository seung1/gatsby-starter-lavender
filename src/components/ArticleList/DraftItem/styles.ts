import { styled } from "~/stitches.config";

export const Article = styled("article", {
  display: "flex",
  flexDirection: "column",
  padding: "1rem",
  marginBottom: "0.5rem",
  opacity: 0.5,

  "@md": {
    flexDirection: "row",
    gap: "1.5rem",
    padding: "1.5rem",
    marginBottom: "1rem",
  },
});

export const Content = styled("div", {});

export const Front = styled("span", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "0.5rem",
  color: "$text200",
  fontStyle: "italic",

  "@md": {
    flexDirection: "column",
    margin: "0rem 0.5rem",
  },
});

export const Category = styled("span", {
  fontSize: "1.1rem",
  lineHeight: 1.5,
  fontWeight: 600,

  "@md": {
    fontSize: "1.3rem",
  },
});

export const Date = styled("span", {
  fontSize: "1.1rem",
});

export const Header = styled("header", {
  marginBottom: "0.5rem",

  "@md": {
    marginBottom: "1rem",
  },
});

export const Title = styled("h2", {
  color: "$text200",
  lineHeight: 1.5,
  fontSize: "1.3rem",

  "@md": {
    fontSize: "1.5rem",
  },
});

export const Section = styled("section", {
  color: "$text200",

  ">h4": {
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
