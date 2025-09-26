// pages/_app.js
import Header from "../components/Header";
import Footer from "../components/Footer";
import Head from "next/head";
import "../styles/globals.css";
import "../styles/woo-style.css";

export default function MyApp({ Component, pageProps }) {
  const { headerMenu, footerMenu } = pageProps;

  return (
    <>
    <Head>
         <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          integrity="sha384-9NDL3AtwA…"
          crossOrigin="anonymous"
        />
    </Head>
      <Header menu={headerMenu} />

      <div className="container">
        <Component {...pageProps} />
      </div>
      <Footer footer={footerMenu} />
    </>
  );
}
