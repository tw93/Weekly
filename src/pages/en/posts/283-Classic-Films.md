---
date: 2026/09/21
---

<img src="https://cdn.fliggy.com/pic/IMG_355245.JPG" width="800" />

<small>The cover photo is from my trip to the cinema this Saturday to see The Shawshank Redemption. It moved me and left me with a lot to think about, almost as if I could feel what it was like to watch it in a cinema back in 1994.</small>

> **Down-to-earth tech I come across each week, picked out and shared here. Follow the newsletter to get updates.**

## Trending Tools

**Window Sweaters: knit a sweater for your Mac windows**
<https://github.com/saragordic/window-sweaters>
A little menu bar toy that wraps macOS windows in knitted borders. Not much practical use, but nicely made and so fun to look at.
<img src="https://cdn.fliggy.com/pic/S9dx0b39.png" width="800"/>

**lazyrsync: a terminal UI for rsync, written in Rust**
<https://github.com/westpoint-io/lazyrsync>
Save configurations to reuse, preview file changes with a dry run before syncing, and watch progress as it runs. Worth a try if you often sync large directories and don't want to put the arguments together by hand every time.
<img src="https://cdn.fliggy.com/pic/demo43.gif" width="800" />

**OpenDisplay: an open-source alternative to Sidecar / Duet**
<https://github.com/peetzweg/opendisplay>
Turn a spare iPhone, iPad, or Mac into a second screen for your Mac, with a proper extended desktop, not just mirroring. IPhone and iPad support USB or Wi-Fi connections and touch input. It's free and open source, so give it a try if you have a spare device around.
<img src="https://cdn.fliggy.com/pic/rQHnuy25.png" width="800" />

**Runner: orchestrate coding agents in a native terminal**
<https://github.com/yicheng47/runner>
Another terminal for coding agents. Claude Code, Codex, and others keep their own TUIs, with Role / Crew / Mission added on top. Built with Rust and a community fork of GPUI, it's for people who run a bunch of agents in parallel and still want to watch their real terminals. If you prefer something simple, I still recommend my Kaku.
<img src="https://cdn.fliggy.com/pic/rUKVxj06.png" width="800" />

**Jev: a model built for quick decisions**
<https://typesafe.ai/blog/introducing-system-one-models-and-jev>
A decision model that's been getting a lot of attention on X these past few days. It doesn't chat; it returns decisions and probabilities in a structure you define beforehand. The official demos show fast responses, and API calls are cheap. I can see it being useful for smart homes, classification, and decisions in business workflows. It's still in early access, so you can apply if you're curious.
<img src="https://cdn.fliggy.com/pic/66rHkF06.png" width="800" />

## Just Looking Around

**Sharing some snacks I keep buying, I've bought these so many times.**
I'm in the mood to buy some snacks. What are the tastiest snacks, drinks, little bites, or coffees you've found lately? All recommendations welcome.

<table>
    <tr>
        <td width="25%">
          <img src="https://cdn.fliggy.com/pic/GAcV7J53.png" width="300" />
        </td>
        <td width="25%">
            <img src="https://cdn.fliggy.com/pic/Ync31T08.png" width="300" />
        </td>
       <td width="25%">
                 <img src="https://cdn.fliggy.com/pic/SxtxjF18.png" width="300" />
      </td>
       <td width="25%">
            <img src="https://cdn.fliggy.com/pic/vGFTG724.png" width="300" />
       </td>
    </tr>
</table>

**Started using Threads these past few days and liked it more than I expected**
<https://threads.com/@tw93.fun>
I started using Threads these past few days and liked it more than I expected. It feels so much like Twitter when I first joined around 2022. It feels full of real people, lots of younger people, no one selling anxiety, and a strong sense of community. I rarely see anything that immediately reads as AI-written. If you'd like another place to chat, come have a look, and if you're already on Threads, come say hi~
<img src="https://cdn.fliggy.com/pic/39jcpx32.png" width="800" />

**Lately I've been doing something "dumb," perhaps exactly the sort of repetitive work engineers in the AI era really don't want to do.**

To make Mole more thorough at uninstalling apps and finding leftovers, I put together a list of over 300 Mac apps from China and elsewhere, with downloads totaling over 100 GB. Working in batches of 10, I had my strongest model running with Extra High and Fast use computer use to download them from their official sites, install them on my computer one by one, inspect their directories, update components, and startup items, uninstall them, look for leftovers, and fill in the missing rules.

The process looks pretty boring, and plenty of apps are a pain to install: endless permission popups, nudges to buy something, or an administrator password required just to use them. The agent could handle most of it, and I helped with the rest. What surprised me was that the AI even wrote scripts to automate installation, uninstallation, and leftover checks to make its own work easier. Pretty clever, haha, I ended up being its assistant.

Boring as it is, this helps a lot with what the product can do and how good it feels to use. Originally I thought I'd test at most 100 mainstream apps and add anything Mole missed to its cleanup rules. Then I thought, why not another 100? At 200, I thought, another 100, and now it's over 300. That might answer what sets Mole apart from other cleanup and uninstall tools: it can get into the details, find junk you'd struggle to locate yourself, and uninstall more thoroughly while leaving things alone that shouldn't be touched. Seen that way, it becomes quite interesting.

The process helped me add 13 categories of reusable rules and over 90 specific cleanup paths, and correct more than 30 places I originally thought needed cleaning but should actually be left alone. It also filled in quite a few rules for software update detection and startup items, with over 100 unit tests added along the way. Details like these are hard to fill in from the AI's existing theoretical and engineering knowledge alone; it has to actually do the work to run into them. I'm glad AI was there, because doing this manually would probably have taken me 10 times as long. It also helped fill in some old gaps, which was very useful.

It changed some assumptions I had, too. I used to think software engineering should be orderly and follow conventions. After testing 100 apps, surely there wouldn't be many more rules to add, since the conventions and underlying technologies of mainstream apps should be possible to enumerate. But the further you go, the more you find that's not how it works. Plenty of leftovers escape whatever general rules you write, and some apps don't even use reverse-domain notation for their bundle IDs. Something that looks like a proper convention may just be what a programmer happened to write years ago. You can't work it out from theory alone; you have to install each app and check.

I'll probably keep going to 400, 500, 600, maybe even test every commonly used app with Mole and add rules for the details these unconventional apps leave behind. Perhaps doing these "dumb things" is what can make Mole the best Mac cleanup and optimization tool in the world.

<video width="800px" preload="metadata" preload muted loop><source src="https://cdn.fliggy.com/pic/moleshougong17.mp4" type="video/mp4"></video>

**I've decided: whenever a good old film comes back to the cinema, I'm going**

I went to see The Shawshank Redemption on Saturday afternoon, and it felt completely different from watching it on a computer or TV. So absorbing, such a pleasure, almost as if I could feel what it was like to see it in a cinema back in 1994.

I'd seen it a few times, but by the time I walked in, I'd forgotten most of the plot details. It felt so good to remember them gradually as the film went on.

When I watched it as a kid, it felt like looking at the people inside from the outside. Now that I'm a little older, it feels like looking at the people outside from the inside.

Often, what traps a person isn't the routine of school, work, a mortgage, and raising children. It's deciding along the way that this is all their life is going to be, and accepting it. A bit like Brooks, who spent much of his life working in the prison library, couldn't adjust after getting out, and finally left "Brooks was here" before ending his life.

The real prison often isn't the physical walls, but the walls we build in our own minds.

Fear Can Hold You Prisoner, Hope Can Set You Free.

I've been thinking that whatever stage of life we're at, we need to hold on to hope and keep pursuing freedom. One day, we might reach the Zihuatanejo we've been hoping for, too.
