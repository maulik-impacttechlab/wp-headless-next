// pages/[[...slug]].js
import React from 'react';
import { gql } from 'graphql-request';
import { client } from '../lib/wp-client';
import Header from '../components/Header';
import Footer from '../components/Footer';

/**
 * Catch-all page that resolves WP nodes by URI using nodeByUri
 * Works for pages, posts, and other node types that WPGraphQL supports.
 */

export async function getStaticPaths() {
  const query = gql`
    query AllPagesUris {
      pages(first: 1000) {
        nodes {
          uri
        }
      }
    }
  `;

  try {
    const { pages } = await client.request(query);
    const nodes = pages?.nodes || [];

    // Log how many URIs we got (visible in server terminal)
    console.log(`[getStaticPaths] fetched ${nodes.length} page uris`);

    const paths = nodes.map(n => {
      // normalize: remove leading/trailing slash, split to array
      const trimmed = (n.uri || '').replace(/^\/|\/$/g, '');
      const slugArr = trimmed === '' ? [] : trimmed.split('/');
      return { params: { slug: slugArr } };
    });

    // optional: log first 10 paths for debugging
    console.log('[getStaticPaths] sample paths:', paths.slice(0, 10));

    return { paths, fallback: 'blocking' };
  } catch (err) {
    console.error('[getStaticPaths] error:', err);
    return { paths: [], fallback: 'blocking' };
  }
}

export async function getStaticProps({ params }) {
  try {
    // reconstruct URI: params.slug is an array or undefined
    const slugArr = params?.slug ?? [];
    const uri = '/' + (slugArr.length ? slugArr.join('/') + '/' : '');

    console.log(`[getStaticProps] requested uri="${uri}"`);

    const query = gql`
      query NodeByUri($uri: String!) {
        nodeByUri(uri: $uri) {
          __typename
          ... on Page {
            id
            title
            content
          }
          ... on Post {
            id
            title
            content
          }
          # add other node types if you need them
        }
      }
    `;

    const { nodeByUri } = await client.request(query, { uri });

    // log result shape for debugging
    console.log('[getStaticProps] nodeByUri:', !!nodeByUri, nodeByUri ? nodeByUri.__typename : null);

    if (!nodeByUri) {
      // Not found on WordPress side
      return { notFound: true, revalidate: 10 };
    }

    // Optionally fetch global site data (header/footer) here if you use them.
    // import { getSiteData } and call it to get menu/header/footer.

    return {
      props: {
        node: nodeByUri,
      },
      revalidate: 10,
    };
  } catch (err) {
    console.error('[getStaticProps] error:', err);
    return { notFound: true, revalidate: 10 };
  }
}

export default function GenericPage({ node }) {
  if (!node) return <div>Not found</div>;

  return (
    <>
      <Header />
      <main style={{ padding: '1rem' }}>
        <h1 dangerouslySetInnerHTML={{ __html: node.title }} />
        <div dangerouslySetInnerHTML={{ __html: node.content }} />
      </main>
      <Footer />
    </>
  );
}
