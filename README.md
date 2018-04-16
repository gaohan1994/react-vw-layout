先上github地址 https://github.com/gaohan1994/react-vw-layout 有空点个赞蛤~~

### ``2018-4-16日更新css-modules配置，前面步骤不变，可直接跳到第六步。``

## 写在前面的话
> 在接触到大漠先生牵头开发的vw解决方案之前，我使用的是阿里的第一代适配解决方案 [lib-flexible](https://github.com/amfe/lib-flexible) 在使用vw解决方案开发一套H5之后，我真正的被vw的威力所折服。
由于大漠先生只给出了vue-cli的配置方式，并未给出react系列对应脚手架create-react-app配置版本，在看过大漠先生的配置之后，我在create-react-app脚手架生成的项目上进行了一套配置，使得使用react的各位师兄弟也可以使用vw解决方案！
话不多说开工

> vue使用方式：[《如何在Vue项目中使用vw实现移动端适配》](https://www.w3cplus.com/mobile/vw-layout-in-vue.html)
> 关于具体如何使用请参考
  [再聊移动端页面的适配](https://www.w3cplus.com/css/vw-for-layout.html)
> [使用Flexible实现手淘H5页面的终端适配](https://www.w3cplus.com/mobile/lib-flexible-for-html5-layout.html)

#### 移动端适配最接近完美的解决方案在react中的使用方式。本文只讲create-react-app创建的项目如何配置，具体每个插件的用途和使用方法请先查阅大漠先生的文章，我相信大漠先生的文章已经讲的很明白。
[《如何在Vue项目中使用vw实现移动端适配》](https://www.w3cplus.com/mobile/vw-layout-in-vue.html)
[《如何在Vue项目中使用vw实现移动端适配》](https://www.w3cplus.com/mobile/vw-layout-in-vue.html)
[《如何在Vue项目中使用vw实现移动端适配》](https://www.w3cplus.com/mobile/vw-layout-in-vue.html)
#### 重要的事情说三遍。一定要先大概看一下大漠先生的文章再往下看，否则可能会一头雾水。

## 1.创建项目
```
create-react-app react-vw-layout
cd react-vw-layout
npm start
```
打开http://localhost:3000/ 可以看到react欢迎页面，第一步成功。
## 2.打开配置选项
由于react默认隐藏webpack配置需要手动显示。
```
npm run eject
//Are you sure you want to eject? This action is permanent. (y/N) 
y
```
运行完eject之后项目结构如下
![项目结构.png](https://upload-images.jianshu.io/upload_images/7190172-5a860169c48324ff.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/400/h/400)

第二步收工，第三部开始配置各种插件。

## 3.增加配置
安装postCss插件
```
npm i --save postcss-aspect-ratio-mini postcss-px-to-viewport postcss-write-svg postcss-cssnext postcss-viewport-units cssnano
```
在``config/webpack.config.dev.js``文件中进行如下修改

1.引入postCss插件
```
const postcssAspectRatioMini = require('postcss-aspect-ratio-mini');
const postcssPxToViewport = require('postcss-px-to-viewport');
const postcssWriteSvg = require('postcss-write-svg');
const postcssCssnext = require('postcss-cssnext');
const postcssViewportUnits = require('postcss-viewport-units');
const cssnano = require('cssnano');
```
2.加入postCss配置
#### 加入配置代码位置如下
```
{
    test: /\.css$/,
    use: [
      require.resolve('style-loader'),
      {
        loader: require.resolve('css-loader'),
        options: {
          importLoaders: 1,
        },
      },
      {
        loader: require.resolve('postcss-loader'),
        options: {
          // Necessary for external CSS imports to work
          // https://github.com/facebookincubator/create-react-app/issues/2677
          ident: 'postcss',
          plugins: () => [
            require('postcss-flexbugs-fixes'),
            autoprefixer({
              browsers: [
                '>1%',
                'last 4 versions',
                'Firefox ESR',
                'not ie < 9', // React doesn't support IE8 anyway
              ],
              flexbox: 'no-2009',
            }),
            //加入地点
            //加入地点
            //加入地点
          ],
        },
      },
    ],
},	
```
需要加入的代码如下
```

postcssAspectRatioMini({}),
postcssPxToViewport({ 
  viewportWidth: 750, // (Number) The width of the viewport. 
  viewportHeight: 1334, // (Number) The height of the viewport. 
  unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to. 
  viewportUnit: 'vw', // (String) Expected units. 
  selectorBlackList: ['.ignore', '.hairlines'], // (Array) The selectors to ignore and leave as px. 
  minPixelValue: 1, // (Number) Set the minimum pixel value to replace. 
  mediaQuery: false // (Boolean) Allow px to be converted in media queries. 
}),
postcssWriteSvg({
  utf8: false
}),
postcssCssnext({}),
postcssViewportUnits({}),
cssnano({
  preset: "advanced", 
  autoprefixer: false, 
  "postcss-zindex": false 
})

```
第三步收工。
## 4.测试
修改``App.js``
```
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        hello vw-layout
      </div>
    );
  }
}
export default App;
```
修改App.css
```
.App {
  width: 750px;
  height: 200px;
  background: #f27a7a;
  color: #ffffff;
  line-height: 200px;
  text-align: center;
}
```
重新``npm start``页面显示如下
![测试demo.png](https://upload-images.jianshu.io/upload_images/7190172-38339fd3f69844ff.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

可以说是非常OK，剩下最后一个问题，配置生产环境webpack配置文件。
## 5.配置生产环境webpack.config.js
操作与配置测试环境文件相同先引入插件，在相同的位置配置postCss插件
配置完成后执行``npm run build``
打开``static/css/main.********.css``
![打包后的css.png](https://upload-images.jianshu.io/upload_images/7190172-4c87d3ca855d4b0a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
可以看到已经成功编译，打完收工

## 6.加入css-modules配置

一般的小项目不适用``css-modules``已经可以hold住了，但是页面多起来还是建议使用``css-modules``，下面介绍一下用法：

执行```npm i --save react-css-modules```

在``App.js``文件中引入插件
``import CSSModules from 'react-css-modules';``

修改css文件的引入方式
从``import './App.css';``修改为``import styles from './App.css';``

修改引用Css方式
``className``=>``styleName``

修改导出方式
``export default App``=>``export default CSSModules(App, styles);``

保存，从新执行``npm start``查看页面发现失败

![clipboard.png](/img/bV8D9V)

原因是未打开``css import``配置，此时``import styles from './App.css';``该语句并未成功引入``css``文件。

打开``webpack.config.dev.js``加入``modules: true``
找到如下位置
```js
{
    test: /\.css$/,
    use: [
      require.resolve('style-loader'),
      {
        loader: require.resolve('css-loader'),
        options: {
          //看这里看这里看这里看这里
          modules: true,
          
          importLoaders: 1,
        },
      },
      {
        loader: require.resolve('postcss-loader'),
        options: {
           //.....省略
        }
      }
    ],
  },
```
保存，再次执行``npm start``查看页面

![clipboard.png](/img/bV8Ec6)

成功！但是这个``class名``太过乱码不适于调试，再次打开``webpack.config.dev.js``
找到如下位置加入语句``localIdentName:'[name]_[local]_[hash:base64:5]'``
```js
{
    test: /\.css$/,
    use: [
      require.resolve('style-loader'),
      {
        loader: require.resolve('css-loader'),
        options: {
          modules: true,
          importLoaders: 1,
          //看这里看这里看这里
          localIdentName: '[name]_[local]_[hash:base64:5]'
        },
      },
      {
        loader: require.resolve('postcss-loader'),
        options: {
           //.....省略
        }
      }
    ],
  },
```
再次执行``npm start``查看页面

![clipboard.png](/img/bV8Eew)

#### OJBK大功告成！
最后相同步骤加入到``webpack.config.prod.js``中
执行``npm run build`` 查看打包文件

![clipboard.png](/img/bV8Egx)
### 彳亍吧，OK了。


## END.其他想说的话
> git地址再发一次，希望有空能帮忙点个赞~谢谢~~！！ https://github.com/gaohan1994/react-vw-layout 没有配置成功的可以参考一下。尤其是css-modules可能改的地方比较多。

> 当初看到大漠先生的vw适配方案真的是眼前一亮，在尝试了之后觉得这套方案的生产力非常强悍，其实按照本文进行配置已经可以满足相当一部分项目，~~除了一点就是没有使用``css-modules``，当然我自己已经成功配置了``css-modules``要修改的地方比较多，以后会出一篇文章来再继续分享，~~同时我是个Typescript重度患者！我极度作死的成功配置了``create-react-app typescript version``的``vw + css-modules``版本，现在回想起来配置的那几天真的生不如死。。。各种
踩坑。 等如果有人需要ts + react + vw  解决方案的时候我再写一篇文章吧。
那就到这里了，希望大家使用vw解决方案玩的愉快！

