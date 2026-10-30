---
date: 2021/06/08
---

<img src="https://cdn.tw93.fun/blog/2000/g0-IMG_4629.webp" width="800" />

<small>The cover shows Red Willow BBQ at Bayi Laoye. It's arguably the best Xinjiang spot in Hangzhou. If you're near East Station, it's a must-try for their pilaf, big plate chicken, and skewers.</small>

> **Record the down-to-earth trending technologies seen every week, and publish them here after screening. If you find it good, you can follow this weekly to get update notifications.**

## Front-End Technology

**Nest: Exploration and Practice of Meituan’s Serverless Platform**  
<https://tech.meituan.com/2021/04/21/nest-serverless.html>  
A look at how Meituan implements Serverless—interesting to compare their approach with Alibaba’s.

**The Limitations and Challenges of Kubernetes**  
<https://draveness.me//kuberentes-limitations>  
A solid analysis of where K8s struggles and why it might not be the silver bullet for every use case.

**Is Xianyu Quietly Giving Up on Flutter?**  
<https://www.infoq.cn/article/e5zF5JmXKEzjNfLqIbas>  
The title is a bit "click-baity," but the interview inside provides a very grounded look at the current state of Flutter in large-scale production.

**When (and When Not) to Use Microservices**  
<https://www.infoq.cn/article/0bPqMlDiFjdKKx0iWmDJ>  
A great primer for anyone still trying to wrap their head around the microservices vs. monolith debate.

## Trending Open Source

**lipgloss: A Beautiful Styling Library for the Terminal**  
<https://github.com/charmbracelet/lipgloss>  
I absolutely love the aesthetic of this library. It brings high-end design to the command line.  
<img src="https://cdn.tw93.fun/blog/upic/weUxcC.jpg" width="800" />

**Open Source Goes to Mars**  
<https://github.blog/2021-04-19-open-source-goes-to-mars/>  
A very "trendy" recognition—if your code contributed to the Mars projects, you can now get a dedicated badge on your GitHub profile.  
<img src="https://cdn.tw93.fun/blog/upic/OxAE0J.gif" width="800" />

**Logica: Google’s New Logic-Based SQL Language**  
<https://github.com/EvgSkv/logica>  
Aimed at simplifying massive SQL queries. Personally, I find it a bit abstract, but it’s an interesting technical attempt.

```python
# Define primes.
Prime(prime: x) :-
  N(x),
  x > 1,
  ~(
    N(y),
    y > 1,
    y != x,
    Mod(x, y) == 0
  );
```

**terminal-link: Create Clickable Links in the Terminal**  
<https://github.com/sindresorhus/terminal-link>  
I didn't realize this was even possible until now! I've been using different colors to represent links for years.  
<img src="https://cdn.tw93.fun/blog/upic/oHm45Q.gif" width="800" />

## Just Looking Around

**The State of Semiconductor Manufacturing in China**  
<https://weibo.com/tv/show/1034:4629360712548388?from=old_pc_videoshow>  
I caught a video of a CAS professor explaining the current chip landscape. It’s a sobering look at how far we still have to go. I’ve included some additional research reports for those who want to dive deeper into the industry.

**A 1968 US Military Computer Teardown**  
<https://mp.weixin.qq.com/s/1_CeiaLmvHb8KmNzJkRvuA>  
Looking at the engineering from over 50 years ago, it almost feels like "time travel"—an incredible look at early high-stakes computing.

**Optimizing First-Screen Rendering in the Hello TransTech App**  
<https://mp.weixin.qq.com/s/5Ez2BrsyBgQ8aHZqlYtAjg>  
A technical breakdown of how mobile clients optimize for that "instant-on" feel.

**Software Disenchantment**  
<https://tonsky.me/blog/disenchantment/>  
A critical look at how the software industry is gradually losing its focus on efficiency, simplicity, and technical excellence.
