// pages/posts/[slug].js
import { gql } from 'graphql-request';
import { client } from '../../lib/wp-client';
import { getSiteData } from '../../lib/site';
import Header from '../../components/Header';
import Footer from '../../components/Footer';


export async function getStaticPaths() {
  const query = gql`query AllSlugs { posts { nodes { slug } } }`;
  const { posts } = await client.request(query);


  return {
    paths: posts.nodes.map(p => ({ params: { slug: p.slug } })),
    fallback: 'blocking',
  };
}


export async function getStaticProps({ params }) {
  const query = gql`
query PostBySlug($slug: String!) {
postBy(slug: $slug) { id title content }
}
`;


  try {
    const { postBy } = await client.request(query, { slug: params.slug });
    if (!postBy) return { notFound: true };


    const siteData = await getSiteData();


    return {
      props: { post: postBy, header: siteData.header, footer: siteData.footer },
      revalidate: 10,
    };
  } catch (err) {
    console.error('Error fetching post:', err);
    return { notFound: true };
  }
}


export default function Post({ post, header, footer }) {
  return (
    <>
      <Header header={header} />


      <article style={{ padding: '1rem' }}>
        <h1 dangerouslySetInnerHTML={{ __html: post.title }} />
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>


      <Footer footer={footer} />
    </>
  );
}