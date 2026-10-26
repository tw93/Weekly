---
date: 2021/08/17
---

<img src="https://gw.alipayobjects.com/zos/k/w3/GOoYKt.jpg" width="800" />

<small>Taken at Hongshan Park in Urumqi. The sunlight was perfect, and the red characters were incredibly crisp. For an engineer, what is your "Original Aspiration"?</small>

> **Record the down-to-earth trending technologies seen every week, and publish them here after screening. If you find it good, you can follow this weekly to get update notifications.**

## Front-End Technology

**Comprehensive Roundup of Essential Linux Commands**  
<https://segmentfault.com/a/1190000040222932>  
A very solid summary. I personally practiced through these to sharpen my memory—it's incredibly useful for Mac terminal users, too (though maybe don't try the shutdown commands).

**Leveraging Machine Learning for Smart Web Pre-fetching**  
<https://mp.weixin.qq.com/s/S1Yg6wiYkK2lN-5aTp2dqQ>  
A very "trendy" approach to performance: using ML to predict which pages a user will visit next and pre-loading them at just the right time.

**How to Design a Task Scheduler from Scratch**  
<https://mp.weixin.qq.com/s/O6fAOodJq6pyJnqy1IuqEg>  
Starting from real business needs, this article breaks down the role of a scheduler, defines the key interfaces, and provides a clean implementation.

**Deep Dive Into Modern Browsers**  
<https://mp.weixin.qq.com/s/XN9wUM-FdWbE1m66jkEgIg>  
The final entry in a great series. You can find links to the previous deeper technical dives at the bottom of the article.

**Making List Markers Meaningful with CSS ::marker**  
<https://segmentfault.com/a/1190000040175019>  
As we spend more time in JS frameworks, we often forget the small but delightful possibilities of modern CSS.

## Trending Open Source

**DoraemonKit: A Platform for Full-Lifecycle App R&D**  
<https://github.com/didi/DoraemonKit>  
The marketing name is a bit vague, but essentially it’s a powerful "Swiss Army knife" overlay for debugging and testing apps on the fly.  
<img src="https://cdn.tw93.fun/blog/upic/tx4GIQ.jpg" width="800" />

**petite-vue: A 5kb Subset of Vue for Progressive Enhancement**  
<https://github.com/vuejs/petite-vue>  
A very trendy move by Evan You—perfect for small projects where you want the "one-man army" speed of jQuery but with modern reactivity.

```html
<body>
  <script src="https://unpkg.com/petite-vue" defer init></script>
  <div v-scope="{ count: 0 }">
    <button @click="count--">-</button>
    <span>{{ count }}</span>
    <button @click="count++">+</button>
  </div>
</body>
```

**SolidJS: Declarative UI Library with No Virtual DOM**  
<https://github.com/solidjs/solid>  
An impressive look at how the next wave of frameworks is moving away from the VDOM for massive performance gains.

**tiptap: The Headless Rich-Text Editor Framework**  
<https://github.com/ueberdosis/tiptap>  
A headless framework for building rich-text editors for almost any JavaScript framework. Highly recommended.  
<img src="https://cdn.tw93.fun/blog/upic/V5cCTX.jpg" width="800" />

**MonitorControl: Control External Monitor Brightness via macOS**  
<https://github.com/MonitorControl/MonitorControl>  
Just run `brew install --cask monitorcontrol` to finally control your external display volume and brightness using your Mac keyboard keys.

## Just Looking Around

**Rust for Node.js Developers: A Deep Dive**  
<https://itnext.io/deep-dive-into-rust-for-node-js-developers-5faace6dc71f>  
A great guide that explains Rust concepts by comparing them to familiar patterns in Node.js.

**Fixing Bugs in Third-Party Libraries via Bitcode on iOS**  
<https://mp.weixin.qq.com/s/BuDnfl1ZbUtiZBhy8_Z7wA>  
A technical tour-de-force on patching compiled machine code when you don't have access to the source of a third-party SDK.

**Why is Airline Food Getting Worse?**  
<https://www.huxiu.com/article/440281.html>  
I agree—beef or chicken? Beef or chicken? Even the names sound tired. Check out the [Zhihu discussion](https://www.zhihu.com/question/35768349) for some legendary bad meals.

**The "Iron Fist" of Regulation on App Pop-up Ads**  
<https://www.miit.gov.cn/xwdt/gxdt/sjdt/art/2021/art_71269fd7c4de4182836e4ddf1863ad30.html>  
The Ministry of Industry and Information Technology is finally cracking down on the aggressive pop-up behavior that plague mobile apps. Hopefully, my post on ["Why Apps from Two Years Ago Felt Better"](https://zhuanlan.zhihu.com/p/384811471) will soon be a relic of the past.

**Why Use Go? What are the Advantages?**  
<https://www.zhihu.com/question/21409296>  
I’ve been eyeing a new language to learn recently, and Go is looking like a very strong candidate.
