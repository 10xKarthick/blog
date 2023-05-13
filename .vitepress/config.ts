import { getPostLength, getPosts, getSideBar } from "./theme/serverUtil";

// https://vitepress.dev/reference/site-config
async function config() {
  return {
    title: "Karthick Soundarrajan",
    description:
      "Welcome to my personal blog.  I write about web development, programming, and other stuff.",
    head: [
      [
        "meta",
        {
          property: "og:title",
          content: "Home",
        },
      ],
      [
        "meta",
        {
          property: "og:description",
          content: "Blogger | Freelancer | Consultant",
        },
      ],
      [
        "link",
        {
          rel: "stylesheet",
          href: "https://unpkg.com/tailwindcss@2.0.4/dist/tailwind.min.css",
        },
      ],
    ],
    cleanUrls: "with-subfolders",
    lastUpdated: false,
    themeConfig: {
      // https://vitepress.dev/reference/default-theme-config
      docsDir:"/",
      posts: getPosts(),
      pageSize:5,
      postLength: getPostLength(),
      nav: [
        { text: "Home", link: "/" },
        { text: "Posts", link: "/posts" },
        { text: "Tags", link: "/tags" },
        { text: "About Me", link: "/about" },
      ],
      sidebar: getSideBar(),
      aside: false,
      socialLinks: [
        { icon: 'github', link: 'https://github.com/' },
        { icon: 'twitter', link: 'https://www.twitter.com/' },
        { icon: 'linkedin', link: 'https://www.linkedin.com/' },
        { icon: 'discord', link: 'https://discord.com/' }
      ]
    },
  };
}

export default config();