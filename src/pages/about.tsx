import { PageProps, graphql } from "gatsby";
import React from "react";

import Profile from "~/components/Profile";
import Seo from "~/components/Seo";
import { useSeo } from "~/hooks/useSeo";
import Layout from "~/layout";

const AboutPage = ({
  data,
  location,
}: PageProps<GatsbyTypes.AboutPageQuery>) => {
  const siteMetadata = useSeo().site?.siteMetadata;

  const siteUrl = data.site?.siteMetadata?.siteUrl ?? "";
  const siteTitle = data.site?.siteMetadata?.title ?? "";
  const siteThumbnail = data.site?.siteMetadata?.thumbnail;

  const meta: Metadata[] = [];
  if (siteThumbnail) {
    const properties = ["og:image", "twitter:image"];

    for (const property of properties) {
      meta.push({
        property,
        content: `${siteUrl}${siteThumbnail}`,
      });
    }
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        lang="ko"
        title={siteMetadata?.title ?? ""}
        description={siteMetadata?.description ?? ""}
        meta={meta}
        noSiteName
      />
      <Profile />
      <h1>/* 작성중 */</h1>

      {/* <br />

      <h1>I am</h1>
      <ul>
        <li>백석고등학교 졸업</li>
        <li>중앙대학교 창의ICT공과대학 컴퓨터공학부 졸업</li>
        <li>볼트마이크로 S/W 개발팀 인턴</li>
        <li>볼트마이크로 S/W 개발팀 스페셜리스트</li>
      </ul>
      <p>들어가야할거 : 기간</p>

      <br />

      <h1>Project</h1>
      <ul>
        <li>Used-Action-System</li>
        <li>Lck Esports Manager</li>
        <li>일기예복</li>
        <li>위스키 리뷰</li>
        <li>FTIsland</li>
        <li>CameraFi Studio</li>
        <li>CameraFi Studio Admin</li>
      </ul>
      <p>
        들어가야할거 : 기간, 규모, 간단한 기술스택, 썸네일, 역할, 성과, 문제 및
      </p>
      <p>해결 형식 : 카드형으로 제작하기</p> */}
    </Layout>
  );
};

export default AboutPage;

export const pageQuery = graphql`
  query AboutPage {
    site {
      siteMetadata {
        title
        siteUrl
        thumbnail
      }
    }
  }
`;
