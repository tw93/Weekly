潮流周刊是工程师 Tw93 每周一发布的中文周刊，记录一周里看到的接地气的潮流技术：小而好用的开发者工具、值得一看的开源项目、有意思的文章、macOS 与移动端软件，以及一些生活与设计上的观察。第一期发布于 2020 年 11 月，此后每周一更新一期，期号从 1 开始连续编号，不会重排也不会复用。

## 每期长什么样

每期开头是一张封面图和一句关于这张图的说明，正文按 `潮流工具`、`潮流开源`、`潮流文章`、`潮流软件`、`潮流分享` 几个栏目组织，每条是一小段介绍加一个外链，指向被推荐的工具或文章本身。周刊只做筛选和转述，不代表被推荐产品的官方说明。

## 中英双语

每一期中文原文都有对应的英文翻译，两边用同一个期号对应：中文在 `weekly.tw93.fun/posts/274`，英文在 `weekly.tw93.fun/en/posts/274`。英文版由翻译流程生成后人工检查，用词以可读为先，专有名词保留原文。

## 订阅与参与

- RSS：[中文](https://weekly.tw93.fun/rss.xml) 与 [English](https://weekly.tw93.fun/en/rss.xml)，包含每期全文。
- 全站内容开源在 [github.com/tw93/weekly](https://github.com/tw93/weekly)，Star 与 Watch 都能收到更新。
- 想推荐好东西，可以发在 [Discussions](https://github.com/tw93/weekly/discussions/22)，被收录会在当期注明。
- 每期底部有评论区，基于 GitHub Discussions，登录 GitHub 即可留言。

## 给 AI Agent 与开发者

站点为程序化读取准备了几个固定入口，全部是公开静态文件，无需密钥、无速率限制、允许跨域：

- [/llms.txt](https://weekly.tw93.fun/llms.txt)：导航索引；[/llms.md](https://weekly.tw93.fun/llms.md)：完整的 agent 指南，包含适用场景与调用方式。
- [/index.md](https://weekly.tw93.fun/index.md)：站点首页的 Markdown 版本，列出全部期刊。任意期刊地址后加 `.md` 即为该期的 Markdown 原文。
- [/api/index.json](https://weekly.tw93.fun/api/index.json)：只读 JSON API 的服务说明；[/api/posts.json](https://weekly.tw93.fun/api/posts.json) 是全部期刊索引；[/openapi.json](https://weekly.tw93.fun/openapi.json) 是 OpenAPI 3.1 描述。
- [/feeds/posts.jsonl](https://weekly.tw93.fun/feeds/posts.jsonl)：每行一个 schema.org BlogPosting，适合批量导入。

站点没有账号体系，也没有付费内容，唯一接收提交的是给读者用的邮件订阅接口 /api/subscribe，它只会给填写的邮箱发一封确认信，因此不存在 API key、OAuth 流程或沙箱环境。抓取时优先用上面的索引和 feed，不必逐页爬 HTML。

## 引用与授权

欢迎引用和转述，注明出处为潮流周刊并保留原期链接即可。图片托管在作者自己的 CDN 上，请不要直接外链到其他产品里。站点代码以 MIT 协议开源，内容版权归作者所有。

## 联系

作者 Tw93，产品工程师，常驻杭州，也维护 Pake、MiaoYan、Kaku、Mole 等开源项目。可以通过 [GitHub Issues](https://github.com/tw93/weekly/issues)、[X](https://x.com/HiTw93) 或邮件 tw93@qq.com 联系，日常写作在 [tw93.fun](https://tw93.fun)。
