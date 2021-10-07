# 手写async、await
## 一个使用async、await的例子
```javascript
const getData = () => new Promise(resolve => setTimeout(() => resolve("data"), 1000))
 
async function test() {
  const data = await getData()
  console.log('data: ', data);
  const data2 = await getData()
  console.log('data2: ', data2);
  return 'success'
}
 
test().then(res => console.log(res))
//输出：
//1秒后 
data:  data
//1秒后 
data2:  data
success
```
## 思路：将await编译成yield 并给生成器写一个高阶函数，因为生成器自己不会自动执行
```javascript
var test = asyncToGenerator(
     function* testG() {
       // await被编译成了yield
       const data = yield getData()
       console.log('data: ', data);
       const data2 = yield getData()
       console.log('data2: ', data2);
       return 'success'
     }
 )
```
## 实现
```javascript
function asyncToGenerator(generatorFunc){
  // 包装后返回一个新函数，而不是包装的时候就执行掉
  return function(){
    const gen = generatorFunc.apply(this, arguments)
    // async要返回一个Promise对象
    return new Promise((resolve, reject)=>{
      function step(key, arg){
        let generatorResult
        try{
          generatorResult = gen[key](arg)
        }catch(error){
          reject(error)
          return
        }
        const {value, done} = generatorResult
        if(done){
          resolve(value)
          return
        }else{
          return Promise.resolve(value).then((val)=>{
            step('next',val)
          },(err)=>{
            step('throw',err)
          })
        }
      }
      step('next')
    })
  }
}
```
## 测试
```javascript
function asyncToGenerator(generatorFunc){
  // 包装后返回一个新函数，而不是包装的时候就执行掉
  return function(){
    const gen = generatorFunc.apply(this, arguments)
    // async要返回一个Promise对象
    return new Promise((resolve, reject)=>{
      function step(key, arg){
        let generatorResult
        try{
          generatorResult = gen[key](arg)
        }catch(error){
          reject(error)
          return
        }
        const {value, done} = generatorResult
        if(done){
          resolve(value)
          return
        }else{
          return Promise.resolve(value).then((val)=>{
            step('next',val)
          },(err)=>{
            step('throw',err)
          })
        }
      }
      step('next')
    })
  }
}
const getData = () => new Promise(resolve => setTimeout(() => resolve("data"), 1000))
 
var test = asyncToGenerator(
     function* testG() {
       // await被编译成了yield
       const data = yield getData()
       console.log('data: ', data);
       const data2 = yield getData()
       console.log('data2: ', data2);
       return 'success'
     }
 )
 
test().then(res => console.log(res))
```


