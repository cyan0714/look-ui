

## [1.2.1](http://192.168.0.66/font-end/look-ui/compare/1.2.0...1.2.1) (2023-12-19)


### Bug Fixes

* ZDRWFJ-1809 切换查重点时, 将各个checkbox设置为false ([8d72b11](http://192.168.0.66/font-end/look-ui/commits/8d72b111bbc4cb029c77b3d290fe901821feccdb))

# [1.2.0](http://192.168.0.66/font-end/look-ui/compare/1.1.30...1.2.0) (2023-12-07)


### Bug Fixes

* 修复查重结果加载不出来的问题 ([c606024](http://192.168.0.66/font-end/look-ui/commits/c6060240611588601372e7e2c66230b68178c050))


### Features

* 操作当前查重结果时回调参数添加当前选中的任务 ([29095e1](http://192.168.0.66/font-end/look-ui/commits/29095e1f2b77dad0c3353972619f3d3376f8c7f6))
* 功能优化 ([f72a7be](http://192.168.0.66/font-end/look-ui/commits/f72a7be9f05dd7cc3eadc3eacbd8695741549ed1))
* 添加查重接口入参 ([c778252](http://192.168.0.66/font-end/look-ui/commits/c778252e07e7edae18e3d3ee232cf88dd6e46401))
* 添加点击处理结果回调 ([ec0f8c5](http://192.168.0.66/font-end/look-ui/commits/ec0f8c575773ffc4e467527b32973d7ce88dfb5b))
* 添加已创建任务图片 ([4c8a3c7](http://192.168.0.66/font-end/look-ui/commits/4c8a3c7c4fe025d549609772b8b5c13ef265c515))

## [1.1.30](http://192.168.0.66/font-end/look-ui/compare/1.1.29...1.1.30) (2023-11-07)


### Bug Fixes

* 修复监听任务状态变化时点击全选无效问题 ([e464178](http://192.168.0.66/font-end/look-ui/commits/e4641782cd59356d14a2f2483d424f2fa07efafe))


### Features

* 批量创建任务回调返回选中任务数组 ([caddb29](http://192.168.0.66/font-end/look-ui/commits/caddb29e3a097c9985ca715554f7fad0a86c1a6a))

## [1.1.29](http://192.168.0.66/font-end/look-ui/compare/1.1.28...1.1.29) (2023-11-06)


### Bug Fixes

* 修复任务重复出现在不同的列表中 ([c87959e](http://192.168.0.66/font-end/look-ui/commits/c87959efda64b14af9b68b4b7b49527f3b50daf3))

## [1.1.28](http://192.168.0.66/font-end/look-ui/compare/1.1.23...1.1.28) (2023-11-03)


### Bug Fixes

* 修复点击标题问题 ([fce11f8](http://192.168.0.66/font-end/look-ui/commits/fce11f8cfed110312f3349c144ac17d180e7927b))
* 修复点击查看详情没有返回当前任务信息问题 ([c357609](http://192.168.0.66/font-end/look-ui/commits/c357609d801b35425f148806039b441a33df2ba8))
* 修复任务列表变化时数据没更新 ([bf226fc](http://192.168.0.66/font-end/look-ui/commits/bf226fc4bd25a20cacfa0eb08c0bb84cbf5f8965))
* 修复任务状态为空时显示不正确的问题 ([8f6cfb1](http://192.168.0.66/font-end/look-ui/commits/8f6cfb1a284404fc7888272eb20ebcf1239e90c6))
* 修复webpack报错问题 ([4ad42a5](http://192.168.0.66/font-end/look-ui/commits/4ad42a5082e0d372dba375f740a3d8abae26e85a))
* 页面首次加载添加tenantId参数 ([63a1250](http://192.168.0.66/font-end/look-ui/commits/63a1250e0c250a5b6d285c89a887e889dfc8849f))


### Features

* 添加查重结果操作按钮自定义插槽 ([35ce733](http://192.168.0.66/font-end/look-ui/commits/35ce733081d4c471d58e154d441aae8a13e9f9b6))
* 添加查重结果详情回调 ([8214267](http://192.168.0.66/font-end/look-ui/commits/82142679185e4a35064c5871dabe3ac033bd8d15))
* 添加点击任务标题回调 ([8697c36](http://192.168.0.66/font-end/look-ui/commits/8697c36d08ee1bfb44df3b6ec9c1f0cfde83ace2))
* 添加取消关注、归并等按钮的回调 ([0049cea](http://192.168.0.66/font-end/look-ui/commits/0049cea09afda62d3229b30347ad91d65c0bfdae))


### Performance Improvements

* 优化数据太多时切换任务类型会造成卡顿效果 ([9d617dc](http://192.168.0.66/font-end/look-ui/commits/9d617dc5ff7a6a3a1d2b2e64e7f8283c90236579))

## [1.1.27](http://192.168.0.66/font-end/look-ui/compare/1.1.23...1.1.27) (2023-11-02)


### Bug Fixes

* 修复点击标题问题 ([fce11f8](http://192.168.0.66/font-end/look-ui/commits/fce11f8cfed110312f3349c144ac17d180e7927b))
* 修复点击查看详情没有返回当前任务信息问题 ([c357609](http://192.168.0.66/font-end/look-ui/commits/c357609d801b35425f148806039b441a33df2ba8))
* 修复任务列表变化时数据没更新 ([bf226fc](http://192.168.0.66/font-end/look-ui/commits/bf226fc4bd25a20cacfa0eb08c0bb84cbf5f8965))
* 修复任务状态为空时显示不正确的问题 ([8f6cfb1](http://192.168.0.66/font-end/look-ui/commits/8f6cfb1a284404fc7888272eb20ebcf1239e90c6))
* 修复webpack报错问题 ([4ad42a5](http://192.168.0.66/font-end/look-ui/commits/4ad42a5082e0d372dba375f740a3d8abae26e85a))
* 页面首次加载添加tenantId参数 ([63a1250](http://192.168.0.66/font-end/look-ui/commits/63a1250e0c250a5b6d285c89a887e889dfc8849f))


### Features

* 添加查重结果操作按钮自定义插槽 ([35ce733](http://192.168.0.66/font-end/look-ui/commits/35ce733081d4c471d58e154d441aae8a13e9f9b6))
* 添加查重结果详情回调 ([8214267](http://192.168.0.66/font-end/look-ui/commits/82142679185e4a35064c5871dabe3ac033bd8d15))
* 添加点击任务标题回调 ([8697c36](http://192.168.0.66/font-end/look-ui/commits/8697c36d08ee1bfb44df3b6ec9c1f0cfde83ace2))
* 添加取消关注、归并等按钮的回调 ([0049cea](http://192.168.0.66/font-end/look-ui/commits/0049cea09afda62d3229b30347ad91d65c0bfdae))


### Performance Improvements

* 优化数据太多时切换任务类型会造成卡顿效果 ([9d617dc](http://192.168.0.66/font-end/look-ui/commits/9d617dc5ff7a6a3a1d2b2e64e7f8283c90236579))

## [1.1.26](http://192.168.0.66/font-end/look-ui/compare/1.1.23...1.1.26) (2023-11-02)


### Bug Fixes

* 修复任务列表变化时数据没更新 ([bf226fc](http://192.168.0.66/font-end/look-ui/commits/bf226fc4bd25a20cacfa0eb08c0bb84cbf5f8965))
* 修复任务状态为空时显示不正确的问题 ([8f6cfb1](http://192.168.0.66/font-end/look-ui/commits/8f6cfb1a284404fc7888272eb20ebcf1239e90c6))
* 修复webpack报错问题 ([4ad42a5](http://192.168.0.66/font-end/look-ui/commits/4ad42a5082e0d372dba375f740a3d8abae26e85a))
* 页面首次加载添加tenantId参数 ([63a1250](http://192.168.0.66/font-end/look-ui/commits/63a1250e0c250a5b6d285c89a887e889dfc8849f))


### Features

* 添加取消关注、归并等按钮的回调 ([0049cea](http://192.168.0.66/font-end/look-ui/commits/0049cea09afda62d3229b30347ad91d65c0bfdae))


### Performance Improvements

* 优化数据太多时切换任务类型会造成卡顿效果 ([9d617dc](http://192.168.0.66/font-end/look-ui/commits/9d617dc5ff7a6a3a1d2b2e64e7f8283c90236579))

## [1.1.25](http://192.168.0.66/font-end/look-ui/compare/1.1.23...1.1.25) (2023-11-01)


### Bug Fixes

* 修复任务列表变化时数据没更新 ([bf226fc](http://192.168.0.66/font-end/look-ui/commits/bf226fc4bd25a20cacfa0eb08c0bb84cbf5f8965))
* 修复任务状态为空时显示不正确的问题 ([8f6cfb1](http://192.168.0.66/font-end/look-ui/commits/8f6cfb1a284404fc7888272eb20ebcf1239e90c6))
* 页面首次加载添加tenantId参数 ([63a1250](http://192.168.0.66/font-end/look-ui/commits/63a1250e0c250a5b6d285c89a887e889dfc8849f))


### Features

* 添加取消关注、归并等按钮的回调 ([0049cea](http://192.168.0.66/font-end/look-ui/commits/0049cea09afda62d3229b30347ad91d65c0bfdae))


### Performance Improvements

* 优化数据太多时切换任务类型会造成卡顿效果 ([9d617dc](http://192.168.0.66/font-end/look-ui/commits/9d617dc5ff7a6a3a1d2b2e64e7f8283c90236579))

## [1.1.24](http://192.168.0.66/font-end/look-ui/compare/1.1.23...1.1.24) (2023-10-31)


### Bug Fixes

* 修复任务列表变化时数据没更新 ([bf226fc](http://192.168.0.66/font-end/look-ui/commits/bf226fc4bd25a20cacfa0eb08c0bb84cbf5f8965))
* 修复任务状态为空时显示不正确的问题 ([8f6cfb1](http://192.168.0.66/font-end/look-ui/commits/8f6cfb1a284404fc7888272eb20ebcf1239e90c6))


### Features

* 添加取消关注、归并等按钮的回调 ([0049cea](http://192.168.0.66/font-end/look-ui/commits/0049cea09afda62d3229b30347ad91d65c0bfdae))

## 1.1.23 (2023-10-27)


### Bug Fixes

* 修复导入的任务不在对应的tab问题 ([5e44043](http://192.168.0.66/font-end/look-ui/commit/5e440438c305ba4b385158bdda558794051691a2))
* 修复导入的任务列表没有查重结果时报错问题 ([f91eecb](http://192.168.0.66/font-end/look-ui/commit/f91eecba195a6352c5e8cf1daee1c4507b245fe0))


### Features

* 发布时自动更新CHANGELOG ([86576d1](http://192.168.0.66/font-end/look-ui/commit/86576d128e3b15718e51b0a3a7851a5c4223897a))


### Performance Improvements

* 查重组件优化 ([5e604d9](http://192.168.0.66/font-end/look-ui/commit/5e604d92fd7c95ed1560630b577b493e54638031))