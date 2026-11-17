
---
date: 2026/05/25
---

<img src="https://cdn.tw93.fun/blog/pic/26829.jpg" width="800" />

<small>The cover photo is of a textured building I shot last weekend at Xiaohe Park. The sunlight happened to be perfect, paired with the green trees, it looked really nice.</small>

> **Recording down-to-earth trending tech I see every week, filtered and published here. Follow this weekly newsletter to get update notifications**

## Product Releases

**The Mole desktop client is here**
<https://mole.fit/>
Finally, finally, Mole's Mac desktop version is out. The CLI will keep being free and open source forever. The desktop client is for folks who enjoy a more interactive product feel. We recently shipped 1.5, which adds various sprite animations in the menu bar, login-item management, software update management, and the most fun part, fan control, plus more. Head over to the official site for the full rundown.

If you've contributed code to Mole or sponsored me on GitHub, DM me and I'll send a 100% discount code.

<video poster="https://weekly.tw93.fun/assets/posters/f791c03db2da.v2.webp" width="800px" preload="metadata" controls><source src="https://cdn.tw93.fun/blog/pic/mole206.mp4" type="video/mp4"></video>

**Mole CLI updated to 1.39**
<https://github.com/tw93/Mole>
1. mo clean major hardening: GUI app dotdirs and Gradle DSL caches are no longer wiped by mistake; dry-run now matches actual cleanup so no more false reports; simctl probing retries to fix the first-error-after-restart issue; Trash cleanup no longer triggers blocking macOS warning dialogs; TMPDIR cleanup is roughly an order of magnitude faster; added cache coverage for UTM/Lima/Arc/QQ Browser/Codex CLI/Antigravity/Gemini; VS Code family now cleans leftover extensions by the .obsolete marker.
2. mo uninstall: bundle ID matching upgraded to boundary checks so it won't hit by mistake; leftover login items are now called out with their cleanup paths in the summary. mo purge: hardened with timeout protection and trap handling, any exit path restores the cursor and clears temp files.
3. mo analyze: hardlinks are now deduped by inode, so FCP and other managed media no longer report tens of times inflated. mo status: available-memory math now aligns with Activity Monitor.
4. mo touchid: PAM writes switched to atomic operations to preserve read-only permissions. mo optimize: removed Bluetooth reset to avoid accidentally kicking devices.
5. Global NO_COLOR=1 support. When Trash isn't available, it now fails closed to prevent silent permanent deletion.
<img src="https://cdn.tw93.fun/blog/pic/XjXNoU39.png" width="800" />

**Kami now builds product landing pages**
<https://github.com/tw93/Kami>
Kami has shipped a bunch of updates lately. Beyond the original PDF generation, you can now tell it you want a landing page for product XX, and it'll build something in the same quiet style as the Mole site.
<img src="https://cdn.tw93.fun/blog/pic/XdDecf51.png" width="800" />

**Waza has had a bunch of updates lately**
<https://github.com/tw93/Waza>
Waza (技, わざ), the engineer's skill collection, has had a bunch of updates recently. Posting a tweet to keep everyone in the loop. If you're using it, remember to update. I've folded in nearly a month of dev best practices, especially a lot of lessons from the recent Mole client work.

First, Waza finally supports codex end-to-end. One command and you're done, every capability is supported, because codex has felt really good to use lately.

The biggest one: the original health skill was just for checking whether Claude config and usage matched best practices, but now it's evolved into a full Agent Health check. There's a fun phenomenon with people writing code with AI now, it feels amazing at first, but after a while it becomes unmaintainable and hard to extend. In that case try /health, it'll check your code, including whether the various capabilities still look ok, whether it's maintainable, whether things should be split apart, whether dead files should be deleted. Think of it as a scavenger for the bad code AI generates.

Then /think (Thinking Mode) also has many updates. You can discuss with it whether a feature should be built, and it'll give you a Kill / Keep / Pivot judgment across multiple dimensions. Honestly, a lot of the time a product is defined by what you choose not to add, not by what else you could add.

I've always felt that adding rules to AI calls for restraint. Every rule you add becomes a ceiling for it. When the model gets stronger, your rules start dragging it down. That's why I don't like Superpowers or so-called Spec programming, too verbose, too many rules. That's also why I wrote Waza, it's like installing my code-writing avatar onto your computer.

## Trending Tools

**Lightpanda: a headless browser written from scratch in Zig**
<https://github.com/lightpanda-io/browser>
A headless browser written from scratch in Zig, designed for agents and automation. The pitch is -9x memory and +11x speed vs Chrome, compatible with the CDP protocol (Playwright/Puppeteer). Worth a look as browser infrastructure for the agent era.
<img src="https://cdn.tw93.fun/blog/pic/aQKcGc14.png" width="800" />

**Mise: Dev tools, env vars, and tasks in one CLI**
<https://github.com/jdx/mise>
A single tool that unifies runtime versions (nvm/asdf) + env vars (direnv) + tasks (make), all managed by a single mise.toml. Lightweight Rust binary. Worth a try if you're interested.
<img src="https://cdn.tw93.fun/blog/pic/demo34.gif" width="800" />

## Just Looking Around

**Recommending this lemon-flavored sparkling water**
You have to chill it first, then it's really good. Don't drink the plain one, this lemon one is the best!

<table style="margin-top:-20px">
    <tr>
        <td width="50%">
          <img src="https://cdn.tw93.fun/blog/pic/XcWaIV34.png" width="400" />
        </td>
        <td width="50%">
            <img src="https://cdn.tw93.fun/blog/pic/PVaCgF40.png" width="400" />
        </td>
    </tr>
</table>

**This eye drop I've been using is pretty good**
If you often lose yourself in AICoding, grab a bottle of Hai-Lu eye drops, and have your watch remind you to stand up and walk around.
<img src="https://cdn.tw93.fun/blog/pic/ybMdQk09.png" width="400" />

**Bought a few nice wooden things**
First is a shoehorn, no more bending over to put on shoes. Second is a laptop riser, very useful, with anti-slip. Third is a small holder for aroma bottles. Fourth is the little brush I use to sweep up coffee grounds when I make coffee.

<table style="margin-top:-20px">
    <tr>
        <td width="25%">
          <img src="https://cdn.tw93.fun/blog/pic/gv97iD44.png" width="400" />
        </td>
        <td width="25%">
            <img src="https://cdn.tw93.fun/blog/pic/UXoeo050.png" width="400" />
        </td>
        <td width="25%">
            <img src="https://cdn.tw93.fun/blog/pic/NUPl0m57.png" width="400" />
        </td>
    <td width="25%">
            <img src="https://cdn.tw93.fun/blog/pic/j7ICAj15.png" width="400" />
        </td>
    </tr>
</table>

**Some thoughts on the Mole desktop release**
On the back of the recent Mole Mac release, I want to share the magic moments I've had over the past couple days. Thanks to this little toy project I started by the Sanya pool last year, I've met many interesting overseas developers from all kinds of countries.

The Mac client took two weekends to build. Plenty of overseas users had brought it up before, saying their parents and siblings don't use a CLI but really want this feature, asking if I could put out a simple, easy-to-use desktop version. Back then there was the time issue, plus I didn't think the Mole CLI was mature enough yet, so it kept getting pushed back until now.

It's only been half a year since Mole launched, and somehow it's over 50K stars, 500 user-submitted cleanup-suggestion issues, 300 high-quality feature PRs, and contributions from 100 developers around the world, delivering cleanup capabilities arguably stronger than tools like CleanMyMac. I even racked up 60T of traffic in one week from just 2 images I hosted on Vercel for the README, which left me owing Vercel $80, that's when I realized how many people are actually using it, so the desktop version was worth doing.

A lot of the small clever touches in the Mole desktop client only came to me once I started building. Like using planets to represent each feature, which traces back to my childhood love of watching planets move, plus 10 years ago when I picked up frontend, the very first thing I wanted to learn was WebGL. I started using WebGL to render the planets, and each planet's character lined up nicely with what Mole does, so I worked that theme in:

Clean uses Earth, "Rain washes the old soil, dust drifts with the tide"
Uninstall uses Mars, "Red dust covers the old, travel light to journey on"
Optimize uses Mercury, "Swift along the near orbit, small fixes ring out"
Analyze uses Jupiter, "From afar it becomes a map, the smallest details visible"
Status uses the Sun, "Light that doesn't strike the eye, a heartbeat that stays bright"

Like the little mole's digging and exploration moving from a small patch to the wide world, but still quiet, not getting in your way.

Another design touch: I swapped each planet's texture map more than 10 times, downloading and picking through many from NASA's site to find the best fit. The rotation direction and axis, the speed, the post-completion flight characteristics of each planet, all reference how the actual planets move. That part was one of the more enjoyable bits of AI Coding. These details might feel only loosely connected to Mole-the-mole, and I could have just built a simple click-to-clean menu bar app, but I didn't want to. There's already too much cyber junk being generated by AI. I needed to make something that feels a bit more pleasant, so that my tokens aren't wasted, and so I'm not polluting your timeline.

I released it around 10pm that night. So grateful for the many friends who shared it on their own, and especially thankful to all the users who bought it, some folks even bought it purely because of the value the CLI had given them. Lots of European and American users, with French, German, all kinds of currencies coming in, really magical. There's still a lot to round out on the Mac desktop, and I appreciate everyone's patience, prepaying $9 for a pretty little toy. I'll keep working on the features.

I really like things that come together naturally, I don't like chasing short-term results. This kind of long-term iteration, continuously meeting new friends, getting so much input and discussion, is the most precious treasure. Really fun.
