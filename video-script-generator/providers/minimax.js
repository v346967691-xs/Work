function createMiniMaxProvider(env) {
  const apiKey = env.MINIMAX_API_KEY;
  const baseUrl = (env.MINIMAX_BASE_URL || "https://api.minimax.io/v1").replace(/\/$/, "");
  const model = env.MINIMAX_MODEL || "MiniMax-M2.7";

  async function generate(messages, options = {}) {
    if (!apiKey) {
      throw new Error("缺少 MINIMAX_API_KEY，请先在 .env 中配置 MiniMax Key。");
    }

    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: options.temperature ?? 0.85,
        top_p: options.topP ?? 0.95,
        max_completion_tokens: options.maxCompletionTokens ?? 1800,
        stream: false
      })
    });

    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      const message = payload.error?.message || payload.base_resp?.status_msg || response.statusText;
      throw new Error(`MiniMax 请求失败：${message}`);
    }

    const content = payload.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error("MiniMax 没有返回可用内容。");
    }

    return content;
  }

  return { name: "minimax", model, generate };
}

module.exports = {
  createMiniMaxProvider
};
