---
date: 2026/04/27
---


<img src="https://gw.alipayobjects.com/zos/k/31/266.jpg" width="800" />

<small>The cover photo is a sculpture of a child wearing a mask, taken on the weekend while running errands over in Gongshu. In a flash, the pandemic already feels like a long time ago, and yet it also feels like just yesterday. Those years are still worth remembering.</small>

> **Recording down-to-earth trending tech I see every week, filtered and published here. Follow this weekly newsletter to get update notifications**

## Introducing the Tw93 Open Source Family

<https://github.com/tw93>
<img src="https://cdn.tw93.fun/images/open-source-family-20261021.png" width="800" />

After finishing Kami, I suddenly realized that Kaku, Waza, and Kami feel a lot like a small family. Then I kept thinking, and actually Pake, MiaoYan, and Mole have always been quietly part of this family too. Some of them were even out doing real work before AI showed up. Today let me introduce you to this warm and happy little family.

Kaku is the dad. He mainly handles writing code, the terminal, and builds. Very reliable and capable in the AI era, he holds the family together well.

Pake is the mom. She has been quietly packaging, organizing, and delivering apps all along. Gentle and efficient. She is the kids' favorite in the family.

MiaoYan is the older brother. Sensible and steady, he likes writing, Markdown, and reflective thinking. A quiet young man who thinks for himself, has his own opinions, shares his views, and never chases trends or follows the crowd.

Waza is the older sister. Her personality is similar to mom's, very sharp and capable. As a kid she even practiced taekwondo. She loves learning, and through endless practice and reflection she sharpens her skills until they become instinct.

Kami is the younger sister. The youngest little sweetheart in the family, generated based on my daughter's photo. Bright and cheerful, always smiling, very sunny. She has a kind of order-keeping presence at home, loves tidiness, and loves drawing pretty pictures. Small, but very warm.

Mole is the family's little pet mole. Brought home one year while swimming by a pool in Sanya. A round little mole with a tiny headlamp and a small shovel. He loves rummaging through corners, finding things you no longer need and helping you throw them away. He loves cleanliness. The moment he spots trash, before you can react, it is already gone. Always there, keeping us company.

So, which member of the Tw93 Open Source Family did you meet first? Let me introduce the rest of the family to you, hoping they bring a little something good into your life. And of course, feel free to introduce them to your friends too.

## Product Releases

**Kami: A Comfortable Typesetting and Design System for the AI Era**
<https://github.com/tw93/kami>
The weekend before last I started working on a new Skill called Kami (紙, かみ). You can think of him as the younger sister of Waza (技, わざ) and the daughter of Kaku (書く), focused on Paper typesetting scenarios. Last Monday I finished the open source release. Welcome to give it a try.

For example, when you need to produce a one-page report, write a white paper, generate a polished slide deck, or build a portfolio PDF to send to someone. Any printing or typesetting scenario works. It auto-generates beautiful PDFs, and even has the ability to draw clear charts automatically.

Plenty of updates lately. The most fun one: I added support for 12 inline SVG charts, things like stock investment charts and architecture diagrams, all with colors that match Kami. While generating your layout, it automatically decides whether chart capabilities are needed, helping you explain things more clearly.

I also spent some time supporting English and Japanese scenarios, carefully picking fonts, letter spacing, line heights, and font sizes that I think work well for typesetting. If you have English or Japanese use cases, give it a try.

The output also supports image and slide deck export, including HTML display. The best output for typesetting is still PDF in my opinion, since it reads very comfortably for others.

<img src="https://gw.alipayobjects.com/zos/k/qr/iCgeq1.png" width="800" />

**Mole has updates, plus good news: progress on the desktop client**
<https://github.com/tw93/Mole>
1. mo uninstall: cleans up leftover LaunchAgent/LaunchDaemon plists after uninstall; recognizes pkg-installed apps under non-standard paths like /usr/local and /opt; nested helper apps no longer block login item cleanup; sudo is dropped before calling brew, avoiding cask uninstall failures from "running as root"; Homebrew bottles now run correctly under prefixes that contain spaces (such as Applite).
2. mo clean: Service Worker ScriptCache is no longer cleaned while Chrome / Arc / Brave / Vivaldi / VS Code / Cursor are running, so MV3 extensions stay intact; TCC-protected Group Containers are skipped to avoid repeated privacy prompts.
3. Cloud & Office segments now have timeout and SIGINT handling, no more freezing; Microsoft Office helpers and research software bundles are no longer flagged as orphans (compatible with macOS's built-in bash 3.2); added Yarn v1 global cache cleanup.
4. mo clean: legacy AI coding assistant cleanup adds GitHub Copilot CLI (~/.copilot/pkg/universal/<version>/), handled alongside Claude Code and Cursor Agent.
5. mo analyze: worker pool cap lowered again to prevent system thread exhaustion in Steam-like fan-out scenarios; uses incremental cache invalidation when deleting files, no full rescan needed; bundle parsing falls back to the filesystem after mdfind timeouts.
6. mo optimize: gracefully skips periodic maintenance on macOS 26+ where the underlying tool no longer exists; adds mo optimise alias and completion.

## Just Writing

**The AI Coding You Don't Know: Onboarding, Scenarios, and Practice for Non-Technical Folks**
<https://tw93.fun/en/2026-04-26/ai-coding.html>
Last month I gave a session at work for product and business folks on how to get started with AI Coding. Recently I also posted about it on Twitter, and a lot of people brought up that subscription costs prevent them from accessing the top-tier AI Coding tools. The methods and habits can actually be learned for free first, so I decided to write up the onboarding part. To make it easier to grasp, the article includes plenty of simple illustrations, which should make it more direct.
<img src="https://gw.alipayobjects.com/zos/k/z1/00.png" width="800" />

**Video version of "The Agent You Don't Know: Principles, Architecture, and Engineering Practice"**
<https://www.youtube.com/watch?v=Z5If1L3eFtw>
Finally uploaded to YouTube. If you read the article and did not fully follow it, or want a deeper look, the video version is up. New to YouTube here, so please like, subscribe, and share. From now on I will try to record more sessions and share them here.

<img src="https://gw.alipayobjects.com/zos/k/bp/SCR-20260423-tuzj.jpeg" width="800" />

The [slides](https://tw93.fun/files/share/agent.html) are also fun. They are the predecessor of Kami. Kami started as a small investment report generator I was tinkering with inside CC. Around the same time I had a session about agents to give, and writing such a long deck felt tedious, so I just used the existing capability to generate and tweak versions until I was satisfied. That is how Kami was born. Welcome to read.

**Moments of Happiness**
A lazy Sunday afternoon coding in the study
Nothing else to deal with
Endless Claude Code
Code that works on the first try
Look up and see the sunset coming through the window
A very simple kind of happiness
<img src="https://gw.alipayobjects.com/zos/k/pv/PHyc1R.png" width="400" />

**Some thoughts after sharing, and they have shifted again**
Recently I interviewed a number of 985 university interns for campus recruiting. One strong impression: AI tools are rapidly widening the resource gap between students.

From what I have seen, the gap can really reach 5x. The students clearly ahead, without exception, all got into Claude Code, Codex, and other top AI Coding tools relatively early, and were willing to pay for subscriptions themselves. They do not just use the tools, they have made them part of their daily learning and development. Talking models, engineering, agents, and code practice, the conversation flows naturally for an hour. In many places they understand things more deeply than I do.

But there are also quite a few students with great grades and solid CS fundamentals who, because of family conditions or budget limits, can only use domestic relays or cheaper local model packages. That gap is very real. The best domestic models and top international ones still have about half a year of difference in overall capability. Before AI, the resource gap mostly meant slightly different efficiency. Now it directly affects vision, depth of practice, and confidence.

I have been thinking about this a lot. For students with real potential, missing out on so much just because of a few dozen dollars a month feels like a real shame. It reminds me of when I was in college, also pretty broke most of the time. Lucky for me, in my second year I met some senior developers who pulled me into commercial projects and got me on my feet. I am very grateful to all the friends who patiently taught me technical things back then.

So I want to try a small experiment: take part of the X posting revenue and sponsor a few students who do well academically, love computer science, but come from less wealthy families. Give them a few months of Claude Code or a similar AI Coding subscription, so they actually experience what good models and dev workflows feel like.

But I am also pretty busy on my end and cannot personally handle applications, screening, verification, and long-term follow-up alone. So I want to invite some friends with similar interests to do it together. University teachers, student leads, open source community members, or friends already working in education, public welfare, or developer communities. Together we can come up with a more reliable mechanism.

~I do not want to make this big or complex for now. Start small, maybe 5 to 6 students per round, 3 to 4 months each, perhaps with short weekly video chats with me. Prioritize recommendations, work portfolios, learning records, and real usage feedback, to avoid turning this into pure cash handouts or a contest of who writes the best application. Of course, college students who are on X probably do not lack this money, so we still need better channels.~

If you have reliable channels, or want to help with rule design, recommendations, vetting, or follow-up, please DM me. If we can make this trustworthy, maybe we really can help a few students with real potential.

**Update Reply**:

After the message went out, I received plenty of suggestions and reminders from friends. I read them all carefully.

This really cannot be pushed forward on enthusiasm alone. On one side there are tool usage boundaries and compliance risks. On the other, the real needs of the student community, the screening method, and the follow-up feedback all need a more solid mechanism. Some friends mentioned getting badly burned doing similar things in the past, even bitten back in the end. I find that reminder very valuable.

So the plan now is to first gather more on the actual situation, like the real pain points college students face when using AI Coding tools, budget limits, learning scenarios, and real needs. Then put together a clearer proposal.

Going forward, I will prioritize working with domestic large model vendors, developer communities, and university teachers to see if there is a more formal and sustainable way to push this small step forward.
