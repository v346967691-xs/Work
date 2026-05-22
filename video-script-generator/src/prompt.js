function buildScriptPrompt(data) {
  return `你是一位资深游戏宣发短视频编导，擅长把游戏卖点压缩成高转化的短视频脚本。

请基于以下游戏信息，生成一个适合宣传游戏的短视频脚本方案。

【游戏信息】
游戏名：${data.gameName}
游戏类型：${data.gameGenre}
核心卖点：${data.coreSellingPoint}
目标玩家：${data.targetPlayers}
视频时长：${data.duration}
视频比例：${data.ratio}
视频风格：${data.styleLabel}
补充说明：${data.extraNotes || "无"}

【创作要求】
1. 重点服务游戏宣传，不要写成泛娱乐文案。
2. 节奏要适合 ${data.duration} 的短视频，尤其适配 10-15 秒高密度呈现。
3. 如果是竖屏比例，画面建议要强调主体居中、字幕安全区和手机端可读性。
4. 如果是横屏比例，画面建议要强调场景宽度、镜头调度和视觉冲击。
5. 文案要短、准、有画面感，避免空泛形容词堆砌。
6. 输出中文，格式清晰，方便直接复制给剪辑、配音或 AI 视频工具。

【必须输出以下栏目】
## 一句话爆点
一句 20 字以内的核心钩子。

## 逐秒分镜表
按时间段拆分镜头，包含：时间、画面、字幕/口播、音效/节奏。

## 口播/字幕稿
给出一版可以直接使用的完整短文案。

## 屏幕大字
列出 3-6 条适合叠在画面上的短句。

## 音效与剪辑节奏
说明 BGM 情绪、音效点、转场节奏。

## AI 视频提示词
写成可复制的提示词，必须包含游戏类型、核心画面、镜头运动、光影质感、视频比例 ${data.ratio}、时长 ${data.duration}。

## 配音提示词
说明声音性别倾向、语速、情绪、停顿和重音。

## 结尾 CTA
给出 2-3 条不同强度的结尾召唤。`;
}

function buildMessages(data) {
  return [
    {
      role: "system",
      content: "你是游戏宣发短视频脚本专家，只输出可执行、可拍、可剪的中文方案。"
    },
    {
      role: "user",
      content: buildScriptPrompt(data)
    }
  ];
}

module.exports = {
  buildMessages,
  buildScriptPrompt
};
