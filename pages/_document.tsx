import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
