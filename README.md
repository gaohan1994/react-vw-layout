先上github地址 https://github.com/gaohan1994/react-vw-layout 有空点个赞蛤~~

### ``2018-4-19日更新适配到安卓低版本的插件buggyfill（是我疏忽导致大家以为vw解决方案兼容范围过小，原第六步css-modules改为buggyfill，css-modules顺延为第七步）``

### ``2018-4-16日更新css-modules配置，前面步骤不变，可直接跳到第七步。``

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
![项目结构.png](https://user-gold-cdn.xitu.io/2018/4/17/162d1a8c979b1fb4?w=358&h=400&f=jpeg&s=13187)

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
![测试demo.png](https://user-gold-cdn.xitu.io/2018/4/17/162d1a8cbf8ae6f0?w=1240&h=559&f=jpeg&s=51698)

可以说是非常OK，剩下最后一个问题，配置生产环境webpack配置文件。
## 5.配置生产环境webpack.config.js
操作与配置测试环境文件相同先引入插件，在相同的位置配置postCss插件
配置完成后执行``npm run build``
打开``static/css/main.********.css``
![打包后的css.png](https://user-gold-cdn.xitu.io/2018/4/17/162d1a8c9781311f?w=1120&h=96&f=jpeg&s=13213)
可以看到已经成功编译，打完收工

## 6.加入viewport-units-buggyfill配置
``这一步不过在大漠先生的文章中或是我自己的项目中都已经配置，系我自己的疏忽忘记写在文章中导致大家以为vw兼容范围小。抱歉！！！``

打开``public/index.html``

首先在``<head></head>``中引入阿里cdn
```js
<script src="//g.alicdn.com/fdilab/lib3rd/viewport-units-buggyfill/0.6.2/??viewport-units-buggyfill.hacks.min.js,viewport-units-buggyfill.min.js"></script>
```

在``body``中，加入如下``js``代码：

```js
 <script>
  window.onload = function () {
    window.viewportUnitsBuggyfill.init({
      hacks: window.viewportUnitsBuggyfillHacks
    });
  }
</script>
```

最终index.html如下
```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="theme-color" content="#000000">
    <!--
      manifest.json provides metadata used when your web app is added to the
      homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/
    -->
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json">
    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the `public` folder during the build.
      Only files inside the `public` folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running `npm run build`.
    -->
    <title>React App</title>
    <script src="//g.alicdn.com/fdilab/lib3rd/viewport-units-buggyfill/0.6.2/??viewport-units-buggyfill.hacks.min.js,viewport-units-buggyfill.min.js"></script>
  </head>
  <body>
    <noscript>
      You need to enable JavaScript to run this app.
    </noscript>
    <div id="root"></div>
    <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run `npm start` or `yarn start`.
      To create a production bundle, use `npm run build` or `yarn build`.
    -->
    <script>
      window.onload = function () {
        window.viewportUnitsBuggyfill.init({
          hacks: window.viewportUnitsBuggyfillHacks
        });
      }
    </script>
  </body>
</html>

```

重新执行``npm start``打开页面发现：

![](https://user-gold-cdn.xitu.io/2018/4/19/162dba211c2a8c6f?w=2452&h=478&f=jpeg&s=177498)

如果遇到``img``无法显示，则添加全局css
```css
img { 
    content: normal !important; 
}
```

#### OK配置成功。这样就适配了低版本安卓机型

## 7.加入css-modules配置

一般的小项目不使用``css-modules``已经可以hold住了，但是页面多起来还是建议使用``css-modules``，下面介绍一下用法：

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

![clipboard.png](https://user-gold-cdn.xitu.io/2018/4/17/162d1aaec633d781?w=800&h=345&f=jpeg&s=103044)

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
![clipboard.png](https://user-gold-cdn.xitu.io/2018/4/17/162d1ab9445d2c33?w=800&h=158&f=jpeg&s=30819)
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
![clipboard.png](https://user-gold-cdn.xitu.io/2018/4/17/162d1abeac52b0b2?w=800&h=160&f=jpeg&s=30196)
#### OJBK大功告成！
最后相同步骤加入到``webpack.config.prod.js``中
执行``npm run build`` 查看打包文件
![clipboard.png](https://user-gold-cdn.xitu.io/2018/4/17/162d1ac29340aeac?w=800&h=233&f=jpeg&s=34166)
### 彳亍吧，OK了。


## END.其他想说的话
> git地址再发一次，希望有空能帮忙点个赞~谢谢~~！！ https://github.com/gaohan1994/react-vw-layout 没有配置成功的可以参考一下。尤其是css-modules可能改的地方比较多。

> 当初看到大漠先生的vw适配方案真的是眼前一亮，在尝试了之后觉得这套方案的生产力非常强悍，其实按照本文进行配置已经可以满足相当一部分项目，<del>除了一点就是没有使用``css-modules``，当然我自己已经成功配置了``css-modules``要修改的地方比较多，以后会出一篇文章来再继续分享，</del>同时我是个Typescript重度患者！我极度作死的成功配置了``create-react-app typescript version``的``vw + css-modules``版本，现在回想起来配置的那几天真的生不如死。。。各种
踩坑。 等如果有人需要ts + react + vw  解决方案的时候我再写一篇文章吧。
那就到这里了，希望大家使用vw解决方案玩的愉快！

