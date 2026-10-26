import assert from "node:assert/strict";
import test from "node:test";
import { alignTranslation, parseIssueItems } from "../src/issueItems.js";

test("splits a bold-title issue into items with link and note", () => {
  const items = parseIssueItems(`---
date: 2026/10/26
---

<img src="https://cdn.fliggy.com/pic/28728.jpg" width="800" />

<small>封面图拍摄于散步的路上。</small>

> **记录每周看到的接地气的潮流技术**

## 潮流工具

**Harp：又一个漂亮的侧边栏形式的 AI 终端**
<https://github.com/dominikmartn/harp>
这个做着挺漂亮的，并行运行多个 Claude Code 和 Codex Agent。
<img src="https://cdn.fliggy.com/pic/9dzW2a01.png" width="800" />

**让你的 Mac 主题色变的很漂亮**
命令行输入后重启应用可得到生效。
\`defaults write -g NSColorSimulateHardwareAccent -bool YES\`

\`\`\`js
const ignored = "code blocks are not notes";
\`\`\`

## 随便写写

**最近养成了一个非常好的习惯**

每次快到晚上，第一件事其实就是去刷牙洗澡。
`);

  assert.deepEqual(items, [
    {
      section: "潮流工具",
      title: "Harp：又一个漂亮的侧边栏形式的 AI 终端",
      url: "https://github.com/dominikmartn/harp",
      note: "这个做着挺漂亮的，并行运行多个 Claude Code 和 Codex Agent。",
    },
    {
      section: "潮流工具",
      title: "让你的 Mac 主题色变的很漂亮",
      url: null,
      note: "命令行输入后重启应用可得到生效。 defaults write -g NSColorSimulateHardwareAccent -bool YES",
    },
    {
      section: "随便写写",
      title: "最近养成了一个非常好的习惯",
      url: null,
      note: "每次快到晚上，第一件事其实就是去刷牙洗澡。",
    },
  ]);
});

test("reads the list layouts of the early issues and the 2023 roundup", () => {
  const items = parseIssueItems(`### 工具

- [Hoppscotch - PostMan 的漂亮前女友](https://github.com/hoppscotch/hoppscotch)

### 好文和学习

1. **[Web Worker 文献综述](http://www.alloyteam.com/2020/07/14680/)**：alloyteam 出品的深度好文

## 学习类

2. [**YouGlish**](https://youglish.com/)：使用 YouTube 来提高你的英语发音。
`);

  assert.deepEqual(items, [
    {
      section: "工具",
      title: "Hoppscotch - PostMan 的漂亮前女友",
      url: "https://github.com/hoppscotch/hoppscotch",
      note: "",
    },
    {
      section: "好文和学习",
      title: "Web Worker 文献综述",
      url: "http://www.alloyteam.com/2020/07/14680/",
      note: "alloyteam 出品的深度好文",
    },
    {
      section: "学习类",
      title: "YouGlish",
      url: "https://youglish.com/",
      note: "使用 YouTube 来提高你的英语发音。",
    },
  ]);
});

test("keeps an inline link in the note as text and ignores the intro", () => {
  const items = parseIssueItems(`> **记录每周看到的前端潮流技术**

**Not an item, no heading yet**

## 好文和学习

**Vue Ref 语法糖提案作者的回复**
<https://github.com/vuejs/rfcs/pull/228>
从掘金上看到这个[Vue 3.0 Ref-sugar 提案](https://juejin.im/post/6894175515515551752)，来龙去脉就清晰了。
`);

  assert.equal(items.length, 1);
  assert.equal(items[0].url, "https://github.com/vuejs/rfcs/pull/228");
  assert.equal(
    items[0].note,
    "从掘金上看到这个Vue 3.0 Ref-sugar 提案，来龙去脉就清晰了。",
  );
});

test("reads a translated link line as the item link", () => {
  const [item] = parseIssueItems(`## Just Looking Around

**Google I/O 2021 Technical Recaps**  
[Watch on YouTube](https://www.youtube.com/playlist?list=PLOU2XLYxmsIJhsF3up2ueu2pRealr9raD)  
The production quality is exceptional as always.
`);
  assert.equal(
    item.url,
    "https://www.youtube.com/playlist?list=PLOU2XLYxmsIJhsF3up2ueu2pRealr9raD",
  );
  assert.equal(item.note, "The production quality is exceptional as always.");

  const [bolded] = parseIssueItems(`## 灵感和设计

**互动营销类产品有哪些动效超好用？**  
**https://www.uisdc.com/marketing-dynamic-effect**  
挺好看的，结合业务用途的方式来弄动效设计。
`);
  assert.equal(bolded.url, "https://www.uisdc.com/marketing-dynamic-effect");
  assert.equal(bolded.note, "挺好看的，结合业务用途的方式来弄动效设计。");
});

test("pairs translated items by shared links, not by position", () => {
  const item = (url) => ({ url });
  // Issue 257: the translation moved LobsterAI from slot 4 to slot 2 and
  // dropped the links of /plugin (none in the original) and FineTune.
  const original = [
    item("https://github.com/tw93/Kaku"),
    item("https://opentrace.app"),
    item(null),
    item("https://lobsterai.youdao.com"),
    item("https://github.com/ronitsingh10/FineTune"),
    item("https://github.com/karol-broda/snitch"),
  ];
  const translated = [
    item("https://github.com/tw93/Kaku"),
    item("https://lobsterai.youdao.com"),
    item("https://opentrace.app"),
    item(null),
    item(null),
    item("https://github.com/karol-broda/snitch"),
  ];
  const pairs = alignTranslation(original, translated);
  assert.equal(pairs[3], 2, "/plugin pairs with /plugin");
  assert.equal(pairs[4], 4, "FineTune pairs with FineTune");
  assert.equal(original[pairs[4]].url, "https://github.com/ronitsingh10/FineTune");

  // A gap of a different size stays unpaired rather than guessed.
  const short = alignTranslation(
    [item("https://a.dev"), item(null), item("https://b.dev"), item("https://c.dev")],
    [item("https://a.dev"), item(null), item("https://c.dev")],
  );
  assert.equal(short[1], -1);
});
