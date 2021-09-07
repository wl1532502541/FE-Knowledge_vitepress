# ajax
## 什么是ajax？
Asynchronous JavaScript + XML **ajax 是一种用于创建快速动态网页的技术**。 通过在后台与服务器进行少量数据交换,AJAX 可以使网页实现异步更新.
优势：
1. 通过异步模式，提升了用户体验
2. 优化了浏览器和服务器之间的传输，减少不必要的数据往返，减少了带宽占用
3. Ajax引擎在客户端运行，承担了一部分本来由服务器承担的工作，从而减少了大用户量下的服务器负载。
4.AJAX最大的特点是什么。
Ajax可以实现动态不刷新（局部刷新）
就是能在不更新整个页面的前提下维护数据。这使得Web应用程序更为迅捷地回应用户动作，并避免了在网络上发送那些没有改变过的信息。
## 技术组成部分
HTML，css，dom，xml，xmlHttpRequest，javascript
### XmlHttpRequest对象
Ajax的核心是JavaScript对象XmlHttpRequest。该对象在Internet Explorer 5中首次引入，它是一种支持异步请求的技术。简而言之，XmlHttpRequest使您可以使用JavaScript向服务器提出请求并处理响应，而不阻塞用户。通过XMLHttpRequest对象，Web开发人员可以在页面加载以后进行页面的局部更新。
#### 常用方法和属性
open(“method”,”URL”) 建立对服务器的调用，第一个参数是HTTP请求 方式可以为GET，POST或任何服务器所支持的您想调用的方式。第二个参数是请求页面的URL。
send()方法，发送具体请求
abort()方法，停止当前请求
readyState属性 请求的状态 有5个可取值0=未初始化 ，1=正在加载2=以加载，3=交互中，4=完成
![image.png](https://cdn.nlark.com/yuque/0/2021/png/12821255/1628864457176-6bb4b709-73cd-46aa-bd35-24e6271baa61.png#align=left&display=inline&height=320&margin=%5Bobject%20Object%5D&name=image.png&originHeight=320&originWidth=1002&size=26151&status=done&style=none&width=1002)
responseText 属性 服务器的响应，表示为一个串
reponseXML 属性 服务器的响应，表示为XML
status 服务器的HTTP状态码，200对应ok 400对应not found
## 手写axios
```javascript
/* 发送任意类型请求的函数 */
function axios({
  url,
  method='GET',
  params={},
  data={}
}) {
  // 返回一个promise对象
  return new Promise((resolve, reject) => {
    // 处理method(转大写)
    method = method.toUpperCase()
    
    // 处理query参数(拼接到url上)   id=1&xxx=abc
    /* { id: 1, xxx: 'abc'} */
    let queryString = ''
    Object.keys(params).forEach(key => {
      queryString += `${key}=${params[key]}&`
    })
    if (queryString) { // id=1&xxx=abc&
      // 去除最后的&
      queryString = queryString.substring(0, queryString.length-1)
      // 接到url
      url += '?' + queryString
    }
    // 1. 执行异步ajax请求
    // 创建xhr对象
    const request = new XMLHttpRequest()
    // 打开连接(初始化请求, 没有请求)
    request.open(method, url, true)
    
    // 发送请求
    if (method==='GET') {
      request.send()
    } else if (method==='POST' || method==='PUT' || method==='DELETE'){
      // 告诉服务器请求体的格式是json
      request.setRequestHeader('Content-Type', 'application/json;charset=utf-8') 
       // 发送json格式请求体参数
      request.send(JSON.stringify(data))
    }
    
    // 绑定状态改变的监听
    request.onreadystatechange = function () {
      // 如果请求没有完成, 直接结束
      if (request.readyState!==4) {
        return
      }
      // 如果响应状态码在[200, 300)之间代表成功, 否则失败
      const {status, statusText} = request
      // 2.1. 如果请求成功了, 调用resolve()
      if (status>=200 && status<=299) {
        // 准备结果数据对象response
        const response = {
          data: JSON.parse(request.response),
          status,
          statusText
        }
        resolve(response)
      } else { // 2.2. 如果请求失败了, 调用reject()
        reject(new Error('request error status is ' + status))
      }
    }
  })
}
/* 发送特定请求的静态方法 */
axios.get = function (url, options) {
  return axios(Object.assign(options, {url, method: 'GET'}))
}
axios.delete = function (url, options) {
  return axios(Object.assign(options, {url, method: 'DELETE'}))
}
axios.post = function (url, data, options) {
  return axios(Object.assign(options, {url, data, method: 'POST'}))
}
axios.put = function (url, data, options) {
  return axios(Object.assign(options, {url, data, method: 'PUT'}))
}
export default axios
```


