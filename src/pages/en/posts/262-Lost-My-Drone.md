---
date: 2026/03/30
---

<img src="https://gw.alipayobjects.com/zos/k/c6/262.jpg" width="800" />

<small>The cover photo is here in memory of my drone, which I finally lost. This was the last shot it ever took. Thankfully I have DJI Care Refresh, so I should be able to get a replacement for free.</small>

> **Recording down-to-earth trending tech I see every week, filtered and published here. Follow this weekly newsletter to get update notifications**

## Product Updates

**Kaku released version 0.8**
<https://github.com/tw93/Kaku>
This release is called Fish 🐟. Most of the work in this round went into shell compatibility, tab behavior, and overall stability.
It now has full fish shell bootstrap support, including Starship, Yazi, theme sync, and config handling. Tab management was also improved, with remembered last directories, isolated tabs for `update` and `doctor`, and a new option to show directory names only in tab titles.
On top of that, it fixes a batch of issues around fast output and Claude Code viewport jumping, plus window hiding, link clicking, paste behavior, emoji width, SSH aliases, Cmd+Q crashes, and transparent rounded-corner rendering. Worth updating.
<img src="https://gw.alipayobjects.com/zos/k/t6/9UTHLG.png" width="800" />

**Mole released version 1.32**
<https://github.com/tw93/mole>
This version is called Rorqual 🐋, and there are quite a few updates again.
`mo clean` now fixes the long-skipped wallpaper proxy and Messages preview caches, and adds cache and log cleanup for PCSX2 and RPCS3. It also improves Python bytecode cache output, the Brave cleanup guard, Spotify playback detection, and the error handling around Service Worker cache cleanup.
Besides that, `mo uninstall` now filters out invisible background helper apps, the main menu shows more accurate Touch ID detection and a version shortcut, and the install flow now grabs sudo permission up front so you do not have to keep entering your password over and over.

**Pake released version 3.11**
<http://github.com/tw93/Pake>
This release is called Evolve 👻. It had been a while since the last update, and this one is mostly focused on bug fixes plus a few new features.
On macOS, `--install` now supports one-command installation into `/Applications`. The new `--new-window` flag keeps popup and OAuth windows inside the app instead of constantly bouncing out to the system browser. It also adds `--camera`, `--microphone`, and `--identifier` for on-demand media permissions and custom Bundle IDs, which helps reduce conflicts between apps.
There are also plenty of cross-platform fixes in this release, including Gemini download failures, parts of the ChatGPT UI disappearing after zooming, Windows icon copy errors, and crashes when clicking external links in macOS new-window mode. Overall it feels more stable.

## Trending Tools

**The 4 Claude MCPs I use the most**
<https://tinyfish.ai>
The first one is TinyFish MCP. I like it a lot because it lets Claude browse the web directly, fetch pages, do research, and return structured results instead of just a static answer. Lately I have been using it to collect AI news for this weekly, like pulling the most popular Hacker News items from the past few hours and turning them into a clean summary list. It saves a lot of time.
The second is GitHub MCP. It makes everyday things like reading commits, tracing changes, and understanding a repository much smoother, without constantly switching between tools.
The third is Figma MCP. You can inspect design files, check layout and spacing, and pull UI details directly into the conversation, which is very handy when you are aligning implementation with design.
The fourth is Excalidraw MCP. This one is better for thinking through things, especially flows and system structure. When words are not enough, drawing it out is much faster.
The last three are probably already familiar to many people. I also recorded a short video showing how TinyFish works in a real workflow.
<video poster="https://weekly.tw93.fun/assets/posters/a7b4430c8d45.webp" width="800px" preload loop autoplay controls muted><source src="https://cdn.tw93.fun/blog/pic/TinyFish28.mp4" type="video/mp4"></video>

**I have really been enjoying the gstack skill lately**
<https://github.com/garrytan/gstack>
I highly recommend trying it. It feels like having a solid team of specialists around you, covering roles like CEO, tech lead, design, QA, and security, all helping you reason through the code development process.
<img src="https://gw.alipayobjects.com/zos/k/5q/Hh8cHR.png" width="800" />

## Random Looks

**Chinese Painting from the Yuan to the Qing is an excellent book**
<https://book.douban.com/subject/37156716/>
This book is really good. It is dense in the best way, and Wu Hung's scholarship is seriously impressive. If you want an art history book to get started with, this is a good one.
<img src="https://gw.alipayobjects.com/zos/k/s9/suseYb.png" width="500" />

**A drone clip from the Yangjiapai hike**
This is exactly where I lost my drone, for your amusement. "Dear DJI customer, we are very sorry to hear that your aircraft has gone missing. Please rest assured that DJI will do its best to assist you. Your flyaway report has been successfully accepted. You may first refer to the Find My Drone guide and try to locate the aircraft."
<video poster="https://weekly.tw93.fun/assets/posters/fe5d497eafb2.webp" width="800px" preload loop autoplay controls muted><source src="https://cdn.tw93.fun/blog/pic/177467994477812.mp4" type="video/mp4"></video>

## Random Thoughts

**Kill the Manual Programmer**

![](https://gw.alipayobjects.com/zos/k/zc/sha.png)

The title is adapted from a song I loved 12 years ago, "Kill That Shijiazhuang Man" by Omnipotent Youth Society. The scene they wrote about feels a little similar to what we are looking at now.

I have not taken a bus in years. Last time I went to Prince Bay, the scenic area had traffic restrictions, so I had to park outside and take the free shuttle in.

In the seat ahead of me, a little girl kept swiping through those AI-generated short videos. The visuals were rough, the content felt fake, and when she moved to the next one, it was somehow more of the same. She was completely absorbed. The strangest part was that every video had a huge number of likes. Watching that made me a little sad. I kept thinking, when my own kid grows up, will they also be surrounded by this kind of low-grade AI-made content from the start, to the point that it becomes hard to even find something genuinely beautiful?

Once AI showed up, producing things suddenly became much easier. Making content got easier, and making software got easier too. In the past, if you wanted to build something, you had to spend real time on it, go back and forth, solve actual problems, and only then dare to ship it. Now a lot of those steps have been flattened. Writing something is easy, building a product is easy, you buy some tokens, ask AI, stitch together a workflow, throw on an interface, and pretty quickly you have something that runs.

Today I also saw someone say they could recreate a Claude Code in two days. I both believe that and do not. In voice AI alone, dozens of products have appeared all at once, and a lot of them are actually pretty decent. Even Doubao is competing in that space now. I have also seen quite a few Claude Code wrapper clients lately, and honestly some of them are very usable.

For programmers, a lot of things that used to require professional skill, a learning curve, and years of accumulation are quickly turning into abundant supply. In the future, the least scarce thing may be products that look like products. They work, they run, they look fine. You can only try to do them a bit faster, a bit better, or wrap one more layer around them and maybe there is still some value there. But that value will get matched by AI more and more easily.

Not long ago I was having dinner with a colleague and we got onto an interesting topic. I told him that over the past year I have really enjoyed listening to cassette tapes, and that every song somehow feels more durable and more beautiful. Why did cassettes, CDs, TV shows, and even many old books often feel higher quality overall? The reason is actually simple: production and distribution used to be heavy. If you wanted to release an album, you first had to make the work good enough, and only then would it make sense to produce tens of thousands of tapes. Otherwise they would not sell, and the company probably would not back your next release. Publishing a book was similar. You could not just finish it casually and push it in front of a huge audience right away. Back then, the act of making something was already a filter.

Now you can upload a song to a platform and that is it. You can post an article to a public account and that is it. Software is becoming similar after AI, and in some cases AI will even upload the code to GitHub for you, a place many people used to find intimidating, and even generate the CI that publishes the release for you. A lot of thresholds that once required long-term accumulation to cross have been filled in by tools, and so the world slowly gets flooded with things that are all kind of the same and kind of usable.

The trouble is not just that quality drops. Over time, people's sense of quality drops with it. The more rough things there are, and the wider they spread, plus the pressure to make money, the more our judgment gets pulled off course. Eventually what people get used to is fast stimulation, fast feedback, and fast satisfaction.

When I think back to that little girl watching videos, that is the part that feels uncomfortable. She was not just watching a few rough clips. She may be growing up inside a world filled with lower-cost, higher-frequency, emptier things.

Code is clearly entering the same phase now. In the future, ordinary beginners will be able to use AI to build products that satisfy their own needs. Product managers will be able to make things that used to require engineers working alongside them. So what exactly is left for real engineers to do? That is something we need to think about seriously.

I have also heard that a lot of bosses at big internet companies are now staying up day and night vibe coding. In a single afternoon they can build a demo they personally consider usable, and some of them are deeply hooked on it. This could have a major effect on people doing frontline work. Once the boss gets a few flows working in code, the natural conclusion becomes: writing software is not that big a deal after all. Things that used to take six months, can they now be done in one? Things that used to need 100 people, can they now be done with 10? It is hard not to think about where that leads.

There is still room for engineers to keep building products that are more usable and more efficient. But if we stop at that layer, the field will only get more crowded. More people can enter, and more people can ship something that looks convincing. The competition will get brutal.

I suspect the real way forward is something closer to how singers and actors responded. Yes, they still release albums, but they also make concerts, stage productions, and live performances. Those are not things you can casually replace by putting a wrapper around something. They require organization, density of detail, and a sense of wholeness that only comes after long polishing, and they face the world directly.

Looking ahead, software may move in that direction too. Everyone will be able to vibe code a product. Everyone will be able to make something that is more or less usable. What will really open up the gap later is still system capability, engineering depth, understanding of real scenarios, and all the things people do not notice at first glance but that ultimately determine whether a product has real weight.

The faster the outside world moves, the less we can afford to lower our own standards for software along with it. Low-level supply will definitely keep increasing, but that does not mean we also have to become rough. The things that survive are usually the ones that feel smooth, comfortable, restrained, almost bug-free, the kind where you can tell the maker treated the work seriously.

I am also thinking through my own next step. I still want to keep building open-source software that is useful, approachable, language-independent, and can earn tens of thousands of stars. I also want to keep playing with low-level rendering, terminals, editors, Rust, and related directions. Before AI, all of that felt very rewarding. After AI, though, once you have an idea, so much suddenly becomes easy that the meaning of it can start to feel less obvious.

Maybe the next thing for me lives in a different dimension, a hardware-software product, or the kind of platform product that used to require thousands of people at a big company, or maybe something that breaks out of the current frame entirely. What exactly it is still needs more thought.

Some of my products and content have already been slowly moving toward English, toward a bigger world. When everything here starts to feel more similar and more crowded, going outward may be one answer. A bigger market, more varied users, and higher expectations make it impossible to stay at the level of wrappers, speed, and timing alone. That pressure forces you to build something more solid, and it also forces you to think again about what you actually want to make.

AI has made many things easier. But precisely because things are easier now, it has become harder to figure out what is truly worth doing and worth trading years of your life for. What to build may matter more than how quickly you can build something.
