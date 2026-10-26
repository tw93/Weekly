---
date: 2021/06/29
---

<img src="https://gw.alipayobjects.com/zos/k/e2/o4FeLQ.jpeg" width="800" />

<small>The cover was taken at the Presidential Palace in Nanjing. For city travel, I highly recommend finding a small local group tour for the last day—they cover all the major landmarks, handle the transport, and drop you right at the station. Nanjing is a very "trendy" city; highly recommend trying the local food and exploring Xinjiekou.</small>

> **Record the down-to-earth trending technologies seen every week, and publish them here after screening. If you find it good, you can follow this weekly to get update notifications.**

## Front-End Technology

**It’s 2021—Why are You Still Using WebStorm?**  
<https://juejin.cn/post/6963835326821302303>  
A deep dive into why WebStorm is still my favorite tool. I cover how to get the latest version, tips for keeping it fast, and the specific "killer features" that keep me from switching to VS Code.

**Implementing Watermarks in the Frontend**  
<https://juejin.cn/post/6964357725652254734>  
Techniques for adding both visible and invisible watermarks to your web applications for security and attribution.

**Designing a Billion-Scale API Gateway: Shepherd**  
<https://tech.meituan.com/2021/05/20/shepherd-api-gateway.html>  
A comprehensive look at the architecture and design decisions behind Meituan’s massive scale API gateway platform.

**Google Docs Migrating from HTML to Canvas Rendering**  
<https://www.zhihu.com/question/459251463>  
A fascinating shift toward low-level rendering for complex document applications—feels almost like a "renaissance" for desktop-quality tech on the web.

## Trending Open Source

**fingerprintjs: Stable and Accurate Browser Fingerprinting**  
<https://github.com/fingerprintjs/fingerprintjs/>  
Generates a unique ID based on a vast array of browser and system features. You can see it in action at [schemeflood.com](https://schemeflood.com/).

**Flutter Responsive Admin Panel**  
<https://github.com/abuanwar072/Flutter-Responsive-Admin-Panel-or-Dashboard>  
A beautiful example of how Flutter can be used to build sophisticated, responsive data dashboards.  
<img src="https://cdn.tw93.fun/blog/upic/194j2u.gif" width="800" />

**BackgroundMusic: Per-App Volume Control for macOS**  
<https://github.com/kyleneideck/BackgroundMusic>  
Ever wanted to mute one specific app while keeping others loud? This is the tool for you.

**SwiftUI-Hooks: Bringing React Patterns to SwiftUI**  
<https://github.com/ra1028/SwiftUI-Hooks>  
I much prefer Swift over Objective-C, and being able to use a hooks-style architecture makes it even better.

```swift
struct Example: HookView {
    var hookBody: some View {
        let time = useState(Date())

        useEffect(.once) {
            let timer = Timer.scheduledTimer(withTimeInterval: 1, repeats: true) {
                time.wrappedValue = $0.fireDate
            }
            return { timer.invalidate() }
        }

        return Text("Now: \(time.wrappedValue)")
    }
}
```

**mobile-app-automizer: Automated Release Workflows**  
<https://github.com/automizer/mobile-app-automizer>  
A custom tool for managing the build, upload, and versioning lifecycle for both Android and iOS applications.  
<img src="https://cdn.tw93.fun/blog/upic/eUi3o1.gif" width="800" />

## Just Looking Around

**Google I/O 2021 Technical Recaps**  
[Watch on YouTube](https://www.youtube.com/playlist?list=PLOU2XLYxmsIJhsF3up2ueu2pRealr9raD)  
The production quality is exceptional as always. Note the fantastic energy and clarity of the sign language interpreters!  
<img src="https://cdn.tw93.fun/blog/upic/HvoctW.gif" width="800" />

**How flomo Aims to Change the Way We Think**  
[Listen to the Podcast](https://www.xiaoyuzhoufm.com/episode/60098bf729de8062086ffad5)  
An interview with the product manager of the viral note-taking app flomo on his philosophy of knowledge management.

**The Logical Foundations of China’s Digital Economy**  
<http://www.ruanyifeng.com/blog/2021/05/china-economy-explanation.html>  
Ruan Yifeng’s notes on Huang Qifan’s book "Analysis and Reflection." It’s a masterclass in understanding the economic forces shaping the region.

**The Death of App Deep-Linking from WeChat Mini Programs**  
<https://www.zhihu.com/question/459459278>  
WeChat recently disabled the ability for Mini Programs to open external apps directly. While some see it as a move against "over-marketing," I find this level of ecosystem siloing detrimental to the open web.  
<img src="https://cdn.tw93.fun/blog/upic/2zJmrp.jpg" width="800">
