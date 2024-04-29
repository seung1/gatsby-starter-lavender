import React, { useEffect } from "react";

import { ProgressBar } from "./styles";

const ScorllProgressBar = () => {
  const setProgress = () => {
    const htmlElement = document.querySelector("html");
    const progressBar: HTMLElement | null =
      document.querySelector(".progress-bar");

    if (htmlElement === null || progressBar === null) {
      return;
    }
    const scrollTop = htmlElement.scrollTop;
    const scrollHeight = htmlElement.scrollHeight;
    const clientHeight = htmlElement.clientHeight;

    const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
    progressBar.style.width = progress < 1 ? "0" : progress + "%";
  };

  useEffect(() => {
    window.addEventListener("scroll", setProgress);
    return () => window.removeEventListener("scroll", setProgress);
  }, []);

  return <ProgressBar className="progress-bar" />;
};

export default ScorllProgressBar;
