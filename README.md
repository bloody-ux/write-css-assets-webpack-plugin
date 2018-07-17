## 这个插件的作用

用于将webpack stats中的关于css的chunk/assets的映射关系输出到`main.js`（默认）文件的头部:

``` javascript

window.__CSS_CHUNKS__= {"components/Async":"/components/Async.css","main":"/main.css"};


```

一般会和`extract-css-chunks-webpack-plugin`插件配合使用，更多可以参考`react-universal-component`以及`babel-plugin-universal-import`


## 如何使用

``` javascript
plugins: [
  new WriteCssAssetsPlugin()
]
```


## 选项

``` javascript
options: {
  assetName: string, // 默认值是main.js
}
```