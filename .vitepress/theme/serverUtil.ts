import globby from "globby";
import matter from "gray-matter";

type Post = {
  frontMatter: {
    date?: string;
    title?: string;
    tags?: string[];
    description?: string;
  };
  regularPath: string;
};

export function getPosts(): Post[] {
  let paths = getPostMDFilePaths();
  let posts = 
    paths.map((item) => {
      const { data } = matter.read(item);
      data.date = _convertDate(data.date);
      return {
        frontMatter: data,
        regularPath: `/${item.replace(".md", "")}`,
      };
    });
  posts.sort(_compareDate);
  return posts;
}

function _convertDate(date = new Date().toString()) {
  const json_date = new Date(date).toJSON();
  return json_date.split("T")[0];
}

function _compareDate(obj1: any, obj2: any) {
  return obj1.frontMatter.date < obj2.frontMatter.date ? 1 : -1;
}

function getPostMDFilePaths() {
  let paths = globby.sync(["**.md"], {
    ignore: ["node_modules", "README.md"],
  });
  return paths.filter((item) => item.includes("posts/"));
}

export function getPostLength() {
  // getPostMDFilePath return type is object not array
  return [...getPostMDFilePaths()].length;
}

export function getRecentPosts() {
  return getPosts().slice(0, 9);
}

function getItem(item :Post) {
  return { text: item.frontMatter.title, link: item.regularPath };
}

export function getSideBar() {
  let genereatedSidebar: any[] = [ 
    {
      text: "Recent Posts",
      items: [...getRecentPosts().map(x => getItem(x))]
    }
   ]

   return genereatedSidebar;
}