const test = require("node:test");
const assert = require("node:assert/strict");
const { buildScriptPrompt, buildMessages } = require("../src/prompt");

const sample = {
  gameName: "星域突击",
  gameGenre: "动作 Roguelike",
  coreSellingPoint: "十秒一局，技能爆炸连锁",
  targetPlayers: "喜欢快节奏战斗的玩家",
  duration: "15秒",
  ratio: "9:16",
  styleLabel: "燃向 + 悬念",
  extraNotes: "突出 Boss 登场"
};

test("prompt asks for micro story structure and required output sections", () => {
  const prompt = buildScriptPrompt(sample);

  assert.match(prompt, /15秒/);
  assert.match(prompt, /9:16/);
  assert.match(prompt, /微剧情/);
  assert.match(prompt, /3 个微剧情方向/);
  assert.match(prompt, /冲突升级/);
  assert.match(prompt, /爆点反转/);
  assert.match(prompt, /逐秒分镜表/);
  assert.match(prompt, /AI 视频提示词/);
  assert.match(prompt, /配音提示词/);
});

test("messages include system and user roles", () => {
  const messages = buildMessages(sample);

  assert.equal(messages.length, 2);
  assert.equal(messages[0].role, "system");
  assert.equal(messages[1].role, "user");
  assert.match(messages[0].content, /微剧情结构/);
  assert.match(messages[1].content, /星域突击/);
});
