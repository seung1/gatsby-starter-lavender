import { useState, useEffect, useCallback } from "react";

export const useCheckScroll = () => {
  const [isAtTop, setIsAtTop] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsAtTop(scrollTop === 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.offsetHeight,
      behavior: "smooth",
    });
  };

  return { isAtTop, scrollToTop, scrollToBottom };
};
