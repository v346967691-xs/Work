const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const { validateInput } = require("./src/validation");
const { buildMessages } = require("./src/prompt");
const { createMiniMaxProvider } = require("./providers/minimax");
const { createMiniMaxAnthropicProvider } = require("./providers/minimax-anthropic");
const { createOpenAIProvider } = require("./providers/openai");

const ROOT = __dirname;
const PORT = Number(process.env.PORT || 5177);

function loadEnvFile() {
  const envPath = path.join(ROOT, ".env");
  if (!fs.existsSync(envPath)) return;

  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const index = trimmed.indexOf("=");
    const key = trimmed.slice(0, index).trim();
    const value = trimmed.slice(index + 1).trim().replace(/^["']|["']$/g, "");
    if (!process.env[key]) process.env[key] = value;
  }
}

function getProvider() {
  const provider = (process.env.MODEL_PROVIDER || "minimax")
    .toLowerCase()
    .replace(/[\s_]+/g, "-");

  if (["minimax-anthropic", "anthropic-compatible", "anthropic"].includes(provider)) {
    return createMiniMaxAnthropicProvider(process.env);
  }

  if (["openai-compatible", "minimax", "minimax-openai"].includes(provider)) {
    return createMiniMaxProvider(process.env);
  }

  if (provider === "openai") return createOpenAIProvider(process.env);
  return createMiniMaxProvider(process.env);
}

function sendJson(res, status, payload) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  res.end(JSON.stringify(payload));
}

function sendFile(res, filePath) {
  const ext = path.extname(filePath);
  const contentTypes = {
    ".html": "text/html; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".json": "application/json; charset=utf-8"
  };

  fs.readFile(filePath, (error, content) => {
    if (error) {
      sendJson(res, 404, { error: "文件不存在" });
      return;
    }

    res.writeHead(200, {
      "Content-Type": contentTypes[ext] || "application/octet-stream",
      "Cache-Control": "no-store"
    });
    res.end(content);
  });
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", chunk => {
      body += chunk;
      if (body.length > 1024 * 1024) {
        reject(new Error("请求内容过大"));
        req.destroy();
      }
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error("请求 JSON 格式不正确"));
      }
    });
    req.on("error", reject);
  });
}

async function handleGenerate(req, res) {
  try {
    const input = await readJson(req);
    const validation = validateInput(input);
    if (!validation.ok) {
      sendJson(res, 400, { error: validation.error });
      return;
    }

    const provider = getProvider();
    const messages = buildMessages(validation.data);
    const text = await provider.generate(messages, {
      temperature: 0.88,
      maxCompletionTokens: 1800
    });

    sendJson(res, 200, {
      provider: provider.name,
      model: provider.model,
      text
    });
  } catch (error) {
    sendJson(res, 500, {
      error: error.message || "生成失败，请稍后重试"
    });
  }
}

function handleRequest(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === "GET" && url.pathname === "/api/health") {
    const provider = getProvider();
    sendJson(res, 200, {
      ok: true,
      provider: provider.name,
      model: provider.model
    });
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/generate") {
    handleGenerate(req, res);
    return;
  }

  if (req.method !== "GET") {
    sendJson(res, 405, { error: "不支持的请求方法" });
    return;
  }

  const requestedPath = url.pathname === "/" ? "/index.html" : url.pathname;
  const safePath = path.normalize(requestedPath).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(ROOT, safePath);

  if (!filePath.startsWith(ROOT)) {
    sendJson(res, 403, { error: "禁止访问" });
    return;
  }

  sendFile(res, filePath);
}

loadEnvFile();

const server = http.createServer(handleRequest);
server.listen(PORT, () => {
  console.log(`Game video script generator: http://localhost:${PORT}`);
});
