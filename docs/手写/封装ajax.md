# 封装ajax
```javascript
function ajax({url,method="GET",params={},data={}}){
    return new Promise((resolve,reject)=>{
        //处理params参数,例如{id:1,xxx:'abc'}
        let str=""
        Object.keys(params).forEach(key=>{
            str+=`${key}=${params[key]}&`
        })
        if(str)str.slice(0,-1)
        url=url+str

        const xhr=new XMLHttpRequest();
        xhr.open(method,url)
        xhr.onreadystatechange=function(){
            if(xhr.readyState===4){
                if(xhr.status>=200&&xhr.status<300){
                    resolve({
                        status:xhr.status,
                        statusText:xhr.statusText,
                        data:xhr.response
                    })
                }else{
                    reject(new Error("请求失败，状态码："+xhr.status))
                }
            }
        }

        //处理method方法
        method=method.toUpperCase() //method转大写
        if(method=="GET"){
            xhr.send()
        }else if(method=="POST"||method=="PUT"||method=="DELETE"){
            //设置文件类型
            xhr.setRequestHeader("Content-Type","application/json")
            xhr.send(JSON.stringify(data))
        }
    })
}
ajax({url:"https://www.baidu.com",method:"get"}).then(res=>console.log(res))


/* 发送特定请求的静态方法 */
axios.get = function (url, options={}) {
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
```


