---
date: 2025/11/17
---

<img src="https://cdn.tw93.fun/blog/2000/ffpbdy-245.webp" width="800" />

<small>The cover image was taken at Oōli in autumn. I really love the yellow and red leaves this season. This taxi is actually an exhibition at the BY Art Museum, called "Nature is a Taxi." It feels very evocative when photographed this way.</small>

> **Record the down-to-earth trending technologies seen every week, and publish them here after screening. If you find it good, you can subscribe to this weekly via RSS to get update notifications.**

## Trending Tools

**MiaoYan finally supports Split View after almost 2 years**
<https://github.com/tw93/MiaoYan/issues/391>
Thank you all for your love of #MiaoYan. After nearly 2 years of waiting, the Split View experience is finally supported! This means you can have editing on one half and preview on the other. I plan to use it myself for a while, and if there are no problems, I'll release the official update. The test version can be downloaded and used here.

Also, to explain why MiaoYan doesn't do instant preview like Typora: implementing this with native Swift is extremely difficult and complex. Moreover, I personally prefer a pure editing experience and pursue the certainty of the Markdown file itself; I always feel that the instant editing mode is not stable enough. It's unlikely this feature will be added in the future.

<img src="https://gw.alipayobjects.com/zos/k/fr/Mc0S2V.png" width="800" />

**Mole (Little Mole), which can clean dozens of GBs at once, has updated again**
<https://github.com/tw93/Mole>
Welcome to upgrade and use. This time there are two major features and several security upgrades and optimizations.

- Added `mo optimize` for one-click Mac system optimization, covering cache refreshing, network reset, log cleaning, Spotlight reconstruction, startup cache, diagnostic cleaning, and system maintenance.
- Refactored `mo analyze` disk space analysis tool with Go. It can somewhat replace DaisyDisk (which costs $68). Its main purpose is to help you drill down and find large, useless, or expired files that can be deleted—suitable for things you want to clean beyond `mo clean`.
- Safety and stability upgrades for cleaning and uninstallation, optimized large directory processing, strengthened path security verification to prevent accidental deletion of system files, and expanded the protection range of critical system directories. Upgraded the whitelist verification mechanism to strictly reject abnormal paths, paths with spaces, and // injection risks.

Also, there's an interesting feature: I've added the `.DS_Store` files that the Mac system "drops" into your folders to `mo clean` for cleaning—perfect for those with OCD.

Mole is now finally in its intermediate stage. If your Mac is very important, please wait until the final tenth version to use it. If your Mac is for personal use, you can try this version, but it's still recommended to run `dry-run` first to see what can be cleaned.
<img src="https://gw.alipayobjects.com/zos/k/us/mole.gif" width="800" />

**Go to next change - a great extension**
<https://marketplace.visualstudio.com/items?itemName=alfredbirk.go-to-next-change>
I still feel that JetBrains' code diff for commits is the best among all editors. Since my main editor switched to VSCode these past two years, I've really missed this feature. I always felt the diff process wasn't smooth. After configuring some things, I found it couldn't automatically go to the next file. After searching for a long time, I found the "Go to next change" extension. It's great and much more comfortable; I finally don't have to click the mouse to go to the next file during a diff.
<img src="https://gw.alipayobjects.com/zos/k/c19g6h/1.gif" width="800" />

**TelemetryDeck: Multi-platform statistics for Mac / iPhone / Android**
<https://telemetrydeck.com>
Tracking data on the Web is very simple, but finding a way that works across Mac, iPhone, and Android while being safe for privacy is tough. I found a good one called TelemetryDeck. It's very easy to integrate, taking only a few minutes, after which you can see the data immediately. The data richness is also quite good. Friends who have such needs can give it a try.
<img src="https://gw.alipayobjects.com/zos/k/m8/WHOrnW.png" width="800">

**Image preview - a very useful small plugin for VSCode**
<https://marketplace.visualstudio.com/items?itemName=kisstkondoros.vscode-gutter-preview>
It helps you show the images present in the current line in the gutter (line number column). Hover is also supported, allowing you to see the corresponding effect at a glance. It's much more convenient than opening to view, especially in front-end development scenarios.
<img src="https://gw.alipayobjects.com/zos/k/p1/NXK7Pb.png" width="800" />

**Highly recommend the XAI grok-code-fast-1 model**
<https://docs.x.ai/docs/models/grok-code-fast-1>
If your Claude Code quota is used up, and Codex's too, and you need a cost-effective backup, I highly recommend the XAI `grok-code-fast-1` model. It has high cost-performance and is good enough for most tasks.
<img src="https://gw.alipayobjects.com/zos/k/oi/SZDF9B.png" width="800" />

**Highly recommend Resend for email**
<https://resend.com>
If you need to add email registration functionality to your system, I highly recommend Resend. It has a free quota of 3,000 emails per month. It's simple to use. I also recommend pairing registration with Google Login, both using the Better Auth service for call encapsulation—very elegant.
<img src="https://cdn.tw93.fun/blog/upic/nuOjXI.png" width="800" />

## Just Looking Around

Friends, go to Taobao and JD to search for "Price Protection." There should be many price changes recently due to Double 11. I tried it and got back 141 RMB; not bad!
<img src="https://cdn.tw93.fun/blog/upic/uQSZdX.png" width="300" class="border"/>

**Fang Sanwen talks with Duan Yongping: It’s important to do what you can love**
<https://www.youtube.com/watch?v=1ikLMn2naSA>
This latest interview with Duan Yongping is excellent. I recommend everyone to watch it. Doing what you can love is very important. It's rare for "A Duan" to talk so much; very beneficial.
<img src="https://gw.alipayobjects.com/zos/k/u7/qmqbaz.png" width="800"/>

## Random Thoughts

In an AICon warm-up live broadcast roundtable, I recorded some shorthand answers regarding questions about 10x individuals under AI, to share with you all.

1. **Do "10x individuals" exist in a team? Where does their strength lie?**
   - High efficiency used to mean students who did work quickly and well; it was hard to have a so-called "10 times."
   - 10x is actually not about 10 times the amount of code or requirement completion, but refers to 10 times the business results and contribution produced.
   - Now 10x refers more to not being limited to the original position, but more about problem-solving, being able to quickly grasp business pain points and how to solve them. Technology becomes more of a tool for realization, and with the emergence of AI, the execution of the means itself has many automated tools to help complete it.
   - Versatile students who are all-rounders in requirements, design, development, and operational iteration.

2. **Under the AI wave, what changes have occurred in the evaluation standards for excellent engineers/products?**
   - Before, writing quickly and well, completing rapidly with high quality; for products, being very familiar with business, writing clear PRDs, whether one thinks clearly about product development with trade-offs, and whether the output has actual business impact, having one's own opinions.
   - With AI, you'll find that when used well, AI writes better than most engineers. It has slowly turned into how the problem is decomposed, how the architecture is implemented, how the business workflow is designed, how to let AI better achieve the goal, how to define AI's output effect, and knowing how to optimize it to make it better. In terms of ability, one becomes a versatile product engineer.
   - The technical threshold is lowered, but the requirements for human quality have become higher.

3. **If a practitioner with 3-5 years of experience wants to move closer to being a "10x individual," what types of abilities should they supplement?**
   - The ability to "tinker," the ability to accept new things, being willing to play with various new technologies and thinking about their relationship to the problems they need to solve.
   - Learn to integrate AI into their own business workflow, rather than simply treating AI as a replacement for Google.
   - Basic technical skills, computer science, design and interaction aesthetic skills, full-stack technical skills, and operational promotion skills.
   - Learn to communicate; whether with people or with AI, there are great techniques to let the other party grasp your meaning well.

4. **How to amplify individual AI capabilities into team capabilities? What is the first step?**
   - It's actually quite difficult because it depends heavily on the individual. Just like when ChatGPT first came out, students willing to tinker started doing so very early.
   - The first step is recommended to be clear standard for "good"—what counts as good use and how to use it. Clarify team requirements, and more importantly, train people through project tasks. First have the scenario, then have the standard SOP, and finally establish the team's information bus to form a very smooth context environment, making it easy for everyone to access without obstacles.

5. **If you were to define a "10x organization" in your own words, what would you say?**
   - Extremely high efficiency in passing things on, very fast understanding, quick grasping, and no distortion in message transmission.
   - Very clear upper-level decision-making, ensuring smooth execution at the front line, with decisions based on a unified context environment.
   - Front-line personnel are very good at using various tools to solve problems, without setting limits on their positions.

6. **In AI implementation, where is the most difficult hurdle to cross?**
   - Business rules and definitions of business results being successfully matched by AI results, with everyone reaching an agreement on standards.
   - In the process of scaling, reaching the stage where performance is improved to be better than humans, or equal to them, requires a lot of iteration, which needs very clear people to decompose and execute.
