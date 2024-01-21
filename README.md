# 开局博士

[bilibili 上的代码运行视频](https://www.bilibili.com/video/BV1gi4y1W7qM)

monorepo 中的 core 是核心算法，把游戏地图作为二维数组输入进去会一次性找出所有可能的起点和终点。  
具体的自动化逻辑请自行实现，我用 js 简单写了一个自动化流程。  
但是因为 OCR 识别准确率还有鼠标操作不准确的原因，有时候会有 bug 导致无法正常消除或完全消除。  
如果你发现了 bug，那一定是自动化的 bug，虽然没有写单元测试，但是 core 中的算法是没有问题的。

经过测试以后发现，目前版本并不是每一句都可能超过 100 分。也就是说可能在 90 分的时候出现残局。  
鉴于关卡目前是在游戏中随机生成的，所以残局是必然的。

我就先写到这里了，如果你还是想更深入的开发，你应该只借鉴 core package 中的查找算法，并使用更好的自动化框架来实现自动化的游戏。
