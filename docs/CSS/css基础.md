# css 基础

## 1.盒模型

```
content（元素内容） + padding（内边距） + border（边框） + margin（外边距）
```

box-sizing:

content-box：默认值，总宽度 = margin + border + padding + width
![f6c93488977e613c60c5af53fa9c523.jpg](https://s2.loli.net/2022/03/03/qcJgHn8kMtOivVh.jpg)

border-box：盒子宽度包含 padding 和 border，总宽度 = margin + width
![abbbe760f02c79a9dc514e6c589068c.jpg](https://s2.loli.net/2022/03/03/hZx5ORwlbQGtrnc.jpg)

## 2.BFC

块级格式化上下文，是一个独立的渲染区域，让处于 BFC 内部的元素与外部的元素相互隔离，使内外元素的定位不会相互影响。

触发条件:

根元素(\<html>)  
position: absolute/fixed  
display: inline-block / table 相关(inline-table/table-cell/table-caption/table、table-row、 table-row-group、table-header-group、table-footer-group（分别是 HTML table、row、tbody、thead、tfoot 的默认属性）)/flow-root/弹性元素(flex/inline-flex)/网格元素(grid/inline-grid)  
float 元素(float 不是 none)  
ovevflow 不为 visible 的块元素  
弹性元素（display 为 flex 或 inline-flex 元素的直接子元素）  
网格元素（display 为 grid 或 inline-grid 元素的直接子元素）

规则:

属于同一个 BFC 的两个相邻 Box 垂直排列
属于同一个 BFC 的两个相邻 Box 的 margin 会发生重叠  
BFC 中子元素的 margin box 的左边， 与包含块 (BFC) border box 的左边相接触 (子元素 absolute 除外)  
BFC 的区域不会与 float 的元素区域重叠
计算 BFC 的高度时，浮动子元素也参与计算
文字层不会被浮动层覆盖，环绕于周围

应用:

阻止 margin 重叠  
可以包含浮动元素 —— 清除内部浮动(清除浮动的原理是两个 div 都位于同一个 BFC 区域之中)  
自适应两栏布局  
可以阻止元素被浮动元素覆盖

## 3.层叠等级、层叠上下文

### 层叠等级

![111.png](https://s2.loli.net/2022/03/04/Judv5Is1n4oW2CF.png)

### 层叠上下文

文档中的层叠上下文由满足以下任意一个条件的元素形成：

文档根元素（\<html>）；  
position 值为 absolute（绝对定位）或 relative（相对定位）且 z-index 值不为 auto 的元素；  
position 值为 fixed（固定定位）或 sticky（粘滞定位）的元素（沾滞定位适配所有移动设备上的浏览器，但老的桌面浏览器不支持）；  
flex (flexbox (en-US)) 容器的子元素，且 z-index 值不为 auto；  
grid (grid) 容器的子元素，且 z-index 值不为 auto；  
opacity 属性值小于 1 的元素；  
mix-blend-mode 属性值不为 normal 的元素；  
以下任意属性值不为 none 的元素：  
transform  
filter  
perspective  
clip-path  
mask / mask-image / mask-border  
isolation 属性值为 isolate 的元素；  
-webkit-overflow-scrolling 属性值为 touch 的元素；  
will-change 值设定了任一属性而该属性在 non-initial 值时会创建层叠上下文的元素；  
contain 属性值为 layout、paint 或包含它们其中之一的合成值（比如 contain: strict、contain: content）的元素。
