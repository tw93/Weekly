---
date: 2022/04/12
---

<img src="https://gw.alipayobjects.com/zos/k/hf/04.jpeg" width="800" />

<small>I took this at 7:30 AM at the Fuyang driving test center. Two days of early morning practice were exhausting, but I finally passed Level 2! Can't wait to get through the rest of the tests.</small>

> **Record the down-to-earth trending technologies seen every week, and publish them here after screening. If you find it good, you can follow this weekly to get update notifications.**

## Technical Insights

**What's New in ES2022?**  
<https://dev.to/jasmin/whats-new-in-es2022-1de6>  
The top-level `await` and dynamic `import()` features are game-changers for writing cleaner, more modular code.

```js
let lodash;
try {
  lodash = await import("https://primary.example.com/lodash");
} catch {
  lodash = await import("https://secondary.example.com/lodash");
}
```

**New in Chrome 100**  
<https://developer.chrome.com/en/blog/new-in-chrome-100/>  
The `Multi-screen window placement API` that we used experimentally for our customer service workspace is finally enabled by default in the stable release.

**Memory Optimization: Texture Compression**  
<https://mp.weixin.qq.com/s/V7sK1WwQ4D3LikK2AHgrZQ>  
An excellent deep dive from the Alibaba tech team on optimizing asset delivery and memory usage for mobile apps.

**Reducing Network Latency for your App**  
<https://mp.weixin.qq.com/s/F6Yfbqio50OyAzCntNEmXg>  
A low-level look at the factors that impact network speed and the transport protocol optimizations that can make your app feel snappier.

**Creative `background-clip` Text Effects**  
<https://mp.weixin.qq.com/s/nf1PjrsKXCiGiRQsTTqqvA>  
If you haven't used `background-clip: text`, you're missing out on some incredible styling possibilities—including complex animated gradients.  
<img src="https://gw.alipayobjects.com/zos/k/lb/26.gif" width="800" />

## Trending Open Source

**Nodes: Build 3D Objects with Logic Nodes**  
<https://nodes.io/>  
A visual programming platform for creating 3D content. Even if you’re not a 3D expert, you can quickly build and tweak impressive scenes.  
<img src="https://gw.alipayobjects.com/zos/k/hg/HULoNC.jpg" width="800" />

**speed-highlight: Lightweight JS Syntax Highlighting**  
At only 1KB compressed, this library is a massive improvement over traditional highlighters if bundle size is a priority.  
<img src="https://gw.alipayobjects.com/zos/k/gk/UnuraB.jpg" width="800" />

**log: Styled Console Messages**  
<https://github.com/adamschwartz/log>  
An easy way to make your debug messages stand out with custom CSS styling in the browser console.  
<img src="https://gw.alipayobjects.com/zos/k/da/ez85cv.jpg" width="800" />

**psd: Lightweight PSD Parser**  
<https://github.com/webtoon/psd>  
A very effective tool for parsing Photoshop files, including layer information, directly in your JS projects.  
<img src="https://gw.alipayobjects.com/zos/k/xx/Lkv7I4.jpg" width="800" />

## Just Looking Around

**China's 2021 Statistical Report**  
<http://www.stats.gov.cn/tjsj/zxfb/202202/t20220227_1827960.html>  
An essential read for anyone looking to understand the macroeconomic and social development trends of the past year.

**The Unique Engineering Culture of Facebook**  
<https://chinese.catchen.me/2022/02/unique-engineering-culture-of-facebook.html>  
A seven-year retrospective on what makes the culture at Meta different from other major tech firms.

**Why Apple’s $150 Charging Cable is Actually Reasonable**  
<https://www.ifanr.com/1476416>  
A technical look at what goes into a high-end Thunderbolt cable. (Though I’m still not buying one yet!)
