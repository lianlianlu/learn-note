## 1 历史

浮动设置初衷：**实现文字环绕效果**

图片和文字能显示在同一行

## 2 包裹和破坏

- 包裹
  `display: inline-block/block/table-cell`

- 破坏

  float一旦添加，就脱离文档流，父元素遍包裹不住它，换句话就是，它破坏了包裹。这是标准，不是bug

## 3 清除浮动

- **方法1：底部插入 clear:both**
  两边都塌了，底部用一个横梁给架起来
  通常形式：

  - html block水平元素底部添加` <div style="clear:both"></div> `
    缺点：太多无用标签

  - css after 伪元素添加到含有浮动子元素的*父元素*上  
    缺点： IE6/IE7不认识

    ```css
    .clearfix:after{content: ''; display:block;height:0;overflow:hidden;clear:both;}
    .clearfix:after{content:'';display:table; clear:both}
    .clearfix{*zoom:1} //兼容IE6/IE7
    ```

    

- **方法2：父元素BFC或者haslayout(IE6/IE7)**
  形成封闭结构，不受外界影响
  通常声明：

  ```css
  float: left/right;
  position:absolute/fixed;
  overflow: hidden/scroll (IE7+)
  display:inline-block/table-cell(IE8+)
  width/heigt/zoom:1/....
  ```

  缺点：无法使用一个声明同步所有浏览器

## 4 浮动滥用

- 去空格（&nbsp;）
- 使display块状化
- **float去空格， 让float应用到流体布局中**

## 5 流布局

案例深入研究

## 6 兼容性

