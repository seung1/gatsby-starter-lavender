import * as qs from "query-string";
import { useEffect, useState } from "react";

import { TAG } from "~/constants";

export const useTag = (): [string, (t: string) => void] => {
  // 초기 탭 설정
  const [currentTag, setCurrentTag] = useState<string>(TAG.MAIN);

  const onPopState = () => {
    const params = qs.parse(location.search);
    const tag = params.tag as string;

    // 함수가 실행될때 쿼리파라미터에 탭이 있으면 탭, 없으면 메인으로 설정
    setCurrentTag(tag ?? TAG.MAIN);
  };

  useEffect(() => {
    const params = qs.parse(location.search);
    const tag = params.tag as string;

    // 렌더링이 되자마자 탭이 있으면 탭을 설정
    if (tag) {
      setCurrentTag(tag);
    }

    window.addEventListener("popstate", onPopState);

    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  useEffect(() => {
    const params = qs.parse(location.search);

    if (currentTag === (params.tag ?? TAG.MAIN)) {
      return;
    }

    // 현재 태그가 메인이면 쿼리파라미터를 지우고 아니면 쿼리파라미터를 현재 태그에 맞게 설정
    if (currentTag === TAG.MAIN) {
      delete params.tag;
    } else {
      params.tag = currentTag;
    }

    const nextUrl = qs.stringifyUrl(
      {
        url: location.pathname,
        query: params,
      },
      {
        skipNull: true,
        skipEmptyString: true,
      }
    );

    history.pushState(params, "", nextUrl);
  }, [currentTag]);

  return [currentTag, setCurrentTag];
};
