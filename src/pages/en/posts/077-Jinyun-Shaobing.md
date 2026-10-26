---
date: 2022/05/10
---

<img src="https://gw.alipayobjects.com/zos/k/m6/12m3024.jpg" width="800" />

<small>I drove to Jinyun over the May Day holiday. I spent three days there and ate Jinyun *Shaobing* (baked flatbread) three times—they are genuinely incredible. The city is clean, green, and perfect for a slow-paced getaway.</small>

> **Record the down-to-earth trending technologies seen every week, and publish them here after screening. If you find it good, you can follow this weekly to get update notifications.**

## Front-End Technology

**The Ultimate Guide to Microservices Architecture**  
<https://www.containiq.com/post/microservices-architecture-ultimate-guide-tutorial>  
A comprehensive deep dive into the concepts, benefits, and challenges of adopting a microservices model.

**Top 6 JavaScript ES12 Features You Should Be Using**  
<https://www.syncfusion.com/blogs/post/top-6-javascript-es12-features-you-should-use.aspx>  
ECMAScript is already at ES12! Here’s a look at the most practical features to adopt in your daily workflow.

**Creative CSS Tips: The Typewriter Effect**  
<https://markodenic.com/css-tips/>  
A collection of clever CSS tricks, including how to build a classic typewriter animation using zero JavaScript.

## Trending Open Source

**pyscript: Write Python directly in your HTML**  
<https://github.com/pyscript/pyscript>  
A very bold new project that brings the power of Python to the browser. Definitely check out their examples for a look at the future of web-based data science.

```html
<html>
  <py-script>
    from datetime import datetime now = datetime.now()
    now.strftime("%m/%d/%Y,%H:%M:%S")
  </py-script>
</html>
```

**Lit: Building Fast, Lightweight Web Components**  
<https://github.com/lit/lit>  
A simple library from Google for building standard-compliant Web Components. I particularly love the clean TypeScript decorator syntax.

```js
import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("simple-greeting")
export class SimpleGreeting extends LitElement {
  static styles = css`
    p { color: blue; }
  `;

  @property() name = "Somebody";

  render() {
    return html`<p>Hello, ${this.name}!</p>`;
  }
}
```

**Frappe Gantt: A Simple and Modern Gantt Chart Library**  
<https://github.com/frappe/gantt>  
If you need to add project scheduling to your app, this is one of the most user-friendly libraries out there.  
<img src="https://img.alicdn.com/imgextra/i2/O1CN01Cuwjy81fXNM8Da7Cs_!!6000000004016-0-tps-2522-590.jpg" width="800" />

**JSON Hero: The Most Comfortable Way to Read JSON**  
<https://github.com/jsonhero-io/jsonhero-web>  
A beautifully designed viewer that makes sense of complex JSON structures with a clear, hierarchical UI.  
<img src="https://cdn.tw93.fun/blog/upic/W2xEDT.jpg" width="800" />

## Just Looking Around

**Behind the Scenes of the Twitter Acquisition**  
<https://sspai.com/prime/story/twitter-merger-explained>  
A masterclass in M&A strategy from the Elon Musk playbook. It’s a wild ride that’s about far more than just "free speech."

**Must-Have iPhone Features You Can’t Live Without**  
<https://www.v2ex.com/t/849965>  
A V2EX discussion where users reflect on the seamless integration of hardware and software that keeps them in the Apple ecosystem.

**The Rise of Camping in the Age of Travel Restrictions**  
<https://mp.weixin.qq.com/s/Zzd0hy1FGeNalCbKRNW25g>  
With people unable to leave their provinces, camping has exploded as the ultimate way to enjoy a "leisurely" holiday close to home.
