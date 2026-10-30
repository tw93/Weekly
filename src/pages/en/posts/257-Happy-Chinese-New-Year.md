---
date: 2026/02/19
---

<img src="https://cdn.tw93.fun/blog/2000/sq-257.webp" width="800" />

<small>The cover photo was taken a few days before Chinese New Year when I visited Shaoxing for a few days. It was pretty nice overall - this is a drone photo of Anchang Ancient Town. It was fun, very much like a traditional water town.</small>

> **This weekly newsletter documents the practical tech trends I discover each week. After filtering, I publish them here. If you enjoy it, feel free to follow to get update notifications.**

## Trending Tools

**Kaku: A fast, out-of-the-box terminal built for AI coding**
<https://github.com/tw93/Kaku>
A New Year's gift for everyone.

Actually, while developing Pake, I was already thinking about creating a fast, user-friendly Mac terminal tool that I'd love to use. So I started tinkering locally, satisfying my own needs with various customizations. Then when I was developing Mole, this feeling became more intense - why isn't there a terminal tool that I find truly amazing to use?

Before this, I really liked Alacritty because it's the lightest and fastest, but it doesn't support multiple tabs. Then I tried the popular Ghostty and even contributed updates, but the font rendering never quite matched my taste. There's also Warp, which many people love - I couldn't understand why a terminal would need login. Kitty is also good, but it has window management bugs that seem hard to fix.

Then I discovered Wezterm, but unfortunately its last stable release was two years ago. However, since it's Rust-based and I know a bit of Rust, I could deeply customize and modify it. So I started my tinkering journey - whenever I had an issue, I fixed it myself, removed a lot of compatibility modules, tweaked its loading, and built in some convenient features. I wanted it to be as fast as the world's fastest Alacritty, but with multi-tab and split-pane support, so that during AI coding, I could use Claude Code on one side, Codex Review on another, and git diff at the bottom to view code - helping me stay more focused.

Then, the day before yesterday, I had dinner with a friend, and he also complained about not having a good terminal these days. I told him to try mine and wait for me to package it - and that's how Kaku was born. It's actually a Japanese name, Kaku Kaku Kaku Kaku - you can read it very quickly, and it feels refreshing. My tagline for it is "A fast, out-of-the-box terminal built for AI coding." I hope it gives you a smooth, fast TUI experience. It's not quite mature yet, but I've been using it for over half a year now. I'm releasing it for everyone to try - consider it a New Year's gift. Feel free to report bugs. You must try its various keyboard shortcuts. I hope this terminal works out of the box without any configuration needed.

<img src="https://gw.alipayobjects.com/zos/k/3k/WLT7GN.png" width="800" />

**MiaoYan also got an update**
<https://github.com/tw93/MiaoYan>

1. Editing experience upgraded: Unified find and replace between editor and preview, smoother split-sync, more stable switching between preview/presentation/PPT modes.
2. Further performance improvements: Smoother large document input and rendering, optimized Markdown highlighting and code block processing, with async cancellable formatting support.
3. Enhanced reliability and data security: Export and other states now managed through sessions, safer image and text replacement, more stable local PPT images, improved storage path persistence.
4. Details and architecture optimization: Completed multi-language and first-launch templates, more consistent window top behavior, modularized text processing chain and removed old network dependencies.
<img src="https://cdn.tw93.fun/blog/upic/5Zr6co.png" width="800">

**LobsterAI: Your 24/7 personal AI agent for any task, now open source**
<https://lobsterai.youdao.com>
I accidentally discovered a great product from NetEase - LobsterAI, your 24/7 personal AI agent for any task. Plus, they officially announced today that it's now open source.

After installing and setting up the bot in Telegram, I was heading out, so I used my phone to remotely let it read the "Weekly" code repository on my computer - extracting all 2025 content with a clear goal: help me pick the top 20 best recommendations of the year.

I thought it might just scan through randomly to compile a list, but it actually read every single article, being very restrained in its selections, like a real editor. The final Top 20 really matched my taste - it even included Mole, Pake, and MiaoYan, the projects I've been maintaining, and wrote some encouraging words. It was unexpectedly touching.

After using it, I roughly understand why it can achieve this level: it has a cross-session persistent memory system that remembers my preferences. The foundation is a local-first design that can actually execute operations on your machine, not just having cloud conversations and calling it done. This naturally avoids issues with latency, privacy, and offline scenarios. Every step is completely transparent to you - it's not a black box running - you have full control at all times, making it quite suitable for organization-based automation.

Its capabilities aren't just reading and writing - making PPTs, scheduled tasks, searching, calling local tools... all built in. In settings, you can also connect Feishu, DingTalk, Telegram, Discord, or use email - all out of the box.

The video records the entire process from configuration to generating the Top 20. Check it out if you're interested. It's already open source, so everyone can definitely play with it and hand over all those repetitive, boring tasks to it. I'm really looking forward to this little lobster getting better and better.
<video width="800px" preload loop autoplay controls muted><source src="https://cdn.tw93.fun/uPic/LobsterAI.mp4" type="video/mp4"></video>

**OpenTrace: Visual route tracing tool, cross-platform native GUI**
<https://opentrace.app>
Recently discovered a cool tool called OpenTrace - an open-source visual route tracing tool. The fun part is that after you enter an IP or domain, you can see step by step how traffic flows between different nodes.
<img src="https://cdn.tw93.fun/uPic/jNUjyr.png" width="800">

**Claude Code's /plugin: Go to Marketplaces and pick plugins**
If you use Claude Code, be sure to try the /plugin function, then go to Marketplaces and wildly pick plugins that suit you.
<img src="https://gw.alipayobjects.com/zos/k/d4/7ojonZ.png" width="800">

**FineTune: The volume mixer macOS should have**
<https://github.com/ronitsingh10/FineTune>
Basically the volume mixer that macOS should have come with - truly independent volume control per application, with separate sliders and mute for each app.
<img src="https://gw.alipayobjects.com/zos/k/8j/bl1wHy.png" width="800">

**Snitch: A better-looking network connection viewer**
<https://github.com/karol-broda/snitch>
I found a pretty interesting little tool called Snitch that makes viewing network connections more beautiful and "human-friendly" - you can think of it as an ss or netstat for humans.
<img src="https://github.com/karol-broda/snitch/raw/master/demo/demo.gif" width="800">

**Beautiful Mermaid: Beautiful Mermaid renderer designed for the AI era**
<https://github.com/lukilabs/beautiful-mermaid>
Recently saw a very beautiful Mermaid renderer - clean and comfortable, designed specifically for the AI era, from the Craft team.
<img src="https://gw.alipayobjects.com/zos/k/ct/oADkqY.png" width="800">

## Just for Fun

**Showing off my cooking skills for the New Year's Eve dinner, wishing everyone a Happy New Year!**
<video width="800px" preload loop autoplay controls muted><source src="https://cdn.tw93.fun/blog/upic/4t4MCK.mp4" type="video/mp4"></video>

**Aerial footage of Anchang Ancient Town**
Hahaha, no crash, no crash, no crash! Filmed a water town, exactly how I imagined a Jiangnan water town ancient town should look. Paired with Zhi Li's "The End" - a perfect match.
<video width="800px" preload loop autoplay controls muted><source src="https://cdn.tw93.fun/blog/upic/Hyo4OC.mp4" type="video/mp4"></video>

**Apple Developer account finally approved**
Great news!!! My Apple Developer account is finally approved - can't wait to make something new in 2026! I've been applying for 3 years, and for some reason kept getting "Contact us to continue the process, there may be an issue with your account." Even the support specialist couldn't solve it. Finally, I learned a trick from Xiaohongshu - just write to Tim Cook. It really works, super fast! Someone contacted me the next day to submit materials, and today it got approved!
<img src="https://gw.alipayobjects.com/zos/k/2d/1nCAfm.png" width="800" />
