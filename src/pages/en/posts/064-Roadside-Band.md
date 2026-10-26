---
date: 2022/02/08
---

<img src="https://gw.alipayobjects.com/zos/k/3x/XkCKcA.jpg" width="800" />

<small>I saw this roadside drum band in Sabah a while ago. It was such a raw, organic performance at night.</small>

> **Record the down-to-earth trending technologies seen every week, and publish them here after screening. If you find it good, you can follow this weekly to get update notifications.**

## Front-End Technology

**Which Front-End Tech will Blow Up in 2022?**  
<https://juejin.cn/post/7051901448044429349>  
A look at the trending technologies that are likely to dominate the conversation this year. I definitely agree with quite a few of these.

**Is it Time for pnpm?**  
<https://zhuanlan.zhihu.com/p/457698236>  
If you’re frustrated with the speed and disk usage of NPM or Yarn, it might be time to give pnpm a try. Its content-addressable storage is a game-changer.

**Detecting and Diagnosing App Memory Issues**  
<https://mp.weixin.qq.com/s/E80VEIJma66fj7BZy1cCeQ>  
A practical guide on utilizing Xcode to track down and resolve memory leaks and performance bottlenecks in your applications.

## Trending Tools

**Riju: A Playground for Almost Any Language**  
<https://riju.codes/>  
An impressive web-based playground that supports a staggering variety of languages. Everything I tested ran flawlessly.  
<img src="https://gw.alipayobjects.com/zos/k/fv/5ZJDae.jpg" width="800">

**Interactive CSS Layout Generator**  
<https://layout.bradwoods.io/customize>  
A great visual tool for building complex CSS grid layouts. I’m definitely using this for my next project.  
<img src="https://gw.alipayobjects.com/zos/k/gy/l4HZ7S.jpg" width="800" />

**fuite: Find Memory Leaks on Web Pages**  
<https://github.com/nolanlawson/fuite>  
This is a brilliant tool. It uses Puppeteer to navigate your site, simulating user interactions and checking if any memory isn't being properly released.

**ddddocr: Universal OCR for CAPTCHAs**  
<https://github.com/sml2h3/ddddocr>  
A very effective and easy-to-use OCR library for recognizing simple captchas. The API is about as simple as it gets.

```python
import ddddocr
ocr = ddddocr.DdddOcr()
with open("test.jpg", 'rb') as f:
    image = f.read()
res = ocr.classification(image)
print(res)
```

**Sparkle: The Update Framework for macOS Apps**  
<https://github.com/sparkle-project/Sparkle>  
If you’re venturing into native Mac development, Sparkle is the industry standard for handling software updates outside of the App Store.  
<img src="https://gw.alipayobjects.com/zos/k/kh/Vbb96m.jpg" width="800" />

## Just Looking Around

**Elon Musk Interview Highlights**  
<https://chedongxi.com/p/264710.html>  
A wide-ranging conversation covering everything from SpaceX’s colonization plans to Tesla’s FSD challenges and the first-principles thinking that drives him.

**Meituan’s Client-Side CDN Disaster Recovery Solution**  
<https://tech.meituan.com/2022/01/13/phoenix-cdn.html>  
A look at how major tech firms handle content delivery failures. At my own company, CDN redundancy is the ultimate safety net for any production issue.

**The 2021 Financial Report from China's Central Bank**  
<http://www.199it.com/archives/1377176.html>  
The numbers are massive: trillions in new loans and deposits over the past year. A key read for understanding the economic climate.
