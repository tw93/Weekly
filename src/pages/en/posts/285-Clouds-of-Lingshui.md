---
date: 2026/10/12
---

<img src="https://cdn.fliggy.com/pic/28549.jpg" width="800" />

<small>The cover photo is from a few days in Lingshui over the National Day holiday, a small city next to Sanya with the sea, few people, good snacks and not much commercial feel, though it was pretty hot those days.</small>

> **Down-to-earth tech I come across each week, picked out and shared here. Follow the newsletter to get updates.**

## Trending Tools

**Tendedero: hang your screenshots on a clothesline at the top of the screen**
<https://github.com/alejandrobujan/tendedero>
I haven't seen such a creative little tool in a long time. Every screenshot you take gets hung on a line at the top of the screen. Hover over the menu bar and the line slides down, move away and it tucks back up.
<img src="https://cdn.tw93.fun/uPic/demo-light01.gif" width="800" />

**Paseo: one interface for all kinds of coding agents, plus phone control**
<https://github.com/getpaseo/paseo>
It feels a bit cleaner than the others, and the advantage is that you can check progress and keep working from your phone. I still like the purest TUI experience best, but if you need something like this, give it a try.
<img src="https://cdn.tw93.fun/uPic/43QkZu07.png" width="800" />

**Strata: run a 125-billion-parameter AI model on your own gaming PC**
<https://github.com/Niko1221/Strata>
Reportedly it can run the 125B Qwen 3.8 Flash Next with only 12 GB of VRAM, at over 80 tok/s. Maybe this will push the price of the top Mac Studio down a bit.
<img src="https://cdn.tw93.fun/uPic/rvMHx609.png" width="800" />

## Just Looking Around

**Bought a great book: "Art: What Makes Us Human"**
Last night I found a treasure at the Duozhuayu offline store, a very thick and very large book called "Art: What Makes Us Human". It's even a bit hard to hold up with one hand. I couldn't wait to read it first thing this morning, and the content is great, leaning toward general humanities. I hope it brings some different thinking and input for the new products I make.
<table>
    <tr>
        <td width="50%">
          <img src="https://cdn.tw93.fun/uPic/cbKME458.png" width="400" />
        </td>
        <td width="50%">
            <img src="https://cdn.tw93.fun/uPic/bpO6xF20.png" width="400" />
        </td>
    </tr>
</table>

**"Echoes of the Rainbow" is a really good Hong Kong film**
Watching it again ten years later, it's still very good and very warm. Recommended if you're looking for something to watch.
<img src="https://cdn.tw93.fun/uPic/E9blSR16.png" width="800" />

**A few tips for using Personal Agents**
Recently I've seen some friends get their GitHub accounts banned, which is quite a hassle. It was probably because some automated agent simulated browser actions and broke the official rules.

When you use agents, especially the Personal Agents that are so popular lately, I suggest giving them one hard rule: don't operate your important accounts through browser automation, especially X, Reddit, Xiaohongshu, GitHub and Gmail.

If there's an official API, use the official API. If there's an official CLI, use the CLI. For MCP servers and third-party CLIs, look at how they work underneath. Some just wrap simulated web clicks, cookies or private endpoints, which can easily cause trouble and isn't really compliant either.

If there's no suitable official interface, have it stop and tell you, and handle it by hand. Don't let the agent try all sorts of workarounds on its own just to finish the task. Triggering risk control or even a ban would be a shame.

Finally, I think following the rules here is completely different from trying to avoid getting Claude banned. Avoiding a Claude ban is a kind of superstition, and for many people telling you how to avoid it, check whether their posts carry links with aff parameters. Most of them are selling cloud servers and other services or earning referral fees. That part is superstition and luck. But where the platform has clearly said that non-API automation and scripted web operations are forbidden, I think those rules should be followed. They're normal rules to prevent abuse.
<img src="https://cdn.tw93.fun/uPic/ARw3vr52.png" width="800" />

**On ASD-STE100 aircraft maintenance manuals and Skills**
I recently added a very useful set of action and reply rules to Waza, the engineer skill collection I use every day. They come from ASD-STE100, a simplified technical English standard first made for aircraft maintenance documentation.

It started with a recommendation from Andrej Karpathy to have LLMs follow this standard when explaining things, which makes replies easier to read. I had some free time one evening, so I read through the standard and the official AI white paper, and found that its requirements on words, conditions and the order of actions are a great fit for checking whether an AI has actually said things clearly. So I want to explain it in an easier way, based on my own understanding.

Think of it this way: the people reading aircraft maintenance manuals come from many countries, and English may not be their first language. When repairing a plane, which part to remove, when an action is allowed, and how far the previous step must go before you can move on, doesn't that feel a lot like asking an agent to do things today? We also want the agent to do it accurately and quickly and to fully understand what we want. That's very close to the writing rules in these maintenance manuals.

Often, if a word shifts meaning or a sentence drops a condition, the person following the manual may do something different. It's like a big company where the CEO's idea passes through many rounds of relay, and a lot of information gets distorted, so the final result can be completely different from what was first intended.

As I understand it, this standard exists to solve exactly that gap between what is said and what is done. It consists of writing rules and a dictionary. The dictionary limits which part of speech a word can take and what it can mean, including which technical terms in the industry are allowed. The same thing doesn't get a different name just to avoid repetition, and steps have to spell out their conditions and order. These requirements make a lot of sense for technical docs too.

To help the AI understand, I put examples like these in Waza, for instance in the write skill, so what the AI writes comes out clearer.

For example, if "After the upload completes, delete the local file" gets simplified by the AI into "Start the upload, then delete the local file", things can easily go wrong: the file might be deleted before it finishes uploading. Here "completes" decides when deletion is allowed, so it's a word that must stay.

Or take "Restart only if the check passes" versus "Restart after the check passes". The first meets the requirement. The second has no clear constraint on the action, which opens up many more possibilities. "Only if" is the key word that keeps the original meaning.

This is exactly what I want the AI to pay attention to in daily replies and when working for me: state the result clearly so neither of us is confused, get to the point, and don't make me ask one more question. Things like "the code is changed", "tests pass", "it's pushed" and "users can download it" are detailed statements of the result. If it only says "fixed and verified", I will definitely keep asking what was actually solved and whether everything is done.

That said, I don't think the AI needs to follow the full standard. The summarized rule is actually very short: "Keep the same name for the same object, name the object when a reference is unclear, keep conditions and exceptions next to the action they apply to, keep the order of steps, and separate suggestions, requirements and possibilities. Don't change what is already clear, and don't drop reasons and boundaries just to be brief."

Of course, you can also install Waza's clarity rule directly, or take a look [here](https://github.com/tw93/Waza/blob/main/rules/clarity.md).

<img src="https://cdn.tw93.fun/uPic/E5jit115.png" width="800" />

## Random Thoughts

**I'd say Gemini 3.8 Flash High is the best model right now for polishing product and website copy**

These past few days I used up my Claude and Codex quotas and several resets, but I still had things to do. I dug out the Gemini AI plan I'd bought for $199 a year about six months ago and had almost forgotten. Without much hope, I wanted to see whether Google's models had improved, so I downloaded Antigravity and set it to the best model available.

I had it polish some of the copy in Mole Mac, hoping to make the text in every language as simple, clear and easy to understand as possible. I gave it a very simple request and it got to work. It was fast, and for each piece of copy it gave the before, the after and the reason. Looking closely, it was a lot better than what the best GPT and Claude models had done before, which surprised me. The language is smooth, natural and clear, not stilted, without that AI flavor. It felt great. It's a bit behind on coding, but it turns out to be this good at writing.

The $20 a month plan holds up surprisingly well. I had it polish Mole's website, app settings, optimization items, cleanup items, tip text, descriptions and more. A lot of what I wrote by hand before really wasn't that easy to understand. After switching to this, it feels like you've hired a language teacher who sits next to you and thinks about how beginners can better understand your product, and it did a lot for me.

I got hooked on polishing copy, so I bought another $20 account and kept going. When one runs out, the other has just reset. I've polished almost all the hard-to-understand copy and descriptions in my earlier products, including various open source READMEs. It feels great and I really like it. It has found its calling.

If you have similar needs, I really recommend dusting off your Gemini and giving it a try, it will surprise you. Have it output a before-and-after comparison with reasons so you can check first, and ask it to aim for simple, clear, easy to understand, without an AI tone. Really, really good.

One last tip: after you finish polishing with it, have Opus 5.5 review the result, and then let it learn from it.

<img src="https://cdn.tw93.fun/uPic/h6KPtR10.png" width="800" />

**Codex Pro at $200 doesn't last long at all**
Codex Pro at $200 doesn't last long at all for me. It feels like less than 1/4 of a $200 Claude Max account. The former uses GPT-6 Astra Medium, the latter Opus 5.5 high.

How fast does it run out? With normal use, even while also using other models, I can burn through a whole Codex weekly reset in about a day, and in about 2 days use up the 62,500 bonus credits, worth roughly $2,500. You can almost watch the quota tick down as you use it like a countdown. Very Pro, not Max.

I really hope OpenAI keeps pushing 💪 to hit the impossible triangle Opus 5.5 hits: fast, good and generous with quota. I also hope Chinese models keep pushing, I haven't seen an impressive release in a while.
<img src="https://cdn.tw93.fun/uPic/X9AJw746.png" width="800" />

**Random thoughts: in the AI era, keeping your human feel and uniqueness really matters**

A funny thing lately is that whenever I post something in Chinese on Twitter, a bunch of AI replies show up underneath. I used to jokingly reply that their AI should use a better model. After seeing so many, it feels like a group of friends happily chatting when someone suddenly pops up with an incoherent summary and ruins the mood.

I'm not sure where they picked up this shady trick, but it's completely outdated. It brings no benefit to your account and won't improve any of its numbers. Instead it can easily get the account ruined and wastes tokens. It's not worth it, you've just turned into a bot.

Lately I really enjoy watching TESTV videos while doing AI coding. They had a strong human feel before the AI era, and it hasn't changed at all in it. They're more like a group of close friends who started a fun company, don't take ads to fool viewers, review interesting products, and record their laid-back life together in Chongqing. I really like them.

Compared with the top tech reviewers I always watched before the AI era, I suddenly realized I barely watch them anymore. I can even guess their hand gestures when introducing a product, the way they smile and the filler words they'll use. It feels very scripted. The videos themselves are high quality, but it gets a bit tiring.

That feeling is just like a lot of AI-generated images, videos and articles today. Many of them would have felt high quality before the AI era, but once the same core gets repeated too much, I get the same fatigue I get from those review videos.

Our content doesn't have to be repetitive at all. We can write it ourselves, and even if the quality is average, it's far better than repeated "high quality". Of course, AI can raise the level a lot, letting people with ideas make things they couldn't have imagined before, without having to ask anyone for help. In many areas good models are already stronger than people in every respect. I've also benefited a lot from model progress, and my efficiency has gone way up.

Making products is the same. Putting your human feel, your style and your worldview into the product matters a lot, as long as it's yours and only yours, not the kind of thinking AI does for you.

If everything from idea to product to operations is done by AI, you get a lot of identical stuff. With tokens plentiful, some people also take products that serious engineers spent years building, have AI rewrite them in another language, distill them in half a day, upload them to GitHub and openly open source them, casually saying the original was bad in some places and they made a better one. Some even think programming is no big deal, since someone like them who can't code at all can make something this "useful".

What they don't realize is that this easily discourages many thoughtful engineers from continuing to contribute good code and good ideas to the community. A timeline full of identical content also makes thoughtful creators post less, and quantity gradually beats quality. In the end, people who want good content can't find it, and people who could post good content don't want to post here anymore.

Being on Twitter through both the pre-AI and current AI eras, I have a habit that keeps me comfortable: all of these casual posts are typed by hand, not generated by AI. There may be typos, it may not read smoothly, and it may ramble, but none of that really matters. I see it as a great way to keep myself human. I'm quite worried that relying fully on AI will make me dumber. It's like if every road were self-driving, you'd completely lose the fun of driving and turn yourself into a chauffeur, which wouldn't be fun at all.

So I want to use my brain as much as I can in the places I can still handle, and just treat it as a new kind of entertainment.

<img src="https://cdn.fliggy.com/pic/IMG_396324.JPG" width="800" />
