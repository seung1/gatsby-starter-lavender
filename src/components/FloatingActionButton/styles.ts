import { styled } from "~/stitches.config";

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",

  position: "fixed",
  right: "1rem",
  bottom: "1.5rem",
  zIndex: 1,

  "@md": {
    right: "2rem",
    bottom: "2.5rem",
  },
});

export const Button = styled("button", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.25rem",

  borderColor: "white",
  width: "3.5rem",
  height: "3.5rem",
  borderRadius: "3rem",
  backgroundColor: "$gray100",
  transition: "background-color $transitionDuration $transitionTiming",

  boxShadow:
    "rgba(0, 0, 33, 0.07) 0px 16px 22.4px 4.8px, rgba(0, 0, 33, 0.05) 0px 3.2px 16px 0px, rgba(0, 0, 33, 0.07) 0px 0px 1px 0px",

  "@md": {
    width: "4.5rem",
    height: "4.5rem",
  },

  svg: {
    fill: "$text400",
    width: "1.5rem",
    height: "1.5rem",
  },
});

export const ButtonText = styled("span", {
  color: "$text400",
  fontWeight: 900,
  fontSize: "1rem",
  display: "none",

  "@md": {
    display: "block",
  },
});
