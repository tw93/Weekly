---
date: 2026/03/02
---

<img src="https://cdn.tw93.fun/blog/2000/7t-258.webp" width="800" />

<small>Cover photo shows my finally installed cyber charging station at home. It looks incredibly cool! I ordered it back in January and it finally got installed today. Tesla's service remains as professional as ever, and their products are as cool as ever. Staying long on Tesla.</small>

> **Recording down-to-earth trending tech I see every week, filtered and published here. Follow this weekly newsletter to get update notifications**

## Trending Tools

**Kaku, the blazing fast and AI-friendly terminal, just released version 0.5 - go try it out**
<https://github.com/tw93/Kaku>
1. AI Shell Error Fixing: When a command fails, Kaku automatically sends it to AI and displays fix suggestions right in the terminal. Press Cmd + Shift + E to apply them instantly.
2. Built-in Yazi: Press Cmd + Shift + Y or just type y to open Yazi. Layout and theme are auto-configured on first run. cd + Tab falls back to zsh-z history directories when no filesystem matches are found.
3. Command Palette: Press Cmd + Shift + P for quick command search with fuzzy matching and native text editing support.
4. Kaku Doctor: Run kaku doctor to detect configuration issues with interactive one-click fixes.
5. Global Hotkey: Default Ctrl + Opt + Cmd + K to summon or hide Kaku from any app. Customizable via macos_global_hotkey.
6. Shell Text Editing: Use Cmd + A to select all, Shift + Arrow keys to extend selection, and type directly to replace selected content - just like a native text editor.
7. Unified AI Config: The kaku ai interface now manages Kaku Assistant, Factory Droid, and opencode.jsonc in one place.
8. Tab Bell Indicator: When you switch to another tab, tabs with results or notifications show a blinking dot.
9. Scroll and Input Improvements: Smoother trackpad scrolling in less, man, etc. With DECSET 1007 alternate scroll mode support. Fixed popup position offset issues with Typeless and other CJK input methods.
10. Window Shadow Restored: Native macOS window shadows are back. They were temporarily disabled due to GPU usage issues in earlier versions.
11. Faster Startup and Smaller Binary: Lua bytecode caching and lazy loading reduce startup time. Fat LTO and single codegen unit shrink binary size.
12. Shell Integration Detection Fix: Shell integration now loads correctly in all terminal environments, no longer depending on whether $TERM is kaku. User-loaded plugins are no longer loaded twice.
<img src="https://cdn.tw93.fun/blog/upic/D4hdW4.png" width="800" />

**PortKiller: Cross-platform port management tool with native UI**
<https://github.com/productdevbook/port-killer>
Found a cool tool on GitHub called PortKiller - a cross-platform port management app for developers. It does more than just list ports: it automatically discovers all listening TCP ports, lets you kill processes with one click, supports search and filtering, favorites, port watching with notifications, and smart categorization for common dev services. It also covers real workflows, like managing kubectl port-forward sessions with auto-reconnect, logs, connect/disconnect notifications, and showing active Cloudflare Tunnel connections.
<img src="https://gw.alipayobjects.com/zos/k/rm/M8Cabs.png" width="800" />

**Surge: Blazing fast open-source TUI download manager written in Go**
<https://github.com/surge-downloader/surge>
Recently discovered a cool tool called Surge - a super fast open-source TUI download manager designed for power users, written in Go with a clean keyboard workflow. It doesn't treat downloads as a single stream - instead it opens multiple connections, splits files into chunks and pulls them in parallel, with automatic failover across multiple mirrors. You can also switch to streaming mode for sequential downloads, which is more convenient for previewing media.
<img src="https://gw.alipayobjects.com/zos/k/n8/demo.gif" width="800" />

**FluentRead: Open-source immersive browser translation extension**
<https://chromewebstore.google.com/detail/%E6%B5%81%E7%95%85%E9%98%85%E8%AF%BB/djnlaiohfaaifbibleebjggkghlmcpcj>
FluentRead is a solid open-source immersive translation extension for browsers. It's clean with just the right amount of features, plus you can configure your own API key. The translation style and page integration look good too. Give it a try.
<img src="https://gw.alipayobjects.com/zos/k/a3/sfhPpB.png" width="800" />

**LobsterAI recently improved its Skills capabilities**
<https://lobsterai.youdao.com>
I've been using NetEase's LobsterAI recently. Looking at their changelog, they've been optimizing Skills - it now has built-in modules for document processing, frontend design, browser automation, web search, and even finding movie resources. The scenarios are ready to go, and many can be completed with just one sentence.

I tried an interesting combo this time. I've been curious about the TV series "Taiping Years" and wanted to brush up on the Five Dynasties and Ten Kingdoms period of history. So I just threw in a prompt: "Organize the timeline and key knowledge points of the Five Dynasties and Ten Kingdoms into a PDF with high information density, and also search for any cloud storage resources for Taiping Years." It called three Skills - web-search, pdf, and films-search. The PDF was generated directly with a clear timeline and decent formatting; the resource search actually found download links, saving me the time of digging through various sites.

Skills save time on building tool chains, writing scripts, and cleaning data. For engineers, it turns what used to require setting up workflows into direct API calls, with deduplication, formatting, and summarization handled together. Combined, you can do more - like monitoring a competitor's weekly updates, using web-search to fetch them, extracting key changes with playwright, and generating a competitor report, all in one place. If you're interested, start with your most repetitive high-frequency scenarios. Give LobsterAI's latest Skills a try.
<video width="800px" preload loop autoplay controls muted><source src="https://cdn.tw93.fun/blog/pic/wy17.mp4" type="video/mp4"></video>

**SuperCmd: Open-source macOS launcher with more features than expected**
<https://github.com/SuperCmdLabs/SuperCmd>
Found SuperCmd on GitHub - an open-source macOS launcher that's more complete than I expected. It puts Raycast-style extension workflows, voice input, text-to-speech, memory, and AI actions into an open system. Great to see this level of open-source innovation in the macOS launcher space.
<img src="https://cdn.tw93.fun/blog/upic/bE3L9n.png" width="800" />

**Helium: The minimalist browser I switched back to from Edge, with great spatial feel**
<https://helium.computer/>
I recently switched my main browser from Edge back to Helium. I thought I liked vertical tabs, but what I really wanted was a more minimal UI and more workspace. Helium now has vertical tabs too, but the real highlight is compact mode - address bar and tabs on the same line, clean and space-efficient. Paired with my Maple theme and Maple bookmarks extension, the whole setup feels comfortable - focused, no noise.
<img src="https://cdn.tw93.fun/blog/upic/eNH71k.png" width="800" />

## Random Finds

**Claude's new program for open source maintainers: 6 months of Claude Max 20x**
<https://claude.com/contact-sales/claude-for-oss>
Claude just launched a program for open source maintainers offering 6 months of free Claude Max 20x. If you're a primary maintainer of a public repo with 5K+ stars, or a core member of an NPM package with 1M+ monthly downloads, and you've been active in the last 3 months, check it out. If you've been consistently contributing to Mole, Pake, MiaoYan, or other major open source projects and meet these criteria, give it a shot.

**Taiping Years is sooooo good**
<https://movie.douban.com/subject/36317421/>
Guys, Taiping Years is sooooo good - go watch it. It's really great, the kind where the first episode already blows you away.
<img src="https://cdn.tw93.fun/blog/upic/TO4qMn.png" width="800" />

**Aerial view of Xixi Wetland**
Welcome to listen to Li Zhi's "Castle in the Sky" while watching this aerial view of Xixi Wetland - it looks quite beautiful from above. Should be even more stunning by mid-March.
<video width="800px" preload loop autoplay controls muted><source src="https://cdn.tw93.fun/blog/upic/pHKa5r.mp4" type="video/mp4"></video>

**Rong Xiao Guan is quite fresh!**
If you're shopping at Hangzhou Tower, try this place on the 8th floor of the new Building B. It's pretty good - light but delicious and fresh.

<table style="margin-top:-20px">
    <tr>
        <td width="25%">
           <img src="https://gw.alipayobjects.com/zos/k/st/qTXqvC.png" width="420" />
        </td>
        <td width="25%">
           <img src="https://gw.alipayobjects.com/zos/k/l8/VAgHUx.png" width="420" />
        </td>
        <td width="25%">
            <img src="https://gw.alipayobjects.com/zos/k/ms/RJad2x.png" width="380" />
        </td>
         <td width="15%">
            <img src="https://gw.alipayobjects.com/zos/k/yv/pd45lt.png" width="380" />
        </td>
    </tr>
</table>
