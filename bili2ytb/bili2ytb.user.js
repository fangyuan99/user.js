// ==UserScript==
// @name         bili2ytb
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Add YouTube search icon
// @author       fangyuan99
// @match        https://www.bilibili.com/video/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
  "use strict";

  // 创建一个观察器
  const observer = new MutationObserver((mutations, obs) => {
    const h1 = document.querySelector("h1");
    if (h1 && !h1.querySelector(".youtube-search-icon")) {
      // 创建SVG元素
      const svg = document.createElement("img");
      svg.className = "youtube-search-icon"; // 添加类名以防重复添加
      svg.src =
        "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/youtube.svg";
      svg.style.width = "20px";
      svg.style.height = "20px";
      svg.style.marginLeft = "10px";
      svg.style.cursor = "pointer";
      svg.style.verticalAlign = "middle"; // 垂直对齐
      svg.style.display = "inline-block"; // 确保是内联元素

      // 添加点击事件
      svg.addEventListener("click", function () {
        const h1Text = document.querySelector("h1")?.innerText || "";
        const upName = document.querySelector(".up-name")?.innerText || "";

        const searchQuery = encodeURIComponent(`${h1Text} ${upName}`);
        const youtubeUrl = `https://www.youtube.com/results?search_query=${searchQuery}`;

        window.open(
          youtubeUrl,
          "YouTubeSearch",
          "width=800,height=600,left=200,top=200"
        );
      });

      // 添加hover效果
      svg.addEventListener("mouseover", function () {
        this.style.opacity = "0.8";
      });

      svg.addEventListener("mouseout", function () {
        this.style.opacity = "1";
      });

      h1.appendChild(svg);
    }
  });

  // 开始观察整个文档
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });

  // 5分钟后断开观察器，避免持续消耗资源
  setTimeout(() => {
    observer.disconnect();
  }, 300000);
})();
