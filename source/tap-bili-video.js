//适用于哔哩哔哩视频播放页面(部分)   “https://www.bilibili.com/video/*”开头的网址

document.querySelector("#bilibili-player-placeholder-top").addEventListener("touchmove",(e) => {console.log(e.touches[0].clientX)})