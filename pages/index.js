// pages/index.js
import { gql } from 'graphql-request';
import { client } from '../lib/wp-client';
import { getSiteData } from '../lib/site';
import Header from '../components/Header';
import Footer from '../components/Footer';


export async function getStaticProps() {
  const query = gql`
query AllPosts {
posts {
nodes { id slug title }
}
}
`;


  try {
    const postsRes = await client.request(query);
    const siteData = await getSiteData();


    return {
      props: {
        posts: postsRes.posts.nodes || [],
        headerMenu: siteData.headerMenu,
        footerMenu: siteData.footerMenu,
      },
      revalidate: 10,
    };
  } catch (err) {
    console.error('Error fetching index data:', err);
    return { props: { posts: [], header: null, footer: null } };
  }
}


export default function Home({ posts, header, footer }) {
  return (
    <>
      {/* <Header header={header} /> */}


      <main style={{ padding: '1rem' }}>
        <h1>WordPress Posts</h1>
        <ul>
          {posts.map((p) => (
            <li key={p.id}><a href={`/posts/${p.slug}`}>{p.title}</a></li>
          ))}
        </ul>
      </main>


      {/* <Footer footer={footer} /> */}
    </>
  );
}