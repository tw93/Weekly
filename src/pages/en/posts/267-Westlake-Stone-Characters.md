
---
date: 2026/05/11
---


<img src="https://cdn.tw93.fun/blog/pic/26722.jpg" width="800" />

<small>The cover photo was taken last weekend. To get a feel for the strokes for my type design project Luo, I went looking for these kinds of stone-carved characters along the road by West Lake and snapped this shot.</small>

> **Recording down-to-earth trending tech I see every week, filtered and published here. Follow this weekly newsletter to get update notifications**

## Just Writing

**You Didn't Know GEO: AI Visibility Principles, Practices, and Trade-offs**
<https://tw93.fun/en/2026-05-01/ai-visibility.html>
A bunch of friends have @-ed me lately saying my open source tools are getting recommended unprompted when they ask AI questions. I hadn't done anything special, so I figured why not spend an hour structuring the content properly. After doing it I fired off a quick tweet, but the structure was messy. People seemed genuinely interested, so I decided to write it up as a proper article for reference and lookup.
<img src="https://cdn.tw93.fun/blog/pic/OMaEoa53.png" width="800" />

## Trending Tools

**Kami, the typesetting system that gives good content the layout it deserves, has been upgraded**
<https://github.com/tw93/Kami>
Kami has had several upgrades recently, including fixing Chinese garbled text in PPT, speeding up the engineering, expanding doc analogues to 8 categories, polishing many layout details, updating the built-in chart capabilities, and more. Welcome to update and try it out.
<img src="https://cdn.tw93.fun/blog/pic/rPlaVb01.png" width="800" />

**Waza, the engineer's 8 skill trees, has been updated**
<https://github.com/tw93/Waza>
1. Durable Context: six skills (think, check, hunt, design, write, health) can consume optional memory/preview context. Safety contract: current state always wins, raw conversation reads disabled by default, hardcoded machine paths not allowed.
2. Plan Execution Mode: /check executes approved implementation plans step by step, defaults to review-then-ship continuation, document review routes to /write.
3. Evaluation Mode: /think now outputs Kill/Keep/Pivot, deciding whether something should be done or kept.
4. Validation guardrails: trigger word overlap detection, routing drift checks, attribution leak interception, preventing silent skill conflicts and accidental personal info leaks.
5. Design and Write references: added typography traps, design tokens, aesthetic quality, Chinese-English mixed typesetting standards, release-note style guide.
<img src="https://gw.alipayobjects.com/zos/k/qa/waza_repaired_v4.svg" width="800" />

**Kaku finally updated to V0.10**
<https://github.com/tw93/kaku>
🥷 Long wait, everyone. Kaku finally hits V0.10. I held this version back through several minor releases while I kept tuning a really handy in-app Agent assistant. The vibe is a clean, no-nonsense tech buddy. You can summon it with Cmd + L without disturbing any of your existing content, but it's smart enough to read your context, and I've equipped it with a curated set of solid tools. You configure its brain through kaku ai. I highly recommend setting up search capabilities, and pipellm is a nice option.

AI features are something I've always wanted to build but didn't want to disturb users with. If you're more of a pure terminal user, I've also added plenty of features worth catching up on.

First, there's a fun smart window-close intercept. When you haven't configured whether to intercept window closing in kaku config, if you're in the middle of AI work it'll dynamically intercept and ask whether you really want to close, so you don't accidentally kill it.

It also finally supports window snapshot. Kaku auto-saves multi-tab and multi-pane layouts. When needed, hit Cmd+Option+Shift+T or use Shell → Restore Previous Window to recover. This nicely solves the pain of accidentally closing a window and wanting to start back up.

Some folks suggested that the light mode looks great but the dark mode contrast is a bit too strong. Got it. I've now tuned a much softer dark mode, dropping the saturation of highlight colors and slightly dimming foreground text, so staring at the screen for a long time is easier on the eyes.

I'm also obsessive about startup speed, especially cold start. I want to build the fastest terminal. Through Lua bytecode caching, lazy initialization of fonts and config, shell user variable caching, and similar tricks, your Kaku now opens almost instantly. Still a tiny bit behind Alacritty, but I'm working on it.

Lastly, fixed full-screen crashes and freezes, multi-monitor race conditions, resize gaps, cursor reflow, links, selection, light theme readability, TUI copy, and many other detail issues.

If this is your first time hearing about Kaku, welcome to give it a try. Still not mature, actively being polished. Any suggestions or bugs, please file an issue and I'll handle them.
<video width="800px" preload="metadata" loop autoplay muted><source src="https://cdn.tw93.fun/blog/pic/kaku14.mp4" type="video/mp4"></video>

## Just Looking Around

**M5 Pro in black finally arrived. Stunning. Very excited**
16-inch M5 Pro / 48GB / 1TB black with standard glass. I think this config is a great fit for anyone considering a new machine.
<video width="800px" preload="metadata" controls><source src="https://cdn.fliggy.com/pic/OmwIwvcUMu7rfc8359.mp4" type="video/mp4"></video>

**Picked up an iPhone SE3 to play with**
How can such a small phone feel this refined? Just lovely to hold.

<table style="margin-top:-20px">
    <tr>
        <td width="33%">
          <img src="https://cdn.tw93.fun/blog/pic/IMG_099853.JPG" width="400" />
        </td>
        <td width="33%">
            <img src="https://cdn.tw93.fun/blog/pic/IMG_099901.JPG" width="400" />
        </td>
        <td width="33%">
            <img src="https://cdn.tw93.fun/blog/pic/IMG_100106.JPG" width="400" />
        </td>
    </tr>
</table>

**A neat UI bug debugging trick of mine**
Sharing a really useful UI bug debugging approach. Back in my old-school coding days I often used screen-recording with slow-motion playback. AI struggles with this kind of thing, but humans get it instantly. Find the frame with the problem, and you basically know where the issue is. Then hand the screenshot to AI. Way better than logging or guessing.
<img src="https://cdn.tw93.fun/blog/pic/44JbuE11.png" width="800" />

**Somehow it's been 4 years on Twitter, posted a little reflection**
Joined X 4 years ago already. The journey has been really fun, and it's also been a great outlet for my urge to share tech and product stuff.

I was just chatting with a new friend about how I ended up here. Back then it was still called Twitter. MiaoYan had just been written, and I was looking for somewhere to sync update logs. Yes, that simple. So I signed up with Google login and posted MiaoYan's intro. Magically, it turned out MiaoYan was already being recommended by lots of folks with big followings as a simple and handy markdown-native notes app. Coming over felt like, oh, there are so many friends here. We finally meet. The Twitter environment back then was great. Not so many ads or money-grabbing. More sharing, conversation, pure tech discussion. Sad to say, many of those friends whose output quality was way higher than mine slowly stopped posting much.

Later I gradually started sharing some good open source products I'd come across each morning, or the latest releases of my own products, and bits of my own thinking. Slowly I met many like-minded friends, and they put a lot of energy into contributing to my open source projects. Friends from Taiwan, Japan, Turkey, Europe, the US, and especially many friends who helped with Pake. That was a kind of pure code-writing era from before AICoding existed.

When ChatGPT first came out, I immediately registered an account and started playing with 3.5. It really was a magic moment. Back then we shared funny prompts, very fun, but it now reads like ancient literature. I even wrote an article on 2022-12-04 titled "How Ordinary People Avoid Being Replaced by OpenAI." Haha, you can see how shallow I was. The first deep question I asked was even "give me some online docs to learn Rust." How AI has developed since then is beyond comparison.

That was about when I felt all in on AI. At the company, I handed off all my main business support tech to my direct reports, and went looking for a bigger ceiling for my team in AI. I even paid out of pocket with my international credit card to buy official OpenAI API for the team to use, so we could understand the latest stuff. I solved a lot of business problems that had been giving managers headaches with AI. Meanwhile, since I'm good at sketching solutions and product flows, I also pushed AI application R&D platforms, B-side digital employee solutions, and the deep integration of business efficiency tools with AI. Three years on, much of it is now well-productized and efficiency has improved dramatically.

Because the results in practice were so clear, in early 2023 I moved all my Chinese ADRs and company-allocated stock all in on AI direction. I sold them very cheaply, but bought what now look like treasures. Like Tesla I love at around 130, NVIDIA at around 90, SMH at around 160, etc. Around then I started intentionally learning to invest, analyzing companies and their underlying value, and read many books to sharpen my thinking. The books didn't help much operationally, since most were written decades before AI, but the mindset is useful. Investing in AI also can't follow the old playbook. It gave me an interest outside of programming, which is fun. Maybe one day I'll build an investing-related AI product.

Then, as you all know, came Mole, written last National Day during a Sanya pool vacation between swims and rests. Mole introduced me to many overseas developers. My overseas follower count grew sharply because developers from all over the world have been actively spreading the word almost daily. So grateful! Then came Kaku written during this year's Spring Festival, plus the recently efficiency-boosting Waza and Kami, and now that the new machine is here I'm planning a font called Luo. The journey has been wonderful, and I'm really looking forward to what's next. New friends are very welcome.
