---
date: 2021/08/03
---

<img src="https://gw.alipayobjects.com/zos/k/1n/skNlgh.jpg" width="800" />

<small>The new bed for my cat, Tang Yuan. He’s recently taken a liking to sleeping on "JavaScript: The Definitive Guide"—maybe he has some coding aspirations of his own.</small>

> **Record the down-to-earth trending technologies seen every week, and publish them here after screening. If you find it good, you can follow this weekly to get update notifications.**

## Front-End Technology

**Using Whistle for Modern Web Debugging**  
<https://zhuanlan.zhihu.com/p/79037633>  
A powerful, open-source alternative to Charles. This guide covers how to set it up and why it might be the only tool you need for network inspection.

**Common Sense Knowledge Graphs at Meituan**  
<https://tech.meituan.com/2021/06/24/nature-language-process-nlp-knowledge-graph.html>  
Helping machines understand natural language by building a structured knowledge base that maps out common sense relationships.

**Understanding AsyncHooks in Node.js**  
<https://mp.weixin.qq.com/s/08AVmJLMdMNm4yNWQwk-DA>  
A deep look into the `async_hooks` module and how it provides an API for tracking asynchronous resources throughout their lifecycle.

**Building a Browser from Scratch: The HTML Parser**  
<https://mp.weixin.qq.com/s/ku6yNZqIKH9wBSGbUdhW0A>  
Before reading the article: if you were asked to write a simple HTML-to-AST parser right now, how would you approach the logic?

## Trending Open Source

**fzf: A Command-Line Fuzzy Finder**  
<https://github.com/junegunn/fzf>  
An essential tool that makes finding files, history, and processes in your terminal blazingly fast.  
<img src="https://cdn.tw93.fun/blog/upic/VO9evM.jpg" width="800" />

**lowdb: A Tiny JSON Database for Small Projects**  
<https://github.com/typicode/lowdb>  
Perfect for Electron apps or small local scripts where you need a simple, persistent data store without the overhead of a full database.

```js
import { join } from "path";
import { Low, JSONFile } from "lowdb";

const adapter = new JSONFile(join(__dirname, "db.json"));
const db = new Low(adapter);

await db.read();
db.data ||= { posts: [] };
db.data.posts.push("hello world");
await db.write();
```

**Sucrase: Blazingly Fast Alternative to Babel**  
<https://github.com/alangpierce/sucrase>  
A lightweight transform tool that speeds up local builds by focusing only on the most common modern JS transforms.  
<img src="https://cdn.tw93.fun/blog/upic/wRqFqh.jpg" width="800" />

**RustDesk: An Open-Source Remote Desktop**  
<https://github.com/rustdesk/rustdesk>  
A fantastic, zero-config alternative to TeamViewer and AnyDesk that you can also host yourself.

**Best Practices for Node.js CLI Apps**  
<https://github.com/lirantal/nodejs-cli-apps-best-practices>  
A comprehensive checklist for anyone building tools for the command line.

## Just Looking Around

**Training AI on Lu Xun and Mao Zedong’s Complete Works**  
<https://zhuanlan.zhihu.com/p/384410563>  
What happens when you give an AI the complete works of China’s most iconic writers and ask it to write a college entrance exam essay? The results are surprisingly "on brand."

**SHEIN: A Victory for Long-Term Strategy**  
<https://www.huxiu.com/article/437382.html>  
A deep dive into the traffic, supply chain, and management innovations that turned SHEIN into a global fast-fashion giant.

**10 Figma Plugins to Supercharge Your Workflow**  
<https://www.uisdc.com/10-figma-plugins-save-time>  
Figma has become the industry standard for UI design. These plugins will help you bridge the gap between design and high-efficiency production.

**High-Impact Motion Design for Marketing Products**  
[Read more at UISDC](https://www.uisdc.com/marketing-dynamic-effect)  
A beautiful exploration of how motion design can be used to drive business goals and user engagement.
