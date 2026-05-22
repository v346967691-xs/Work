# 游戏宣传短视频脚本生成器

本地 HTML 工具，用于生成 10-15 秒游戏宣传短视频脚本。第一版默认连接 MiniMax 中国区 Token Plan，并保留 OpenAI-compatible provider，之后可以扩展其他模型。

## 使用方式

1. 复制配置文件：

```powershell
Copy-Item .env.example .env
```

2. 打开 `.env`，填入你的 MiniMax Token Plan Key：

```text
MINIMAX_API_KEY=你的_key
```

3. 中国区 Token Plan 推荐配置：

```text
MODEL_PROVIDER=OpenAI Compatible
MINIMAX_BASE_URL=https://api.minimaxi.com/v1
MINIMAX_MODEL=MiniMax-M2.7
```

如果要尝试 Anthropic 兼容协议，改成：

```text
MODEL_PROVIDER=Anthropic Compatible
MINIMAX_ANTHROPIC_BASE_URL=https://api.minimaxi.com/anthropic
MINIMAX_MODEL=MiniMax-M2.7
```

4. 启动本地服务：

```powershell
npm start
```

5. 打开浏览器访问：

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
