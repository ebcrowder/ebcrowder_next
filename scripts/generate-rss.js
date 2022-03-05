const { promises: fs } = require("fs");
const path = require("path");
const RSS = require("rss");
const grayMatter = require("gray-matter");

(async () => {
  const feed = new RSS({
    title: "Eric Crowder",
    site_url: "https://ebcrowder.dev",
    feed_url: "https://ebcrowder.dev/feed.xml",
  });

  const posts = await fs.readdir(path.join(__dirname, "..", "_posts"));

  await Promise.all(
    posts.map(async (name) => {
      const content = await fs.readFile(
        path.join(__dirname, "..", "_posts", name)
      );
      const frontmatter = grayMatter(content);

      feed.item({
        title: frontmatter.data.title,
        url: "/posts/" + name.replace(/\.mdx?/, ""),
        date: frontmatter.data.date,
        description: frontmatter.data.description,
        categories: frontmatter.data.tags,
      });
    })
  );

  await fs.writeFile("./public/feed.xml", feed.xml({ indent: true }));
})();
