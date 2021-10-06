# 实现一个mini VUE
```html
<div id="app"></div>

<script>
  // vdom
  function h(tag, props, children) {
    return {
      tag,
      props,
      children,
    }
  }

  function mount(vnode, container) {
    const el = (vnode.el = document.createElement(vnode.tag))
    // if props
    if (vnode.props) {
      for (const key in vnode.props) {
        const value = vnode.props[key]
        if (key.startsWith('on')) {
          el.addEventListener(key.slice(2).toLowerCase(), value)
        } else {
          el.setAttribute(key, value)
        }
      }
    }

    // if children
    if (vnode.children) {
      if (typeof vnode.children == 'string') {
        el.textContent = vnode.children
      } else {
        vnode.children.forEach((child) => {
          mount(child, el)
        })
      }
    }
    container.appendChild(el)
  }

  function patch(n1, n2) {
    const el = (n2.el = n1.el)
    if (n1.tag === n2.tag) {
      // const el = n2.el=n1.el
      const oldProps = n1.props || {}
      const newProps = n2.props || {}
      for (const key in newProps) {
        const oldValue = oldProps[key]
        const newValue = newProps[key]
        if (oldValue != newValue) {
          el.setAttribute(key, newValue)
        }
      }
      for (const key in oldProps) {
        if (!(key in newProps)) {
          el.removeAttribute(key)
        }
      }

      // chilren
      const oldChilren = n1.children
      const newChilren = n2.children
      if (typeof newChilren === 'string') {
        if (typeof oldChilren === 'string') {
          if (oldChilren !== newChilren) {
            el.textContent = newChilren
          }
        } else {
          el.textContent = newChilren
        }
      } else {
        if (typeof oldChilren === 'string') {
          el.innerHTML = ''
          newChilren.forEach((child) => {
            mount(child, el)
          })
        } else {
          const commonLength = Math.min(newChilren.length, oldChilren.length)
          for (let i = 0; i < commonLength; i++) {
            patch(oldChilren[i], newChilren[i])
          }
          if (newChilren.length > oldChilren.length) {
            newChilren.slice(oldChilren.length).forEach((child) => {
              mount(child, el)
            })
          } else if (newChilren.length < oldChilren.length) {
            oldChilren.slice(newChilren.length).forEach((child) => {
              el.removeChild(child.el)
            })
          }
        }
      }
    } else {
      // replace
    }
  }

  // reactivity
  let activeEffect
  class Dep {
    subscribers = new Set()
    depend() {
      if (activeEffect) {
        this.subscribers.add(activeEffect)
      }
    }
    notify() {
      this.subscribers.forEach((effect) => {
        effect()
      })
    }
  }

  function watchEffect(effect) {
    activeEffect = effect
    effect()
    activeEffect = null
  }

  const targetMap = new WeakMap()
  function getDep(target, key) {
    let depsMap = targetMap.get(target)
    if (!depsMap) {
      depsMap = new Map()
      targetMap.set(target, depsMap)
    }
    let dep = depsMap.get(key)
    if (!dep) {
      dep = new Dep()
      depsMap.set(key, dep)
    }
    return dep
  }

  const reactiveHandlers = {
    get(target, key, receiver) {
      const dep = getDep(target, key)
      dep.depend()
      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
      const dep = getDep(target, key)
      const result = Reflect.set(target, key, value, receiver)
      dep.notify()
      return result
    },
  }

  function reactive(raw) {
    return new Proxy(raw, reactiveHandlers)
  }

  // test
  const App = {
    data: reactive({
      count: 0,
    }),
    render() {
      return h(
        'div',
        {
          onClick: () => {
            this.data.count++
          },
        },
        String(this.data.count)
      )
    },
  }

  function mountApp(App, container) {
    let isMounted = false
    let prevVdom
    watchEffect(() => {
      if (!isMounted) {
        const vdom = App.render()
        mount(vdom, container)
        isMounted = true
        prevVdom = vdom
      } else {
        const newVdom = App.render()
        patch(prevVdom, newVdom)
        prevVdom = newVdom
      }
    })
  }

  mountApp(App, document.getElementById('app'))
</script>

```
