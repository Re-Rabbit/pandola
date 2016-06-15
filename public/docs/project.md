# 项目结构

项目采用Pods形式的目录结构，组件与项目页面分离。

```
  pandora/
  |
  |- components/
  |   |- example/
  |       |- index.njk
  |       |- index.scss
  |       |- index.js
  |
  |- pages/
  |   |- example/
  |       |- index.html
  |       |- index.scss
  |       |- index.js
  |
  |- libs/
  |
  |- public/
  |   |- docs/
  |   |- idear/
  |   |- kit/
  |
  |- script/
  |
  |- node_modules/
  |
  |- dist/
  |
  |- tmp/
  |
  |- .babelrc
  |- .gitignore
  |- webpack.config.js
  |- package.json
  |
  `- .project
```

## components

组件，由模板，样式与功能实现组成，用于项目文件引用，不用于打包。

静态模板引用：

```nunjucks
{% from "components/example/index.njk" import example %}
```

在Js中引用：

```js
import example from 'example/index.njk'
```

样式scss引用：

```scss
@import 'components/example/_index'
```

Js在其他js文件中的引用：

```js
import example from 'example/index.js'
```
