<template>
  <div class="divide-y divide-slate-100 px-2 md:pl-20">
    <div class="w-full pt-1">
      <ul class="divide-y divide-slate-300">
        <li class="mx-4 md:mx-0" v-for="item in posts">
          <a class="w-full mx-5 md:w-2/3 "  :href="withBase(item.regularPath.toLowerCase())">
            <div class="title">{{ item.frontMatter.title }}</div>
            <div class="date">{{ transDate(item.frontMatter.date) }}</div>
            <div class="text-justify">{{ item.frontMatter.description }}</div>
          </a>
        </li>
      </ul>
    </div>
    <div class="flex flex-row justify-center items-center py-3">
      <button :class="['left pl-3 md:pl-20 ', pageCurrent <= 1 ? 'opacity-20' : 'opacity-100']"
        :disabled="pageCurrent <= 1" @click="go(pageCurrent - 1);">
        Previous page
      </button>
      <div v-if="pagesNum > 1">{{ `${pageCurrent}/${pagesNum}` }}</div>
      <button
        :class="['right pr-3 ', pageCurrent >= pagesNum ? 'opacity-20' : 'opacity-100']"
        :disabled="pageCurrent >= pagesNum" @click="go(pageCurrent + 1)">
        Next page
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useData, withBase } from "vitepress";

interface post {
  regularPath: string;
  frontMatter: object;
}
const { theme } = useData();

// get posts
let postsAll = theme.value.posts || [];
// get postLength
let postLength = theme.value.postLength;
// get pageSize
let pageSize = theme.value.pageSize;
//  pagesNum
let pagesNum =
  postLength % pageSize === 0
    ? postLength / pageSize
    : postLength / pageSize + 1;
pagesNum = parseInt(pagesNum.toString());
//pageCurrent
let pageCurrent = ref(1);
// filter index post
postsAll = postsAll.filter((item: post) => {
  return item.regularPath.toLowerCase().indexOf("index") < 0;
});
// pagination
let allMap = {};
for (let i = 0; i < pagesNum; i++) {
  allMap[i] = [];
}
let index = 0;
for (let i = 0; i < postsAll.length; i++) {
  if (allMap[index].length > pageSize - 1) {
    index += 1;
  }
  allMap[index].push(postsAll[i]);
}
// set posts
let posts = ref([]);
posts.value = allMap[pageCurrent.value - 1];

// click pagination
const go = (i) => {
  pageCurrent.value = i;
  posts.value = allMap[pageCurrent.value - 1];
};
// timestamp transform
const transDate = (date: string) => {
  const dateArray = date.split("-");
  let year = dateArray[0],
    month = ``,
    day = dateArray[2];
  switch (dateArray[1]) {
    case "1":
    case "01":
      month = `Jan`;
      break;
    case "2":
    case "02":
      month = `Feb`;
      break;
    case "3":
    case "03":
      month = `Mar`;
      break;
    case "4":
    case "04":
      month = `Apr`;
      break;
    case "5":
    case "05":
      month = `May`;
      break;
    case "6":
    case "06":
      month = `Jun`;
      break;
    case "7":
    case "07":
      month = `Jul`;
      break;
    case "8":
    case "08":
      month = `Aug`;
      break;
    case "9":
    case "09":
      month = `Sep`;
      break;
    case "10":
      month = `Oct`;
      break;
    case "11":
      month = `Nov`;
      break;
    case "12":
      month = `Dec`;
      break;
    default:
      month = `Month`;
  }
  return `${month} ${day}, ${year}`;
};
</script>
  
<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: calc(var(--vp-layout-max-width) - 64px);
  height: var(--vp-nav-height);
  pointer-events: none;
}

.blog-title {
  text-align: center;
  font-weight: bold;
  font-size: 2rem;
  margin-top: 24px;
}

.title {
  color: var(--vp-c-brand-light);
  font-size: 1.2em;
  font-weight: bold;
}

.date {
  padding-bottom: 7px;
}

button {
  display: inline-block;
  position: relative;
  color: var(--vp-c-color-d);
  cursor: pointer;
  font-weight: bold;
}

button::after {
  content: "";
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: var(--vp-c-color-d);
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}

button:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}

.left {
  position: absolute;
  left: 0;
}

.right {
  position: absolute;
  right: 0;
}
</style>
  