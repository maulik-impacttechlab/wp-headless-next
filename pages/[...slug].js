// pages/[...slug].js
import React from "react";
import { gql } from "graphql-request";
import { client } from "../lib/wp-client";
import { getSiteData } from "../lib/site";
import Header from "../components/Header";
import Footer from "../components/Footer";

export async function getStaticPaths() {
  if (!client) {
    console.warn("No WP_GRAPHQL, skipping static paths.");
    return { paths: [], fallback: "blocking" };
  }
  try {
    const QUERY = gql`query { pages(first: 1000) { nodes { uri } } }`;
    const data = await client.request(QUERY);
    const paths = (data.pages?.nodes || [])
      .map(p => (p?.uri || "").replace(/^\/|\/$/g, ""))
      .filter(trim => trim !== "") // IMPORTANT: skip "/"
      .map(trim => ({ params: { slug: trim.split("/") } }));
    return { paths, fallback: "blocking" };
  } catch (e) {
    console.warn("Could not fetch static paths:", e);
    return { paths: [], fallback: "blocking" };
  }
}

export async function getStaticProps({ params }) {
  const segs = params?.slug ?? [];
  if (segs[0] === ".well-known") return { notFound: true, revalidate: 10 };
  if (!client) {
    console.warn("No WP_GRAPHQL, cannot resolve page.");
    return { notFound: true, revalidate: 10 };
  }

  const uri = "/" + segs.join("/") + "/";

  const QUERY = gql`
    query NodeByUri($uri: String!) {
      nodeByUri(uri: $uri) {
        __typename
        ... on Page { id title content }
        ... on Post { id title content }
      }
    }
  `;

  try {
    const { nodeByUri } = await client.request(QUERY, { uri });
    if (!nodeByUri) return { notFound: true, revalidate: 10 };

    let headerMenu = null, footerMenu = null;
    try {
      const site = await getSiteData();
      headerMenu = site.headerMenu || null;
      footerMenu = site.footerMenu || null;
    } catch {}

    return {
      props: { node: nodeByUri, headerMenu, footerMenu },
      revalidate: 60,
    };
  } catch (err) {
    console.error("[...slug] getStaticProps error:", err);
    return { notFound: true, revalidate: 10 };
  }
}

// ✅ Default React component export
export default function GenericPage({ node, headerMenu, footerMenu }) {
  if (!node) return <div>Not found</div>;
  return (
    <>
      <Header menu={headerMenu} />
      <main className="container" style={{ padding: "1rem" }}>
        <h1 dangerouslySetInnerHTML={{ __html: node.title }} />
        <div dangerouslySetInnerHTML={{ __html: node.content }} />
      </main>
      <Footer footer={footerMenu} />
    </>
  );
}
