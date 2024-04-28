import * as qs from "query-string";
import { useEffect, useState } from "react";

export const useCheckMainPage = (): boolean => {
  const [currentPage, setCurrentPage] = useState("/");

  useEffect(() => {
    if (window) {
      setCurrentPage(window.location.pathname);
    }
  }, []);

  return currentPage === "/";
};
