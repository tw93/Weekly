---
date: 2024/06/03
---

<img src="https://gw.alipayobjects.com/zos/k/pj/179.jpg" width="800" />

<small>The cover photo shows Xi Gong, a restaurant in Hangzhou. If you're looking for stir-fried, spicy, and "rice-killing" dishes with that authentic "wok hei," this is the place. It's affordable, incredibly fragrant, and common for a colleague to eat three bowls of rice here.</small>

> **Record the down-to-earth trending technologies seen every week, and publish them here after screening. If you find it good, you can follow this weekly to get update notifications.**

## Technical Learning

**A reading list of about 30 AI research papers**  
<https://arc.net/folder/D0472A20-9C20-4D3F-B145-D2865C0A9FEE>  
On Reddit, I saw OpenAI co-founder Ilya Sutskever shared a list of ~30 AI papers, saying, "If you truly learn all of these, you'll know 90% of what's important in AI today." I've bookmarked them, though the reading level is quite high...  
<img src="https://gw.alipayobjects.com/zos/k/5i/SCR-20240526-tmfi.png" width="800" />

**100 Exercises To Learn Rust**  
<https://rust-exercises.com/>  
Perfect for those with some programming background who want to learn Rust. It teaches key concepts one exercise at a time, which is much better than just reading documentation.  
<img src="https://gw.alipayobjects.com/zos/k/rh/SCR-20240526-tapf.png" width="800" />

**Google Code Review Guide**  
<https://dub.sh/crcr>  
An article on "Google CR Guidelines: How to Advance Code Review." It offers practical advice that is much better than the generic "helpful tips" you often see. I'm promoting this in my team now.

## Trending Tools

### Running terminal commands without a password

You can configure `sudo` to allow specific commands to run without a password using the `sudoers` file. Only do this for commands you trust.

```bash
sudo visudo
```

Then add a rule. To find the path of a command, use `which <command>`. For example, to allow `systemctl` without a password:

```bash
your_username ALL=(ALL) NOPASSWD: /bin/systemctl
```

Replace `your_username` with your Mac username. You can add multiple commands separated by commas. Then save and exit.

**QuickRecorder: A handy screen recording tool**  
<https://github.com/lihaoyun6/QuickRecorder>  
An open-source, multi-functional, lightweight, and high-performance screen recording tool for macOS. Very compact and easy to use.  
<img src="https://gw.alipayobjects.com/zos/k/5l/459shots_so.png" width="800" />

**WeChat Input Method’s "Offline Mode"**  
<https://z.weixin.qq.com/>  
WeChat Input now has an offline mode that downloads models locally instead of being cloud-connected. It can still sync your previous dictionary. While it feels good to use, most people in the community remain skeptical about the privacy protection.  
<img src="https://gw.alipayobjects.com/zos/k/l4/413shots_so.png" width="800" />

## Just Looking Around

**Life is a wilderness, not a track**  
Looking at this image, I feel even more that life is an open field. Every step is just one path to the present, and from the present, there are countless new paths to the future. Everything we do now is to ensure we have more choices in the future.  
<img src="https://gw.alipayobjects.com/zos/k/oc/926shots_so.png" width="800" />

### Random Thoughts: How Hard Information Is to Get and How Useful It Is to You

0️⃣ I want to have a down-to-earth chat about how hard information is to get and how useful it is to you. The two are strongly linked: generally, the higher the cost of getting a piece of information, the more useful it is to you, and the lower the cost, the less useful.

1️⃣ Information that costs nothing to get, or is even spoon-fed to you, is the least useful. The short videos, algorithmic news and feeds you keep scrolling all belong here. They have little real input value, and they even want to maximize their own gain through your browsing, such as ad revenue, sponsored-purchase revenue, or surging SEO traffic to hit a KPI. The more of this you consume, the less sharp you become.

2️⃣ Information you have to search for a long time, or even pay a real cost for, is the most useful. For example, ChatGPT at 20 dollars a month, spending time choosing books, paying for them and then putting in the effort to finish them, papers and journals you have to translate and work through for a long time before you understand them, or the experience of losing money on Chinese concept stocks a few years ago. These are all costly sources of information, and much of what you get from them you may remember for the rest of your life. It may cost a bit in the short term, but the long-term return is much bigger, like how I no longer touch Chinese concept stocks...

3️⃣ Besides the rule that costlier information is worth more to you, there is another very useful trick: produce high-quality output from what you learn. For someone learning a technology, reading 100 good technical articles does less than writing one high-quality article yourself, and less than building a small toy based on what you learned.

4️⃣ These three stages are a lot like training today's large models, with the model standing in for our brain. If you train a model on large amounts of junk or even wrong information, it will surely end up worse than before training. If you train it on curated knowledge data, maybe even carefully selected data you paid for, and splash out on good GPUs too, the model turns out better than you would imagine. Going one step further is like Tesla's FSD and robots: put the trained abilities to real use, bring the process back to tune it, like input followed by output and then feeding it back, and the result is seriously impressive.
