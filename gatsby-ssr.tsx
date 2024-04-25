import { RenderBodyArgs } from "gatsby";
import React from "react";

import { getCssText } from "./src/stitches.config";

export const onRenderBody = ({ setHeadComponents }: RenderBodyArgs) => {
  setHeadComponents([
    <style
      key="stitches"
      id="stitches"
      dangerouslySetInnerHTML={{
        __html: getCssText(),
      }}
    />,
    <script
      key="googleTagManager"
      async
      src="https://www.googletagmanager.com/gtag/js?id=G-LY5PD0355G"
    />,
    <script
      key="googleAnalytics"
      data-nscript="lazyOnload"
      id="google-analytics"
      dangerouslySetInnerHTML={{
        __html: `window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-LY5PD0355G');`,
      }}
    />,
    <script
      key="googleAdsense"
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6528609889280307"
      crossOrigin="anonymous"
    />,
  ]);
};
