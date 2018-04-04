react-vw-layout

## 写在前面的话
> 在接触到大漠先生牵头开发的vw解决方案之前，我使用的是阿里的第一代适配解决方案 [lib-flexible](https://github.com/amfe/lib-flexible) 在使用vw解决方案开发一套H5之后，我真正的被vw的威力所折服。
由于大漠先生只给出了vue-cli的配置方式，并未给出react系列对应脚手架create-react-app配置版本，在看过大漠先生的配置之后，我在create-react-app脚手架生成的项目上进行了一套配置，使得使用react的各位师兄弟也可以使用vw解决方案！
话不多说开工

> vue使用方式：[《如何在Vue项目中使用vw实现移动端适配》](https://www.w3cplus.com/mobile/vw-layout-in-vue.html)
> 关于具体如何使用请参考
  [再聊移动端页面的适配](https://www.w3cplus.com/css/vw-for-layout.html)
> [使用Flexible实现手淘H5页面的终端适配](https://www.w3cplus.com/mobile/lib-flexible-for-html5-layout.html)

### 移动端适配最接近完美的解决方案在react中的使用方式。

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






