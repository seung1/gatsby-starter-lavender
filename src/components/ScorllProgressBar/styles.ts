import { styled } from "~/stitches.config";

export const ProgressBar = styled("div", {
  position: "fixed",
  top: 0,
  left: 0,
  width: "0%",
  height: "0.25rem",
  backgroundColor: "$primary300",
  zIndex: 100,
  transition: "width 0.3s",
});
