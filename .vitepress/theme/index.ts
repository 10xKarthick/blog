import { h } from 'vue'
import Theme from "vitepress/theme";
import './tailwind.postcss'
import './style.css'

import Home from "./components/home.vue";
import Posts from "./components/posts.vue";
import Page from "./components/page.vue";
import Tags from "./components/tags.vue";
import About from "./components/about.vue";

export default {
  ...Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    // register global components
    app.component("Home", Home);
    app.component("Posts", Posts);
    app.component("Page", Page);
    app.component("Tags", Tags);
    app.component("About", About);
  },
};
