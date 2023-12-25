# look-ui 鹿鸣前端组件包

## 一. 如何新建组件?
1. 在 packages 目录下新建组件文件夹, 名字为 look-xxx, 目录结构参考现有组件
2. 在 packages/index.js 文件中引入该组件即可

## 二. 如何打包成组件库?
1. 在终端执行 `npm run lib` 命令即可

## 三. 如何发布到 npm ?

### 3.1. 准备
1. 修改 npm 源为 npm 官方源, 否则在发布时会报错, 在终端执行 `npm config set registry https://registry.npmjs.org/`
2. 执行 `npm login` , 登录 npm 账号
3. 确保已经执行了 `npm run lib` 命令

### 3.2. 手动发布
1. 修改 package.json 中的 version 版本号
2. 执行 `npm publish` 发布到 npm 官方源

### 3.3. 自动发布
1. 执行 `npm run release --release-as x.y.z` 其中 x.y.z 为版本号, 例如这次你想发布的版本是 1.1.28, 那就将 1.1.28 填入 x.y.z 中
2. 然后系统会自动修改 `CHANGELOG.md`, `package.json` 和 `package-lock.json` 文件
3. 接着会出现4个问题, 一路 yes 就行, 如下图:  
![publish-flow](./src/imgs/publish-flow.png)

> 注意: git 提交信息应以`feat、chore、fix、style、refactor、perf`等前缀作为开头(更多前缀可搜索 git-cz), 否则提交信息不会出现在 CHANGELOG.md 中

### 3.4. 用哪个?
推荐使用自动发布, 它会自动生成 CHANGELOG.md 文件, 方便查看更新内容.

### 3.5. 修改版本号的规则

- 在 npm 包的版本号 x.y.z 中，x 代表主版本号，y 代表次版本号，z 代表修订版本号；
- 当进行重大更改且不兼容上一个版本时，增加主版本号；
- 当添加新功能或进行向后兼容的修复时，增加次版本号；
- 当修复 bug 或小的改动时，增加修订版本号。

## 四. 如何避免频繁发布更新?

问题: 如果组件库只修改了一个小问题, 比如字眼和样式调整, 为了调试和验证, 必须发布新版本, 但这样频繁发布更新, 显然不太合理。

解决: 假设现在有个项目 A 需要引入 look-ui, 可以使用以下方法避免频繁发布更新:
1. 先在 look-ui 项目中执行 npm link(执行完毕后, 会在全局的 node_modules 文件夹里生成一个 look-ui 的软连接, 指向实际的 look-ui)
2. 在 A 项目里执行 npm link look-ui(执行完毕后, 会在 A 项目里的 node_modules 文件夹里生成一个 look-ui 的软连接, 指向实际的 look-ui) 即可


<h2><a href="http://192.168.0.66/font-end/look-ui/compare/1.2.3...1.2.4">1.2.4</a> (2023-12-25)</h2>
<h3>Features</h3>
<ul>
<li>操作自定义按钮时，返回当前任务对象 (<a href="http://192.168.0.66/font-end/look-ui/commits/50cde797b9d86b743051883519abdb652d2de390">50cde79</a>)</li>
</ul>
<h2><a href="http://192.168.0.66/font-end/look-ui/compare/1.2.2...1.2.3">1.2.3</a> (2023-12-25)</h2>
<h3>Bug Fixes</h3>
<ul>
<li>ZDRWFJ-1819 任务下达导入查重没有匹配到相似任务，批量创建任务下达后返回，已下达的任务仍显示在未处理任务列表 (<a href="http://192.168.0.66/font-end/look-ui/commits/22d4676fc70babe0ad145239f576e375a98b0970">22d4676</a>)</li>
</ul>
<h3>Features</h3>
<ul>
<li>查重结果显示自定义查重点作为标题 (<a href="http://192.168.0.66/font-end/look-ui/commits/e36fb0a49cd62490ac3961eb15bae3af3e5a5f66">e36fb0a</a>)</li>
<li>新增自定义查重点入参 (<a href="http://192.168.0.66/font-end/look-ui/commits/4ba6048b763cd156cc4e8497dd1e302798c4ae21">4ba6048</a>)</li>
<li>自定义查重点 (<a href="http://192.168.0.66/font-end/look-ui/commits/3dadf01883e20de46e197ca39e4bad4c52f966fb">3dadf01</a>)</li>
</ul>
<h2><a href="http://192.168.0.66/font-end/look-ui/compare/1.2.1...1.2.2">1.2.2</a> (2023-12-19)</h2>
<h3>Bug Fixes</h3>
<ul>
<li>ZDRWFJ-1845 对任务进行关注等操作后, 默认选中第一条任务 (<a href="http://192.168.0.66/font-end/look-ui/commits/82bb811ee9c0f05b5ae09f620f9e757e3b00affd">82bb811</a>)</li>
<li>ZDRWFJ-1832 修复数据变化但视图未更新问题 (<a href="http://192.168.0.66/font-end/look-ui/commits/0c52bfb00169903965534ce27b0d0bb10d9b1653">0c52bfb</a>)</li>
</ul>
<h2><a href="http://192.168.0.66/font-end/look-ui/compare/1.2.0...1.2.1">1.2.1</a> (2023-12-19)</h2>
<h3>Bug Fixes</h3>
<ul>
<li>ZDRWFJ-1809 切换查重点时, 将各个checkbox设置为false (<a href="http://192.168.0.66/font-end/look-ui/commits/8d72b111bbc4cb029c77b3d290fe901821feccdb">8d72b11</a>)</li>
</ul>
<h1><a href="http://192.168.0.66/font-end/look-ui/compare/1.1.30...1.2.0">1.2.0</a> (2023-12-07)</h1>
<h3>Bug Fixes</h3>
<ul>
<li>修复查重结果加载不出来的问题 (<a href="http://192.168.0.66/font-end/look-ui/commits/c6060240611588601372e7e2c66230b68178c050">c606024</a>)</li>
</ul>
<h3>Features</h3>
<ul>
<li>操作当前查重结果时回调参数添加当前选中的任务 (<a href="http://192.168.0.66/font-end/look-ui/commits/29095e1f2b77dad0c3353972619f3d3376f8c7f6">29095e1</a>)</li>
<li>功能优化 (<a href="http://192.168.0.66/font-end/look-ui/commits/f72a7be9f05dd7cc3eadc3eacbd8695741549ed1">f72a7be</a>)</li>
<li>添加查重接口入参 (<a href="http://192.168.0.66/font-end/look-ui/commits/c778252e07e7edae18e3d3ee232cf88dd6e46401">c778252</a>)</li>
<li>添加点击处理结果回调 (<a href="http://192.168.0.66/font-end/look-ui/commits/ec0f8c575773ffc4e467527b32973d7ce88dfb5b">ec0f8c5</a>)</li>
<li>添加已创建任务图片 (<a href="http://192.168.0.66/font-end/look-ui/commits/4c8a3c7c4fe025d549609772b8b5c13ef265c515">4c8a3c7</a>)</li>
</ul>
<h2><a href="http://192.168.0.66/font-end/look-ui/compare/1.1.29...1.1.30">1.1.30</a> (2023-11-07)</h2>
<h3>Bug Fixes</h3>
<ul>
<li>修复监听任务状态变化时点击全选无效问题 (<a href="http://192.168.0.66/font-end/look-ui/commits/e4641782cd59356d14a2f2483d424f2fa07efafe">e464178</a>)</li>
</ul>
<h3>Features</h3>
<ul>
<li>批量创建任务回调返回选中任务数组 (<a href="http://192.168.0.66/font-end/look-ui/commits/caddb29e3a097c9985ca715554f7fad0a86c1a6a">caddb29</a>)</li>
</ul>
<h2><a href="http://192.168.0.66/font-end/look-ui/compare/1.1.28...1.1.29">1.1.29</a> (2023-11-06)</h2>
<h3>Bug Fixes</h3>
<ul>
<li>修复任务重复出现在不同的列表中 (<a href="http://192.168.0.66/font-end/look-ui/commits/c87959efda64b14af9b68b4b7b49527f3b50daf3">c87959e</a>)</li>
</ul>
<h2><a href="http://192.168.0.66/font-end/look-ui/compare/1.1.23...1.1.28">1.1.28</a> (2023-11-03)</h2>
<h3>Bug Fixes</h3>
<ul>
<li>修复点击标题问题 (<a href="http://192.168.0.66/font-end/look-ui/commits/fce11f8cfed110312f3349c144ac17d180e7927b">fce11f8</a>)</li>
<li>修复点击查看详情没有返回当前任务信息问题 (<a href="http://192.168.0.66/font-end/look-ui/commits/c357609d801b35425f148806039b441a33df2ba8">c357609</a>)</li>
<li>修复任务列表变化时数据没更新 (<a href="http://192.168.0.66/font-end/look-ui/commits/bf226fc4bd25a20cacfa0eb08c0bb84cbf5f8965">bf226fc</a>)</li>
<li>修复任务状态为空时显示不正确的问题 (<a href="http://192.168.0.66/font-end/look-ui/commits/8f6cfb1a284404fc7888272eb20ebcf1239e90c6">8f6cfb1</a>)</li>
<li>修复webpack报错问题 (<a href="http://192.168.0.66/font-end/look-ui/commits/4ad42a5082e0d372dba375f740a3d8abae26e85a">4ad42a5</a>)</li>
<li>页面首次加载添加tenantId参数 (<a href="http://192.168.0.66/font-end/look-ui/commits/63a1250e0c250a5b6d285c89a887e889dfc8849f">63a1250</a>)</li>
</ul>
<h3>Features</h3>
<ul>
<li>添加查重结果操作按钮自定义插槽 (<a href="http://192.168.0.66/font-end/look-ui/commits/35ce733081d4c471d58e154d441aae8a13e9f9b6">35ce733</a>)</li>
<li>添加查重结果详情回调 (<a href="http://192.168.0.66/font-end/look-ui/commits/82142679185e4a35064c5871dabe3ac033bd8d15">8214267</a>)</li>
<li>添加点击任务标题回调 (<a href="http://192.168.0.66/font-end/look-ui/commits/8697c36d08ee1bfb44df3b6ec9c1f0cfde83ace2">8697c36</a>)</li>
<li>添加取消关注、归并等按钮的回调 (<a href="http://192.168.0.66/font-end/look-ui/commits/0049cea09afda62d3229b30347ad91d65c0bfdae">0049cea</a>)</li>
</ul>
<h3>Performance Improvements</h3>
<ul>
<li>优化数据太多时切换任务类型会造成卡顿效果 (<a href="http://192.168.0.66/font-end/look-ui/commits/9d617dc5ff7a6a3a1d2b2e64e7f8283c90236579">9d617dc</a>)</li>
</ul>
<h2><a href="http://192.168.0.66/font-end/look-ui/compare/1.1.23...1.1.27">1.1.27</a> (2023-11-02)</h2>
<h3>Bug Fixes</h3>
<ul>
<li>修复点击标题问题 (<a href="http://192.168.0.66/font-end/look-ui/commits/fce11f8cfed110312f3349c144ac17d180e7927b">fce11f8</a>)</li>
<li>修复点击查看详情没有返回当前任务信息问题 (<a href="http://192.168.0.66/font-end/look-ui/commits/c357609d801b35425f148806039b441a33df2ba8">c357609</a>)</li>
<li>修复任务列表变化时数据没更新 (<a href="http://192.168.0.66/font-end/look-ui/commits/bf226fc4bd25a20cacfa0eb08c0bb84cbf5f8965">bf226fc</a>)</li>
<li>修复任务状态为空时显示不正确的问题 (<a href="http://192.168.0.66/font-end/look-ui/commits/8f6cfb1a284404fc7888272eb20ebcf1239e90c6">8f6cfb1</a>)</li>
<li>修复webpack报错问题 (<a href="http://192.168.0.66/font-end/look-ui/commits/4ad42a5082e0d372dba375f740a3d8abae26e85a">4ad42a5</a>)</li>
<li>页面首次加载添加tenantId参数 (<a href="http://192.168.0.66/font-end/look-ui/commits/63a1250e0c250a5b6d285c89a887e889dfc8849f">63a1250</a>)</li>
</ul>
<h3>Features</h3>
<ul>
<li>添加查重结果操作按钮自定义插槽 (<a href="http://192.168.0.66/font-end/look-ui/commits/35ce733081d4c471d58e154d441aae8a13e9f9b6">35ce733</a>)</li>
<li>添加查重结果详情回调 (<a href="http://192.168.0.66/font-end/look-ui/commits/82142679185e4a35064c5871dabe3ac033bd8d15">8214267</a>)</li>
<li>添加点击任务标题回调 (<a href="http://192.168.0.66/font-end/look-ui/commits/8697c36d08ee1bfb44df3b6ec9c1f0cfde83ace2">8697c36</a>)</li>
<li>添加取消关注、归并等按钮的回调 (<a href="http://192.168.0.66/font-end/look-ui/commits/0049cea09afda62d3229b30347ad91d65c0bfdae">0049cea</a>)</li>
</ul>
<h3>Performance Improvements</h3>
<ul>
<li>优化数据太多时切换任务类型会造成卡顿效果 (<a href="http://192.168.0.66/font-end/look-ui/commits/9d617dc5ff7a6a3a1d2b2e64e7f8283c90236579">9d617dc</a>)</li>
</ul>
<h2><a href="http://192.168.0.66/font-end/look-ui/compare/1.1.23...1.1.26">1.1.26</a> (2023-11-02)</h2>
<h3>Bug Fixes</h3>
<ul>
<li>修复任务列表变化时数据没更新 (<a href="http://192.168.0.66/font-end/look-ui/commits/bf226fc4bd25a20cacfa0eb08c0bb84cbf5f8965">bf226fc</a>)</li>
<li>修复任务状态为空时显示不正确的问题 (<a href="http://192.168.0.66/font-end/look-ui/commits/8f6cfb1a284404fc7888272eb20ebcf1239e90c6">8f6cfb1</a>)</li>
<li>修复webpack报错问题 (<a href="http://192.168.0.66/font-end/look-ui/commits/4ad42a5082e0d372dba375f740a3d8abae26e85a">4ad42a5</a>)</li>
<li>页面首次加载添加tenantId参数 (<a href="http://192.168.0.66/font-end/look-ui/commits/63a1250e0c250a5b6d285c89a887e889dfc8849f">63a1250</a>)</li>
</ul>
<h3>Features</h3>
<ul>
<li>添加取消关注、归并等按钮的回调 (<a href="http://192.168.0.66/font-end/look-ui/commits/0049cea09afda62d3229b30347ad91d65c0bfdae">0049cea</a>)</li>
</ul>
<h3>Performance Improvements</h3>
<ul>
<li>优化数据太多时切换任务类型会造成卡顿效果 (<a href="http://192.168.0.66/font-end/look-ui/commits/9d617dc5ff7a6a3a1d2b2e64e7f8283c90236579">9d617dc</a>)</li>
</ul>
<h2><a href="http://192.168.0.66/font-end/look-ui/compare/1.1.23...1.1.25">1.1.25</a> (2023-11-01)</h2>
<h3>Bug Fixes</h3>
<ul>
<li>修复任务列表变化时数据没更新 (<a href="http://192.168.0.66/font-end/look-ui/commits/bf226fc4bd25a20cacfa0eb08c0bb84cbf5f8965">bf226fc</a>)</li>
<li>修复任务状态为空时显示不正确的问题 (<a href="http://192.168.0.66/font-end/look-ui/commits/8f6cfb1a284404fc7888272eb20ebcf1239e90c6">8f6cfb1</a>)</li>
<li>页面首次加载添加tenantId参数 (<a href="http://192.168.0.66/font-end/look-ui/commits/63a1250e0c250a5b6d285c89a887e889dfc8849f">63a1250</a>)</li>
</ul>
<h3>Features</h3>
<ul>
<li>添加取消关注、归并等按钮的回调 (<a href="http://192.168.0.66/font-end/look-ui/commits/0049cea09afda62d3229b30347ad91d65c0bfdae">0049cea</a>)</li>
</ul>
<h3>Performance Improvements</h3>
<ul>
<li>优化数据太多时切换任务类型会造成卡顿效果 (<a href="http://192.168.0.66/font-end/look-ui/commits/9d617dc5ff7a6a3a1d2b2e64e7f8283c90236579">9d617dc</a>)</li>
</ul>
<h2><a href="http://192.168.0.66/font-end/look-ui/compare/1.1.23...1.1.24">1.1.24</a> (2023-10-31)</h2>
<h3>Bug Fixes</h3>
<ul>
<li>修复任务列表变化时数据没更新 (<a href="http://192.168.0.66/font-end/look-ui/commits/bf226fc4bd25a20cacfa0eb08c0bb84cbf5f8965">bf226fc</a>)</li>
<li>修复任务状态为空时显示不正确的问题 (<a href="http://192.168.0.66/font-end/look-ui/commits/8f6cfb1a284404fc7888272eb20ebcf1239e90c6">8f6cfb1</a>)</li>
</ul>
<h3>Features</h3>
<ul>
<li>添加取消关注、归并等按钮的回调 (<a href="http://192.168.0.66/font-end/look-ui/commits/0049cea09afda62d3229b30347ad91d65c0bfdae">0049cea</a>)</li>
</ul>
<h2>1.1.23 (2023-10-27)</h2>
<h3>Bug Fixes</h3>
<ul>
<li>修复导入的任务不在对应的tab问题 (<a href="http://192.168.0.66/font-end/look-ui/commit/5e440438c305ba4b385158bdda558794051691a2">5e44043</a>)</li>
<li>修复导入的任务列表没有查重结果时报错问题 (<a href="http://192.168.0.66/font-end/look-ui/commit/f91eecba195a6352c5e8cf1daee1c4507b245fe0">f91eecb</a>)</li>
</ul>
<h3>Features</h3>
<ul>
<li>发布时自动更新CHANGELOG (<a href="http://192.168.0.66/font-end/look-ui/commit/86576d128e3b15718e51b0a3a7851a5c4223897a">86576d1</a>)</li>
</ul>
<h3>Performance Improvements</h3>
<ul>
<li>查重组件优化 (<a href="http://192.168.0.66/font-end/look-ui/commit/5e604d92fd7c95ed1560630b577b493e54638031">5e604d9</a>)</li>
</ul>
