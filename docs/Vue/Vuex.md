# Vuex
## 什么是vuex
`VueX`是适用于在`Vue`项目开发时使用的状态管理工具。`Vue`为这些被多个组件频繁使用的值提供了一个统一管理的工具——`VueX`。在具有`VueX`的`Vue`项目中，我们只需要把这些值定义在`VueX`中，即可在整个`Vue`项目的组件中使用。
## 如何安装vuex
**npm**安装
```
npm i vuex -s
复制代码
```
## 如何使用vuex
**在项目的根目录下新增一个store文件夹，在该文件夹内创建index.js**
此时项目的`src`文件夹是这样的
```
│  App.vue
│  main.js
│
├─assets
│      logo.png
│
├─components
│      HelloWorld.vue
│
├─router
│      index.js
│
└─store
       index.js
复制代码
```
**在store.js文件中，引入vuex并且使用vuex，这里注意变量名是大写Vue和Vuex**
```
//store.js
import Vue from 'vue'
import Vuex from 'vuex'
//挂载Vuex
Vue.use(Vuex)
//创建VueX对象
const store = new Vuex.Store({
    state:{
        //存放的键值对就是所要管理的状态
        name:'helloVueX'
    }
})
export default store
复制代码
```
**将store挂载到当前项目的Vue实例当中去**
```
//main.js
import store from './store'
new Vue({
  el: '#app',
  router,
  store,  // 和router一样，将我们创建的Vuex实例挂载到这个vue实例中
  render: h => h(App)
})
复制代码
```
**在组件中使用Vuex**
例如在`App.vue`中，我们要将`state`中定义的`name`拿来在`h1标签`中显示
```
<template>
    <div id='app'>
        name:
        <h1>{{ $store.state.name }}</h1>
    </div>
</template>
复制代码
```
或者要在组件方法中使用
```
methods:{
    add(){
      console.log(this.$store.state.name)
    }
},
复制代码
```
具体的使用方法下面会详细介绍
**注意**:`vuex`的出现是为了解决组件间的通信问题,如果某个操作或者数据不涉及到公共操作,只是单一组件操作,不要把这些状态值或者`function`存储到`vuex`中,因为`vuex`会把自身挂载到所有组件上,不管当前组件是否用到里面的东西,因此这事实上肯定增加了性能的损耗的.
## VueX中的核心内容
`vuex`中，有默认的五种基本的对象：

- **state**：存储状态（变量）
- **getters**：对数据获取之前的再次编译，可以理解为`state`的计算属性。
- **mutations**：修改状态，并且是同步的。这个和我们组件中的自定义事件类似。
- **actions**：异步操作。
- **modules**：`store`的子模块
## 拆分成单文件
如果项目中的状态和方法过多,`index.js`文件看起来就会很臃肿并且不好维护,这个时候我们就可以把`state`,`getters`,`mutations`,`actions`拆分成单个文件,有利于进行管理
此时**目录结构**是这样的
```
store
│      
│
├─index.js
│      
│      
├─state.js
│      
│
├─getters.js
│      
│
├─mutations.js
│      
│
└─actions.js
复制代码
```
**index.js**
```
import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';
Vue.use(Vuex);
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});
复制代码
```
其他的文件中只需要`export`导出即可
**state.js**
```
export default {
  name:'hzw'
};
复制代码
```
**mutations.js**
```
export default {
 changeName(state, name) {
    state.name = name;
  },
};
复制代码
```
**getters.js**
```
export default {
 realName(state) {
    return "姓名:" + state.name
  },
};
复制代码
```
**actions.js**
```
export default {
 changeName({ commit }, name) {
        return commit('changeName', name)
    }
};
复制代码
```
这样看起来就更有结构感,也更易于维护了
## state以及mapState
### 什么是state
**state(vuex) ≈ data (vue)**
`vuex`的`state`和`vue`的`data`有很多相似之处,都是用于存储一些数据,或者说状态值.这些值都将被挂载数据和`dom`的双向绑定事件,也就是当值改变的时候可以触发`dom`的更新.
我们在`state.js`中声明一个状态`count`,初始值为`0`,然后在组件中输出它
```
// state.js 
export default {
  count:'0'
};
复制代码
```
```
//组件中
<template>
  <div class="hello">
    <h3>{{$store.state.count}}</h3>
  </div>
</template>
复制代码
```
结果如下图所示
![](https://cdn.nlark.com/yuque/0/2021/png/12821255/1627540554815-5828eeef-b7b5-403d-b925-0edfc600c0c6.png#align=left&display=inline&height=645&margin=%5Bobject%20Object%5D&originHeight=645&originWidth=746&size=0&status=done&style=none&width=746)
**注意**:虽然`state`和`data`有很多相似之处,但`state`在使用的时候一般被挂载到子组件的`computed`计算属性上,这样有利于`state`的值发生改变的时候及时响应给子组件.如果用`data`去接收`$store.state`,也是可以接收到值的,但是由于这只是一个简单的赋值操作,所以`state`中的状态改变的时候不能被`vue`中的`data`监听到.也可以通过`watch $store`去解决这个问题,但是稍微有点麻烦.
所以,最好还是用`computed`去接收`state`,如下,修改`state`的方法后面会学习,这里先进行展示.
```
//mutations.js
export default {
  add(state, n = 0) {
    return (state.count += n)
  },
  reduce(state, n = 0) {
    return (state.count -= n)
  }
}
复制代码
```
```
//组件中
<template>
  <div class="hello">
    <h3>{{$store.state.count}}</h3>
    <div>
      <button @click="add(10)">增加</button>
      <button @click="reduce(10)">减少</button>
      <div>computed:{{dataCount}}</div>
        <div>data: {{count}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HelloWorld',
   data () {
    return {
      dataCount: this.$store.state.count //用data接收
    }
  },
  computed:{
    count(){
      return this.$store.state.count //用computed接收
    }
  },
  methods: {
    add(n){
      this.$store.commit('add',n);
    },
   reduce(n){
      this.$store.commit('reduce',n);
    }
  }
}
</script>
复制代码
```
然后我们点击增加按钮,看看会发生什么变化,结果如下
![](https://cdn.nlark.com/yuque/0/2021/png/12821255/1627540554845-c4125211-5a8d-411c-9967-e78ab6a18532.png#align=left&display=inline&height=362&margin=%5Bobject%20Object%5D&originHeight=362&originWidth=353&size=0&status=done&style=none&width=353)
可以看到,用**data**接收的值不能及时响应更新,用**computed**就可以.
**知识点**:`Props`，`methods`,`data`和`computed`的初始化都是在`beforeCreated`和`created`之间完成的。
### 什么是mapState
表面意思:`mapState`是`state`的辅助函数
实际作用:当一个组件需要获取多个状态时候，将这些状态都声明为计算属性会有些重复和冗余。为了解决这个问题，可以使用 `mapState` 辅助函数帮助生成计算属性
使用方法:先要导入这个辅助函数.
```
import { mapState } from 'vuex'
复制代码
```
然后就可以在`computed`中使用`mapState`了
用`mapState`等这种辅助函数的时候，如果**组件内部的命名**和**vuex内的命名**是一致的,可以简写成**数组**方式。
```
//state.js
export default {
    nickname:'Simba',
    age:20,
    gender:'男'
};
复制代码
```
```
//computed
computed: mapState(['nickname','age','gender'])
//上面的一句代码就相当于下面这些 是不是简洁了很多
computed:{
  nickname(){return this.$store.state.nickname}
  age(){return this.$store.state.age}
  gender(){return this.$store.state.gender}
}
复制代码
```
如果需要自定义一个计算属性,需要`es6`中的展开运算符：**...**
```
data(){
  return{
    count:14
  }
}
computed: {   
  value(){
   return "姓名:" + this.coount/7
},
  ...mapState(['nickname','age','gender'])
}
复制代码
```
## getters以及mapGetters
### 什么是getters
**getters**：对数据获取之前的再次编译，`getters`的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。说白了就约等于`vue`的`computed`,可以像使用`computed`一样去使用`getters`,当然二者还是有区别的.
### 如何使用getters
`getters`中的方法有两个默认参数

- **state** 当前`VueX`对象中的状态对象
- **getters** 当前`getters`对象，用于将`getters`下的其他`getter`拿来用
```
//state.js
export default {
  name:'simba',
  age:'20'
};
//getters.js
export default {
  // 第一个参数是state
  realName(state) {
    return "姓名:" + state.name
  },
  // 第二个参数可以访问getters
  nameAndAge(state, getters) {
    return "年龄:" + state.age +";"+ getters.realName
  }
};
复制代码
```
### 如何访问getters
#### 通过属性访问
`getter` 会暴露为` store.getters` 对象，我们可以以属性的形式访问这些值：
```
store.getters.realName// -> 姓名:simba
复制代码
```
**注意**:`getter` 在通过属性访问时是作为 `Vue` 的响应式系统的一部分缓存其中的。
#### 通过方法访问
我们可以通过让 `getters` 返回一个函数，来实现给 `getters` 传参。这样在对 `store` 里的**数组**进行**查询**时非常有用。
```
state:{
  todos:[
    {
      id:2,
      text:'…',
      done: false
    }
  ]
},
getters: {
  getTodoById: (state) => (id) => {
    return state.todos.find(todo => todo.id === id)
  }
}
store.getters.getTodoById(2) // -> { id: 2, text: ‘…’, done: false }
复制代码
```
**注意**:`getter` 在通过方法访问时，每次都会去进行调用，而不会缓存结果。
#### 在组件中使用
我们在`computed`中通过`this.$store.getters.xxx`来绑定一个计算属性
```
//组件中
<template>
  <div class="hello">
    <div>
        <div>{{message}}</div>
        <div>{{message2}}</div>
    </div>
  </div>
</template>
computed:{
   message(){
     return this.$store.getters.realName 
   },
   message2(){
     return this.$store.getters.nameAndAge; 
   }
},
复制代码
```
结果如下:
![](https://cdn.nlark.com/yuque/0/2021/png/12821255/1627540554745-a88381ce-79fb-430f-8303-16f823858145.png#align=left&display=inline&height=300&margin=%5Bobject%20Object%5D&originHeight=300&originWidth=326&size=0&status=done&style=none&width=326)
### 什么是mapGetters
`mapGetters` 辅助函数仅仅是将 `store` 中的 `getter` 映射到局部计算属性：
使用方法:先要导入这个辅助函数.
```
import { mapGetters } from 'vuex'
复制代码
```
然后就可以在`computed`中使用`mapGetters` 了
```
computed: {
  ...mapGetters({
    message: "realName",
    message2: "nameAndAge"
  })
},
复制代码
```
是不是简洁了很多,如果**计算属性的名**和**getters的名字**相同,还可以使用数组简写形式
```
computed: {
  ...mapGetters(["realName","nameAndAge"])
},
复制代码
```
## mutation以及mapMutation
### 什么是mutation
`mutation`是操作`state`数据的方法的集合，比如对该数据的**修改、增加、删除**等等。`mutation`中通常存放一些**同步修改状态**的方法.
**注意**:更改 **Vuex** 的 **store** 中的状态的唯一方法是提交 **mutation**。
### 如何使用mutation
`mutations`方法都有默认的形参：`mutation([state] [,payload])`

- **state** 当前`VueX`对象中的`state`
- **payload** 载荷(该方法在被调用时传递的参数)
```
//state.js
export default {
  name:'韩志伟'
};
//mutations.js
export default {
 changeName(state, name) {
    state.name = name;
  },
};
复制代码
```
我们需要这样去调用`mutation`
```
this.$store.commit('changeName','吴彦祖')
复制代码
```
例如我们在组件的`methods`中修改一下`name`属性
```
methods: {
    changeName(name){
      this.$store.commit('changeName',name);
    },
}
//调用changeName方法
mounted(){
  this.changeName('吴彦祖')
}
复制代码
```
当需要多参提交时，可以把他们放在一个对象中
```
this.$store.commit('changeName',{firstName:'han',lastName:'zhiwei'})
复制代码
```
也可以用另外一种传参的方式
```
this.$store.commit({
    type:'changeName',
    payload:{
        firstName:'han',
        lastName:'zhiwei'
    }
})
复制代码
```
### 什么是mapMutation
`mapMutation`辅助函数仅仅是将 `store` 中的 `mutation` 映射到组件`methods`中
使用方法:先要导入这个辅助函数.
```
import { mapMutation} from 'vuex'
复制代码
```
然后就可以在`methods`中使用`mapMutation`了
```
methods:{
 ...mapMutations({
      changeName:'changeName',
    })
}
复制代码
```
这个代码等同于下面这段
```
changeName(payLoad){
  this.$store.commit('changeName',payLoad)
}
复制代码
```
如果**方法名**和**mutation**名字一样 可以简写成下面这样
```
methods:{
 ...mapMutations(['changeName'])
}
复制代码
```
还可以使用常量替代`mutations`事件类型
在`store`文件夹下面新建`mutation-types.js`文件
```
//mutation-types.js
export const ADD_AGE = 'ADD_AGE'
//mutations.js
import * as types from './mutation-types';
export default {
  [types.ADD_AGE](state, payLoad) {
    state.age += payLoad.number
  }
}
//组件中js部分
 ...mapMutations([types.ADD_AGE]),
复制代码
```
但是这个不是很常用,知道有这个知识点就可以了
### 增删state中的成员
既然讲到了如何修改`state`的值,顺便提一下如何增删`state`中的成员
**Vue.set 为某个对象设置成员的值，若不存在则新增**
```
Vue.set(state,"age",22)
复制代码
```
**Vue.delete 删除成员**
```
Vue.delete(state,'age')
复制代码
```
## actions以及mapActions
### 什么是actions
由于直接在`mutation`方法中进行异步操作，可能会引起数据失效。所以提供了`Actions`来专门进行异步操作，类似于**axios请求**,最终通过提交`mutation`方法来修改`state`中的值。
### 如何使用actions
`Actions`中的方法有两个默认参数: `Action([context ] [,payload])`

- **context** 上下文对象 包含`dispatch` `commit` `state` `getters` `rootState` 可以使用`es6`的解构赋值看起来更明确`{ commit }`
- **payload** 载荷(该方法在被调用时传递的参数)

看一个例子,一秒钟以后提交`mutation`修改`state`中的`name`属性
```
//state.js
export default {
  name:'韩志伟'
};
//mutations.js
export default {
 changeName(state, name) {
    state.name = name;
  },
};  
//actions.js
export default {
 asyncChangeName({ commit } ,name) {
   setTimeout(() => {
     commit('changeName',name);
  }, 1000);
  },
};
复制代码
```
我们需要这样去调用`action`
```
this.$store.dispatch('asyncChangeName','吴彦祖')
复制代码
```
例如我们在组件的`methods`中修改一下`name`属性
```
methods: {
    changeName(name){
      this.$store.dispatch('asyncChangeName',name);
    },
}
//调用changeName方法
mounted(){
  this.changeName('吴彦祖')
}
复制代码
```
`action`中也可以调用另一个`action`
```
//actions.js
export default {
 asyncChangeName({ dispatch }) {
   setTimeout(() => {
     dispatch('anotherAction');
  }, 1000);
  },
 anotherAction(){
   console.log('另一个action被调用了')
 }
};
复制代码
```
`action`中也可以传入`state`,以及`rootState`,至于什么是`rootState`,下面学习模块化`modules`的时候就知道了
```
//actions.js
export default {
 action({ state }) {
   setTimeout(() => {
      console.log(state.name)
  }, 1000);
  },
 anotherAction({ rootState }){
   setTimeout(() => {
     console.log(rootState.name);
  }, 1000);
 }
};
复制代码
```
至于`actions`的传参就与`mutation`一样了
```
this.$store.dispatch('changeName',{firstName:'han',lastName:'zhiwei'})
复制代码
```
### 什么是mapActions
`mapActions`辅助函数仅仅是将 `store` 中的 `actions` 映射到组件`methods`中
使用方法:先要导入这个辅助函数.
```
import { mapActions} from 'vuex'
复制代码
```
然后就可以在`methods`中使用`mapActions`了
```
methods:{
 ...mapActions({
      changeName:'changeName',
    })
}
复制代码
```
这个代码等同于下面这段
```
changeName(payLoad){
  this.$store.dispatch('changeName',payLoad)
}
复制代码
```
如果**方法名**和**actions名字**一样 可以简写成下面这样
```
methods:{
 ...mapActions(['changeName'])
}
复制代码
```
## modules模块化
### 什么是modules
当项目庞大，状态非常多时，可以采用**模块化管理模式**。`Vuex` 允许我们将 `store` 分割成模块`（module）`。每个模块拥有自己的 `state`、`mutation`、`action`、`getter`。
### 初始化modules
前面我们学习了如何将`vuex`的`index.js`文件拆分成单个文件进行管理,所以我们依然对所有的模块进行单文件拆分管理,目录结构如下
```
store
│      
├─index.js
│            
├─state.js
│      
├─getters.js     
│
├─mutations.js      
│
├─actions.js        
│
└─modules
      │
      ├─moduleA // moduleA的结构与moduleB相同
      │
      └─moduleB
            │ 
            ├─index.js
            │            
            ├─state.js
            │      
            ├─getters.js     
            │
            ├─mutations.js      
            │
            └─actions.js
复制代码
```
**1.首先根index.js中除了引入自身的state,getters,mutations,actions之外,还要引入两个模块的index.js并在export中导出modules**
```
import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';
import moduleA  from './modules/moduleA/index';
import moduleB  from './modules/moduleB/index';
Vue.use(Vuex);
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    moduleA,
    moduleB,
  },
});
复制代码
```
**2.在 moduleA 的index.js中导入moduleA的state,getters,mutations,actions. moduleB同理**
**注意**:`getter`，`mutation`，`action` 他们默认都是注册在**全局命名空间**的，所以我们默认是可以和使用**根状态**一样去使用他们，这样就失去了**模块化**的意义，所以我们要在模块的`index.js`中添加`namespaced: true`使其成为带命名空间的模块。当模块被注册后，它的所有 `getter`、`action` 及 `mutation` 都会自动根据**模块注册的路径**调整命名。
```
import state from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';
const moduleA = {
  namespaced: true,
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions,
};
export default moduleA ;
复制代码
```
**3.moduleA下的state,getters,mutations,actions就和之前学习的一样导出就可以了**
```
//state.js
export default {
  name:'hzw'
};
//mutations.js
export default {
 changeName(state, name) {
    state.name = name;
  },
};  
//以此类推
复制代码
```
### 如何在模块化中进行定义
**state**
正常写在各自的`state.js`中即可
**getter**
`getter`的话，他会有三个参数，第一个是模块内的 `state`，第二个是 模块内的 `getters`，第三个是根节点状态 `rootState`
```
//getters.js
export default {
  nameAndAge(state, getters, rootState) {
    return "年龄:" + state.age +";"+ getters.realName + "" + rootState.name
  }
};
复制代码
```
**mutation**
`mutation` 传入的第一个参数也是模块内的 `state`，其实就和根状态定义 `mutation` 的时候一样
```
export default {
//这里的state是模块的局部状态
 changeName(state, name) {
    state.name = name;
  },
};
复制代码
```
**actions**
`action` 的话，他传入还是只有 `context` 对象，这个对象里面的 `state` 属性指模块内的状态，`rootState` 指根状态，如下
```
export default {
 changeName({ state,rootState }) {
        console.log(state.name)
        console.log(rootState .name)
    }
};
复制代码
```
### 如何在模块化中进行开发
#### 1. state 获取
这个要在原来状态名前面加一个模块名才能取到到模块内的对象。
```
this.$store.state.moduleA.name;
复制代码
```
辅助函数也一样,`name` 前面加个模块名
```
...mapState({     
  name: state => state.moduleA.name, 
})
//简写
...mapState('moduleA',['name']),
复制代码
```
获取根节点的状态还是和以前一样,不需要加`模块名`,也不需要加`root`
```
...mapState(['name']),
复制代码
```
#### 2. getters获取
这个同样要在原来状态名前面加一个模块名才能取到到模块内的对象。
在获取根状态下的`getters`不需要加模块名
```
store.getters.moduleA.realName
//map函数的第一个参数也同样需要加模块名
computed: {
  //获取moduleA下的getters
  ...mapGetters("moduleA",["realName","nameAndAge"])
  //获取根状态下的getters
  ...mapGetters(["realName"])
},
复制代码
```
#### 3.调用mutation以及action
根据`state`和`getters`推算,在调用模块内`mutation`和`action`的时候肯定也需要加模块名
在调用根状态中的`mutation`和`action`的时候不需要加模块名
```
methods:{
//调用模块A下的action
 ...mapActions('moduleA',['changeName'])
//调用模块A下的mutation
 ...mapMutation('moduleB',['changeName'])
//调用根状态下的action
 ...mapActions(['changeName'])
//调用根状态下的mutation
 ...mapMutation(['changeName'])
}
复制代码
```
#### 4.需要特别注意的是,在模块中的action下调用根状态中的action和mutation需要将{root:true}作为第三个参数传入
```
//moduleA下的actions.js
export default {
 AsyncChangeName({ commit } ,name) {
   setTimeout(() => {
     //调用的是根状态下的mutation
     commit('changeName',name,{ root: true });
     //调用的是根状态下的action
    dispatch('changeName',name,{ root: true });
    }, 1000);
  },
};
复制代码
```
#### 5.将模块中的action注册为全局
这个感觉和模块化的设计有点**冲突**，并且也不常用，知道有这个知识点即可，在声明`action`的时候，添加`root:true`并将 `action` 的定义放到 `hanler` 函数中，具体如下：
```
//actions.js
export default {
 globalAction:{
  root:true,
  handler({ commit } ,name) {
   setTimeout(() => {
     commit('changeName',name);
   }, 1000);
  },
 }
};
复制代码
```
到这里就完全可以使用`vuex`进行开发任务了!


作者：一尾流莺
链接：[https://juejin.cn/post/6973848448080543758](https://juejin.cn/post/6973848448080543758)
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
