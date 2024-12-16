
### 为什么fetch有2个await??

```js
const response = await fetch(...)
const json = await response.json()
```

因为第一个await等待的是请求头 第二个等待的是body，当body是流式数据的时候 我们就可以读取一点输出一点，实现chatgpt的流式输出效果

### fetch实现流式输出核心代码
reference：https://github.com/mdn/dom-examples/blob/main/streams/simple-pump/index.html

#### 效果
![image](./images/fetch-stream-effect.gif)
![image](./images/fetch-stream-net.gif)
#### 代码
服务端 

node.js
```js

const express = require('express');
const app = express();

app.get('/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Transfer-Encoding', 'chunked');
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins

  const messages = ['Hello', ' ', 'this', ' ', 'is', ' ', 'streaming', ' ', 'output!'];

  let index = 0;
  const interval = setInterval(() => {
    if (index < messages.length) {
      res.write(messages[index]);
      index++;
    } else {
      clearInterval(interval);
      res.end();
    }
  }, 500); // Simulate delay
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
```

前端 
```js
const outputElement = document.getElementById('output');

async function fetchStream() {
  const response = await fetch('http://127.0.0.1:3000/stream');
  const reader = response.body?.getReader();
  const decoder = new TextDecoder('utf-8');

  if (!reader) {
    console.error('Stream reader not available.');
    return;
  }

  let done = false;
  while (!done) {
    const { value, done: readerDone } = await reader.read();
    done = readerDone;
    if (value) {
      const chunk = decoder.decode(value, { stream: true });
      outputElement.textContent += chunk; // Append new content
    }
  }
}

fetchStream();
```