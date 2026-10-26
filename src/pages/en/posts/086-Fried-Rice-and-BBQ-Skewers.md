---
date: 2022/07/12
---

<img src="https://gw.alipayobjects.com/zos/k/8o/IMG_9595.jpeg" width="800" />

<small>I had fried rice and BBQ skewers at "Ran Dian" over the weekend. When you’re truly hungry, nothing beats it—absolute god-tier comfort food.</small>

> **Record the down-to-earth trending technologies seen every week, and publish them here after screening. If you find it good, you can follow this weekly to get update notifications.**

## Front-End Technology

**An Overview of the WebAssembly Ecosystem**  
<https://mp.weixin.qq.com/s/ZZbRRPTYAu8qUmLwKCs6ew>  
A high-level look at the state of WASM and the key technologies driving its evolution in modern web development.

**ES2022: New Features in Action**  
<https://h3manth.com/ES2022/>  
A practical, code-first guide to the latest features introduced in the ES2022 specification.

**Proxy: Beyond the Basics**  
<https://mp.weixin.qq.com/s/LFpHyiMHwsZ2aVKWqdM2hg>  
Revisiting the Proxy object to discover some of its less obvious but incredibly powerful use cases.

## Trending Open Source

**Music for Programming: The Ultimate Focus Playlist**  
<https://musicforprogramming.net/>  
A highly curated set of tracks designed specifically to help you get into the flow and stay there. The site itself is a work of art.  
<img src="https://cdn.tw93.fun/blog/upic/9mG8yP.jpg" width="800" />

**TinyWow: The Swiss Army Knife for Files**  
<https://tinywow.com/>  
An incredibly powerful set of web tools for handling PDFs, images, and videos. Free, fast, and very well-made.  
<img src="https://cdn.tw93.fun/blog/upic/8Knvv6.jpg" width="800" />

**Chinese Poetry: The Most Comprehensive Collection**  
<https://github.com/chinese-poetry/chinese-poetry>  
A massive database featuring over 300,000 poems from the Tang and Song dynasties. A fantastic resource for cultural and creative projects.

**SnapKit: Elegant AutoLayout for iOS & OS X**  
<https://github.com/SnapKit/SnapKit>  
A DSL that makes writing constraints in Swift feel almost like writing frontend styles. Highly recommended for Apple platform devs.

```swift
import SnapKit
class MyViewController: UIViewController {lazy var box = UIView()
    override func viewDidLoad(){super.viewDidLoad()
        self.view.addSubview(box)
        box.backgroundColor = .green
        box.snp.makeConstraints {(make) -> Void in
           make.width.height.equalTo(50)
           make.center.equalTo(self.view)
        }
    }
}
```

## Just Looking Around

**Learning from Li Dan**  
<https://mp.weixin.qq.com/s/N6FyqhwHndRO3vDiYJFt-g>  
An insightful piece from MacTalk on the philosophy and professional approach of the famous comedian and writer.

**How Should I Relate to the World?**  
<https://sspai.com/post/73704>  
In an age of information overload, it’s easy to second-guess every decision. This article explores how to stay true to your choices and maintain your center.

**Spring in the Local Markets of Leshan and Yibin**  
<https://zhuanlan.zhihu.com/p/534986693>  
A culinary tour through the local markets of smaller cities. Real food, real people, and the true birthplace of great cuisine.

**Xianyu Knows Everything about Milk Tea Shop Failure**  
<https://www.huxiu.com/article/594177.html>  
The "death" of many milk tea businesses can be tracked by the equipment appearing for sale on second-hand platforms. A sad but fascinating economic indicator.

**WeChat 8.0.24: 5 Features to Watch**  
<https://sspai.com/post/74042>  
The latest update adds some major functionality, including Mini Programs sharing to Moments and a native AirPlay implementation for WeChat.
