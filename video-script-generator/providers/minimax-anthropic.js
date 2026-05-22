function createMiniMaxAnthropicProvider(env) {
  const apiKey = env.MINIMAX_API_KEY;
  const baseUrl = (env.MINIMAX_ANTHROPIC_BASE_URL || "https://api.minimaxi.com/anthropic").replace(/\/$/, "");
  const model = env.MINIMAX_MODEL || "MiniMax-M2.7";

  function toAnthropicPayload(messages, options) {
    const system = messages.find(message => message.role === "system")?.content || "";
    const userMessages = messages
      .filter(message => message.role !== "system")
      .map(message => ({
        role: message.role === "assistant" ? "assistant" : "user",
        content: [{ type: "text", text: String(message.content || "") }]
      }));

    return {
      model,
      max_tokens: options.maxCompletionTokens ?? 1800,
      temperature: options.temperature ?? 0.85,
      system,
      messages: userMessages
    };
  }

  async function generate(messages, options = {}) {
    if (!apiKey) {
      throw new Error("缺少 MINIMAX_API_KEY，请先在 .env 中配置 MiniMax Token Plan Key。");
    }

    const response = await fetch(`${baseUrl}/v1/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify(toAnthropicPayload(messages, options))
    });

    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      const message = payload.error?.message || payload.base_resp?.status_msg || response.statusText;
      throw new Error(`MiniMax Anthropic 请求失败：${message}`);
    }

    const text = Array.isArray(payload.content)
      ? payload.content.map(part => part.text || "").join("")
      : "";

    if (!text) {
      throw new Error("MiniMax Anthropic 没有返回可用内容。");
    }

    return text;
  }

  return { name: "minimax-anthropic", model, generate };
}

module.exports = {
  createMiniMaxAnthropicProvider
};
