const test = require("node:test");
const assert = require("node:assert/strict");
const { validateInput } = require("../src/validation");

test("validates required game script fields", () => {
  const result = validateInput({});

  assert.equal(result.ok, false);
  assert.match(result.error, /游戏名/);
  assert.match(result.error, /视频比例/);
});

test("normalizes valid input and maps style label", () => {
  const result = validateInput({
    gameName: " 星域突击 ",
    gameGenre: "动作 Roguelike",
    coreSellingPoint: "十秒一局，技能爆炸连锁",
    targetPlayers: "喜欢快节奏战斗的玩家",
    duration: "12秒",
    ratio: "9:16",
    style: "hybrid",
    extraNotes: "突出 Boss 登场"
  });

  assert.equal(result.ok, true);
  assert.equal(result.data.gameName, "星域突击");
  assert.equal(result.data.styleLabel, "燃向 + 悬念");
});
