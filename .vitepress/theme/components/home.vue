<template>
    <div class="container mx-auto">
        <div class="container mx-auto pt-1 flex flex-col">
            <div>
                <p class="text-center md:text-left text-2xl font-medium underline">Recent Blogs</p>
            </div>
            <div>
                <div class="divide-y divide-slate-300">
                    <div class="mx-4 md:mx-0" v-for="item in posts">
                        <a class="w-full mx-5 md:w-2/3 border-b-2 border-slate-300" :href="item.regularPath">
                            <p class="title font-bold text-lg cursor-pointer">{{ item.frontMatter.title }}</p>
                            <p class="date">{{ transDate(item.frontMatter.date) }}</p>
                            <p class="text-justify">{{ item.frontMatter.description }}</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useData } from "vitepress";

interface post {
    regularPath: string;
    frontMatter: {
        title: string;
        date: string;
        description: string;
    };
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
    return item.regularPath.indexOf("index") < 0;
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
let posts = ref<post[]>([]);
posts.value = allMap[pageCurrent.value - 1];

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
    max-width: 1152px;
    height: var(--vp-nav-height);
}

.blog-title {
    text-align: center;
    font-weight: bold;
}

.title {
    color: var(--vp-c-brand-light);
}

.date {
    padding-bottom: 7px;
}

a {
    height: 10px !important;
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