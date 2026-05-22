function createOpenAIProvider(env) {
  const apiKey = env.OPENAI_API_KEY;
  const baseUrl = (env.OPENAI_BASE_URL || "https://api.openai.com/v1").replace(/\/$/, "");
  const model = env.OPENAI_MODEL || "gpt-4.1-mini";

  async function generate(messages, options = {}) {
    if (!apiKey) {
      throw new Error("缺少 OPENAI_API_KEY。当前项目默认使用 MiniMax，可在 MODEL_PROVIDER 中切换。");
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
        max_tokens: options.maxCompletionTokens ?? 1800,
        stream: false
      })
    });

    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      const message = payload.error?.message || response.statusText;
      throw new Error(`OpenAI 请求失败：${message}`);
    }

    const content = payload.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error("OpenAI provider 没有返回可用内容。");
    }

    return content;
  }

  return { name: "openai", model, generate };
}

module.exports = {
  createOpenAIProvider
};
