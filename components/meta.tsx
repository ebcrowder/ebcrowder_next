import Head from "next/head";

const Meta = () => {
  return (
    <Head>
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon.png"
      />
      <link rel="shortcut icon" href="/favicon/favicon.png" />
      <link
        rel="alternate"
        type="application/rss+xml"
        href="https://ebcrowder.dev/feed.xml"
      />
      <meta name="robots" content="follow, index" />
      <meta name="description" content="Eric Crowder - developer blog" />
      <meta property="og:site_name" content="Eric Crowder - blog" />
      <meta property="og:title" content="Eric Crowder - blog" />
      <meta property="og:description" content="Eric Crowder - developer blog" />
      <meta property="og:image" content="/favicon/favicon.png" />
    </Head>
  );
};

export default Meta;
