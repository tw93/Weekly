---
date: 2026/04/06
---

<img src="https://gw.alipayobjects.com/zos/k/e5/263.jpg" width="800" />

<small>The cover photo is from a hardware toy I spent three days playing with at home during the holiday. I was soldering, applying glue, and debugging through a pile of components. I was almost at the final step when I burned the screen during testing. Now I am waiting for the replacement to arrive so I can keep going. Lots of fun.</small>

> **Recording down-to-earth trending tech I see every week, filtered and published here. Follow this weekly newsletter to get update notifications**

## New Article

**What You Don't Know About LLM Training: Principles, Paths, and New Practices**
<https://tw93.fun/2026-04-03/llm.html>
This is the longest article I have ever written. The good news is I finally got a handle on the basics of large model training. The gap between what I assumed I knew before and what I actually found was massive. I highly recommend this to anyone working in AI applications or anyone curious about AI. It should give you a clear picture without leaving you lost.
<img src="https://gw.alipayobjects.com/zos/k/4q/Group.png" width="800" />

## Product Releases

**Waza, My Engineer-Alter-Ego Skill Set**
<https://github.com/tw93/waza>
I packaged my personal skills into something new called Waza. In Japanese, 技（わざ）means technique or skill, often used in martial arts. This is the first time I have released an open-source project with zero code, just markdown files. In the pre-AI era, for a programmer, that would have been embarrassing.

When Superpowers came out, I installed it once and deleted it right away. Too heavy, not my thing. A lot of people kept telling me "You don't know Superpowers? If you're not using it you're not with the times, it's amazing." Then I found gstack, which was better, but still felt like too much. I still wasn't used to it. I wanted something simple and useful where I could clearly see what it was doing.

So I built Waza the way I like it. For me, this set is enough. No need to mess with other skills. Not too many, not too few, just right. New iterations can be added over time.

The 8 skills correspond to 8 abilities I think a good engineer in the AI era should have:

1. **Think clearly.** AI writes code fast, but if the direction is wrong, the faster you go the further off course you get. A good engineer questions the problem itself before touching any code, stress-tests the plan, and has a clear mental architecture before asking AI to execute. /think locks this habit in.

2. **Design well.** Building a product is not just about making features work. AI-generated things tend to look the same. Good engineers have an aesthetic standard for what they deliver and a clear design direction. /design handles this.

3. **Debug systematically.** AI fixing bugs most easily falls into a "try this, try that" loop. A good engineer diagnoses problems systematically, confirms the root cause before touching the code, and gets it right in one shot. I turned this habit into /hunt.

4. **Review before merging.** AI-generated code needs human oversight even more. Check the diff before merging, auto-fix what can be auto-fixed, group the judgment calls together, and verify with evidence rather than gut feeling. That is /check.

5. **Read primary sources.** Good engineers read original material, not second-hand summaries. Converting URLs or PDFs into clean Markdown and pulling it directly into the workflow is what /read does.

6. **Write clearly.** No matter how technically strong you are, if you can't explain it clearly, others won't receive it. A good engineer can convey what they have learned and what they want to express to the right audience. /write helps you nail this step.

7. **Learn actively.** Tech moves faster in the AI era. Entering an unfamiliar domain is not just skimming a few articles. It is collecting, digesting, outlining, drafting, refining, and publishing. Output drives learning. That entire flow is /learn.

8. **Maintain the toolchain.** A good engineer does not only care about business code. The toolchain itself needs regular checkups. When something feels off with CLAUDE.md, rules, hooks, or MCP configs, run /health and find out what is wrong.
<img src="https://gw.alipayobjects.com/zos/k/yx/JMouVn.png" width="800" />

## Product Updates

**Kaku 0.9 is out and it is really good**
<https://github.com/tw93/kaku>
A few fun features shipped in this version that should be genuinely helpful.

1. **Natural language command generation**: Type `# <description>` and press Enter, and the auto-generated command is injected back into the prompt.
2. **Option+Click to move the cursor**: Click anywhere on the current line to move the cursor there.
3. **Window pinning**: Pin the window to the front via the Window menu, and toggle it on or off anytime.

<video poster="https://weekly.tw93.fun/assets/posters/7fa9af0b0533.webp" width="800px" preload loop autoplay controls muted><source src="https://gw.alipayobjects.com/os/k/ke/kaku.mp4" type="video/mp4"></video>

## Trending Tools

**Claude HUD helps you track your Claude usage**
<https://github.com/jarrodwatts/claude-hud>
It is a little feature-heavy, but after some simple configuration it works well. Worth trying if you are curious. The code feels a bit complex, and when I have time I will probably simplify it myself. Minimalism is the goal.
<img src="https://gw.alipayobjects.com/zos/k/bc/l4yelI.png" width="800" />

**A super minimal, AI-friendly Markdown doc generator**
<https://docmd.io>
Stumbled on docmd. It is a zero-config documentation generator built for developers. It converts Markdown into fast, clean static docs with automatic routing, built-in search, and context that AI can easily use.
<img src="https://gw.alipayobjects.com/zos/k/rx/u4S6HX.png" width="800">

**Picked up a 140W charger and it is great**
Got a 140W charger. Good size, finally free from my old 45W. Four ports, which makes it way more convenient on the go. The display showing real-time power output is a nice touch.

<table style="margin-top:-20px">
    <tr>
        <td width="33%">
           <img src="https://gw.alipayobjects.com/zos/k/2s/4R4qMs.png" width="300" />
        </td>
        <td width="33%">
           <img src="https://gw.alipayobjects.com/zos/k/k5/XWLwvO.png" width="300" />
        </td>
        <td width="33%">
           <img src="https://gw.alipayobjects.com/zos/k/vr/2oXfRE.png" width="300" />
        </td>
    </tr>
</table>

## Random Thoughts

**Let me share how I dive deep into a new technical domain in the AI era.**

Before AI, I mostly read books and went through every blog post from notable people in the field, both domestic and international, writing notes by hand. It was slow but genuinely fun. Learning WebGL back then felt like that. Getting a solid understanding of something might take half a year of free time. Slow, but happy.

Now that AI is here, I still can't stand those "summarize a hundred-year-old novel in 3 minutes" things online. I also dislike short-episode dramas and watching shows at 2x speed. I mostly still choose good things and take time with them.

But recently while writing the "You Don't Know Claude Code" and Agent series, outside of the parts I already understood, there were huge areas I wasn't clear on. Luckily I had saved a lot of articles, and this was the perfect chance to clear the backlog, fully digest everything, and write it all out. I have always believed that what matters is not how much you read, how much you hear, or how much you take in. Most of that doesn't really stick. What matters is how much you output. That is what becomes truly yours.

A couple of weeks ago I started a deep challenge: studying the training pipeline of large language models and making sure even non-specialists could understand it. I explored for two weeks, and the experience is now ready to share. The article is basically done and should be coming out soon.

I organize this learning process like writing code. Step one: collect high-quality material. Recent top papers in the field, blog posts from major model providers about their key releases, threads from model leads on X, recent courses from Stanford and similar schools, and classic "build an LLM from scratch" repos. These are my sources. I use tools to automate downloading everything, converting to Markdown, cleaning, and organizing it all into a structured repo for this research.

For content I understand, I read it all through, delete the bad parts, and keep the good ones. For content I don't understand, I use Claude to help me get it. The more complex parts I translate into Chinese and read that way. For code that can run locally, I run it. For code that can't, I read the structure. Either way, I end up with a rough understanding of the technical principles. This phase usually cuts the original material by half.

At this point you have a general picture of the field, so you can start writing an outline and figuring out which source material belongs with each section. All of it works well in Markdown. What do you want to say, or more accurately, what do you want your reader to know? Always remember: an article is written for its readers. You need to know your audience's level. It is a lot like giving a presentation.

Then comes the grind, which is also a review of everything you have covered. It feels a lot like cramming before an exam in college. You fill in each section completely, and what you end up with is a very long and somewhat rambling article.

This is where AI really helps. You can ask it to remove the redundant parts and smooth out the disconnected bits, without changing your original meaning or your voice. You can also ask it to flag gaps and help fill them in. That process teaches you even more things you had missed.

Once that is done, read through it yourself one more time, not AI. AI is just a tool here. Do not let it replace your brain, that defeats the whole point. Reading through yourself, you can keep adjusting and polishing. It feels a lot like testing your own code: fix issues, fix more issues. After reading it twice and feeling good about it, you can publish it for everyone to see.

Some folks worry that nobody will read what they write, so they hold back or just don't write at all. Honestly, if your content has real value, readers will come. Worry about quality, not the audience.

That took 10 minutes to write. Done. Happy to hear how you learn new fields. The video below is a recording of the learning repo for the LLM training article I mentioned, the one coming out soon. It shows my "industrial-scale" way of learning. Kind of fun to look at.

<video poster="https://weekly.tw93.fun/assets/posters/ed7e558e54ae.webp" width="800px" preload controls muted><source src="https://cdn.tw93.fun/blog/pic/llm45.mp4" type="video/mp4"></video>
