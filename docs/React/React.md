## 组件更新生命周期

示例：https://stackblitz.com/edit/react-7g8s8d?file=index.js

输出

```
parent componentWillMount
child componentWillMount
child componentDidMount
parent componentDidMount
parent shouldUpdate{}{name: "second time"}
parent componentWillUpdate
childvwillReceiveProps{name: "second time"}
child shouldUpdate{name: "second time"}{}
child componentWillUpdate
child componentDidUpdate
parent componentDidUpdate
```
