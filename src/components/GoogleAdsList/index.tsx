import React, { useEffect } from "react";

import { Container } from "./styles";

const GoogleAdsList = () => {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <Container>
      <ins
        className="adsbygoogle"
        data-ad-client="ca-pub-4449874113484547"
        data-ad-slot="4708574537"
        style={{
          display: "inline-block",
          width: `700px`,
          height: `125px`,
        }}
      ></ins>
    </Container>
  );
};

export default GoogleAdsList;
