# 游戏宣传短视频脚本生成器

本地 HTML 工具，用于生成 10-15 秒游戏宣传短视频脚本。第一版默认连接 MiniMax，结构上保留 OpenAI-compatible provider，之后可以扩展其他模型。

## 使用方式

1. 复制配置文件：

```powershell
Copy-Item .env.example .env
```

2. 打开 `.env`，填入你的 MiniMax Key：

```text
MINIMAX_API_KEY=你的_key
```

3. 启动本地服务：

```powershell
npm start
```

4. 打开浏览器访问：

```text
http://localhost:5177
```

## 功能

- 自定义视频时长，例如 `10秒`、`12秒`、`15秒`
- 视频比例快捷选择：`16:9`、`4:3`、`3:4`、`9:16`
- 支持燃向、悬念向、燃向 + 悬念
- 输出分镜、字幕、屏幕大字、音效节奏、AI 视频提示词、配音提示词和 CTA

## 测试

```powershell
npm test
```

## MiniMax 接口

本工具使用 MiniMax 的 OpenAI-compatible chat completions 格式，默认接口为：

```text
https://api.minimax.io/v1/chat/completions
```
