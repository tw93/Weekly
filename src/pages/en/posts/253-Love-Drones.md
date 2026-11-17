---
date: 2026/01/12
---

<img src="https://gw.alipayobjects.com/zos/k/jzh0jx/253.jpg" width="800" />

<small>The cover image was taken after getting a DJI drone. It was super fun, but something happened on my second flight... you can look at the video at the end of the article, haha, don't miss it.</small>

> **Recording the trendy, grounded technologies I see every week. Curated and published here. If you find it useful, feel free to subscribe via RSS for updates.**

## Trendy Tools

**Mole's Highlight Moment: Connecting with Paul Graham**
<https://github.com/tw93/Mole>
Mole 1.20 is out! This update adds a lot of fun stuff. You can check the changelog for details, so I won't go into them here.

I want to share some good news first. Through Mole, I unexpectedly got in touch with my tech idol, Paul Graham. Ten years ago, during my sophomore year, I found "Hackers & Painters" in the university library. It had a huge impact on me. At that time, I was constantly thinking about what kind of role I wanted to play. This book was a wake-up call: engineers aren't just geeks; they can also be painters with a sense of aesthetics. This influenced many of my subsequent works, where I strive to keep things simple, easy to use, and beautiful, while truly solving problems. Being able to connect with him through Mole is really magical to me.

Of course, Mole's open-sourcing has been well-received by many programmers in the West, but it has also been accompanied by some doubts and baseless speculation. For example, because the author is Chinese, some people assumed the code was harmful, and there were even baseless accusations that the followers were bought. To be honest, it was a bit hurtful. However, the vast majority of programmers are very nice, enthusiastic, sincere, and spare no effort to help Mole become better, and are willing to share it with their friends. I always believe that the open-source world should be apolitical—free, friendly, and relaxed. Code itself is the fairest thing and has no stance. I also hope programmers from all over the world can communicate more. I also love traveling abroad, just limited by my spoken English, which I need to keep working on. I look forward to a true "global village".
<img src="https://cdn.tw93.fun/blog/upic/assBCv.jpeg" width="800" />

**MiaoYan released version 2.4.5, looking even better**
<https://github.com/tw93/MiaoYan>
This update adds split-column editing and preview modes, allowing you to view the final result while maintaining pure Markdown editing. It also adds layout cycling capabilities, enabling quick switching between the sidebar, list, and focus modes. Split-column dragging and window resizing are smoother and more stable.

Visually and interactively, the interface has been polished: icons have unified sizes and grayscale states, active colors are clearer, and light/dark mode performance is more consistent. Preview switching now has soft fade-in/out animations, fully preserving the selection and scroll position during the switch to minimize interruption to writing.

Performance and reliability have been continuously enhanced. Note content uses lazy loading, preview updates have a debounce mechanism, and input/rendering are smoother. Search capabilities are strengthened, with clearer prompts in abnormal scenarios like save failures. Fixed issues with item and note positioning in single mode and the editing area being invisible after startup. Also removed telemetry logic to maintain local-first and privacy-friendly principles.

In terms of file and layout management, **the sidebar now supports subfolders and expanded state maintenance**, making folder nesting more natural. Sidebar width and split-column initialization logic have been fixed to avoid layout issues left over from old versions. Added content protection when quickly switching split screens to prevent old content rollback.

In addition, the export experience has been fully upgraded, adding progress prompts and title injection. PDF / Image / PPT export quality and consistency are significantly improved, and export effects in dark mode are now consistent with the preview. Preview style details have been synchronized, including alignment rules, removal of image link underlines, and softer directory prompts. Installation documents and release processes have also been updated, adding build scripts and export configurations, making maintenance and release clearer.
<video poster="https://weekly.tw93.fun/assets/posters/dbd10c0695eb.v2.webp" width="800px" preload loop autoplay muted><source src="https://cdn.tw93.fun/blog/upic/IB5tYM.mp4" type="video/mp4"></video>

**If you also use the official ChatGPT client, try my configuration**
I found a simple and useful trick. When you find your ChatGPT is too wordy and the output isn't crisp enough, I highly recommend going to Settings -> Personalization, setting the style to "Professional", and setting the traits like Emojis to "Less". This way, your ChatGPT's responses will be much more comfortable, very suitable for engineers. You can also add my custom instructions, which I find makes it much better.

```markdown
Style: Concise, direct, opinionated, analytical, natural expression, paragraph output

Output Rules:

- Simple questions: 1-2 sentences, direct answer
- Routine questions: 3-5 sentences, conclusion first then reasoning
- Complex questions: 1 sentence summary + use formatting like Plan/Tradeoffs/Risks/Steps tags if necessary (prose style, no bullets)

Prohibit: Repeating the question, excessive pleasantries, meaningless "Okay" openings
```

<img src="https://cdn.tw93.fun/blog/upic/SwMyAv.png" width="800">

**An interesting website check tool: Web-Check**
<https://web-check.xyz>
Recently I found an interesting website check tool called Web-Check, which has a bit of a hacker style. It can break down almost all the underlying information of a website for you: IP & server location, SSL & DNS records, Cookies, domain info, crawl rules, redirect history, open ports, Traceroute, DNSSEC, site performance, and associated hosts, etc. It has high information density, suitable for checking casually for fun.
<img src="https://cdn.tw93.fun/blog/upic/4yQluW.png" width="800" />

**A free illustration site I use a lot**
<https://storyset.com>
The illustrations I've used in my shares over the past few years are almost never AI-generated; they all come from Storyset. It's free to use, supports custom color schemes, and can export clean SVGs, which render great when dropped directly into Keynote.
<img src="https://cdn.tw93.fun/blog/upic/zNv49C.png" width="800">

**Tricks for logging into Antigravity account in China**
A friend found a way to log into the Antigravity account. Even if your address is US and age is appropriate, you might still fail to log in. I tried many methods but failed. Finally thought of using antigravity-tools for forwarding. Surprisingly it has a one-click open function. After logging in, click the one below—"One-Click Ventilation"—and it actually works directly. Very magical, sharing for friends in need.

```bash
brew install --cask --no-quarantine antigravity-tools
```

<img src="https://cdn.tw93.fun/blog/upic/ookvbh.png" width="800">

## Just looking around

**Show you my drone recording**
A rookie's second drone video. The background music is "Swift" by Nanqing Band, which I've been listening to a lot recently. It was all pretty beautiful until the end—you must watch until the end, the crash came very suddenly.
<video poster="https://weekly.tw93.fun/assets/posters/fd03af609d5a.v2.webp" width="800px" preload controls><source src="https://cdn.tw93.fun/blog/upic/mgdMjR.mp4" type="video/mp4"></video>

**Zhang Gong Guan's salt and pepper duck head is the best I've ever had, highly recommended!**
<img src="https://cdn.tw93.fun/blog/upic/4HzHk3.png" width="800" />

**If Apple releases this this year, I will definitely swap my iPhone Air for it!**
Generated using Gemini's Banana, with my desk in the shot.

<table style="margin-top:-18px; margin-left:-4px">
    <tr>
        <td width="50%">
          <img src="https://cdn.tw93.fun/blog/upic/Po7v42.png" width="400" />
        </td>
        <td width="50%">
            <img src="https://cdn.tw93.fun/blog/upic/AmekP9.png" width="400" />
        </td>
   </tr>
</table>

**Brothers, go look at the reviews for this on Douban, you will find how absurd this world is**
<https://movie.douban.com/subject/30205129/>
<img src="https://cdn.tw93.fun/blog/upic/kg2GBn.png" width="400" class="border"/>
