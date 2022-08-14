---
home: true
heroImage: /logo/klee.jpg
# heroText: leinaldo
heroText: 前端知识整理
# tagline: 前端知识整理
# tagline: Hello World!
# actionText: I need offer →
actionText: Go Go Go →
actionLink: /浏览器/浏览器内核的理解
# features:
#   - title: 8小时工作
#     details: i need offer
#   - title: 8小时玩耍
#     details: 和可莉去炸鱼
#   - title: 8小时休息
#     details: 呼呼睡大觉
footer: MIT Licensed | Copyright © 2021-present Leinaldo
---

<style>
  .flex{
    display:flex;
    justify-content:center;
    align-items:center
  }
  .hello-world {
  /*hack*/
  box-sizing: content-box;
  width: 11ch;
  overflow: hidden;
  white-space: nowrap;
  font-size:40px;
  animation: typing 2s steps(11),blink 0.5s step-end infinite alternate;
  border-right: 5px solid black;
  font-family: monospace;
}

/*hack */
@keyframes typing {
  from {
    width: 0;
  }
}
@keyframes blink {
  50% {
    border-color: transparent;
  }
}
  </style>

<div class="flex">
  <div class="hello-world">
    <!-- Hello World! -->
    by Leinaldo
  </div>
</div>
