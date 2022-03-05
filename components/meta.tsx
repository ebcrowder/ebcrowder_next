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
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link rel="shortcut icon" href="/favicon/favicon.png" />
      <meta name="theme-color" content="#000" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <meta name="description" content="Eric Crowder blog" />
      <meta property="og:image" content="/favicon/favicon.png" />
    </Head>
  );
};

export default Meta;
