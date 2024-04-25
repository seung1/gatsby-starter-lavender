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
      async
      src="https://www.googletagmanager.com/gtag/js?id=G-LY5PD0355G"
    />,
    <script
      data-nscript="lazyOnload"
      id="google-analytics"
      dangerouslySetInnerHTML={{
        __html: `window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-LY5PD0355G');`,
      }}
    />,
  ]);
};
