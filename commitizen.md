格式：
type(scope) : subject
( 1 ) type（必须） : commit 的类别，只允许使用下面几个标识：

feat : 新功能
fix : 修复bug
docs : 文档改变
style : 代码格式改变
refactor : 某个已有功能重构
perf : 性能优化
test : 增加测试
build : 改变了build工具 如 grunt换成了 npm
revert : 撤销上一次的 commit
chore : 构建过程或辅助工具的变动
( 2 ) scope（可选） : 用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。

( 3 ) subject（必须） : commit 的简短描述，不超过50个字符。
commitizen 是一个撰写合格 Commit message 的工具，
遵循 Angular 的提交规范。

安装：
全局安装 commitizen

npm install -g commitizen
进入项目文件夹，运行如下命令：

commitizen init cz-conventional-changelog --save --save-exact
使用：
用 git cz 命令取代 git commit（先使用git add），这时会出现如下选项：

（ 1 ）选择 type



（ 2 ）填写 scope（选填）

? What is the scope of this change (e.g. component or file name)? (press enter to skip)
core
（ 3 ）填写 subject

? Write a short, imperative tense description of the change:
set a to b
完成，运行 git log 命令，查看我们刚才提交的 commit message，如下：

fix(core): set a to b
优点：
符合业内标准（许多项目使用 AngularJS 的commit 规范）
提交过程更加规范（使用 commitizen 规范工具，风格统一）
能够生成风格统一的 commit log（type(scope):subject)
缺点：
需要安装 commitizen 工具包，使项目更大、更重了（适合大型开源项目）
提交过程受约束较大
有一定的学习成本