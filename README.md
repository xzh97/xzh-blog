# xzh.com

## 感言
本来是说这个项目不管是啥  全部都自己造
最后还是真香了 对不起
## todoList
1. 编辑博客时， 两个选择框的默认值。 finished
2. 富文本上传图片是默认转成base64上传，这样感觉不是很好。  做成 选择图片上传到服务器，然后返回服务器里的地址，再添加到富文本里面去。 finished
3. 个人简历tab： 做一个在线word一样的东西，  然后可以打印pdf
4. 项目部署问题： 需要买一个服务器，  目前先用pm2 直接保证服务器的server项目不死就好了。
5. 命令行更新版本  思路：node脚本 打新包 + 上传到服务器 替换掉旧文件  
6. loading組件
7. blog 评论模块

## 博客 灵感
1. antd vue按需加载之后， select下的option，radio下的group都需要按照这个方式在main下引入一次才行  不然不能用 ，了解一下原理
2. 工作上碰到的问题 及解决方案 （ ex：1.去年碰到的点击账本直接进入详情，详情回退直接回退到首页 列表页不显示问题， contentLoaded的问题， 原因: 首屏引入的amap等第三方文件太大，还没加载完就点击账本，导致vue-router崩溃；）
3. 每月总结一次
4. 之前做这个项目的时候 ajax.js里的 全局xhr变量导致的ajax请求结果混乱

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
