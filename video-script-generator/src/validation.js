const STYLE_LABELS = {
  impact: "燃向",
  suspense: "悬念向",
  hybrid: "燃向 + 悬念"
};

const REQUIRED_FIELDS = [
  ["gameName", "游戏名"],
  ["gameGenre", "游戏类型"],
  ["coreSellingPoint", "核心卖点"],
  ["targetPlayers", "目标玩家"],
  ["duration", "视频时长"],
  ["ratio", "视频比例"],
  ["style", "风格"]
];

function cleanText(value) {
  return String(value || "").trim();
}

function normalizeInput(input) {
  const normalized = {
    gameName: cleanText(input.gameName),
    gameGenre: cleanText(input.gameGenre),
    coreSellingPoint: cleanText(input.coreSellingPoint),
    targetPlayers: cleanText(input.targetPlayers),
    duration: cleanText(input.duration),
    ratio: cleanText(input.ratio),
    style: cleanText(input.style),
    extraNotes: cleanText(input.extraNotes)
  };

  normalized.styleLabel = STYLE_LABELS[normalized.style] || normalized.style;
  return normalized;
}

function validateInput(input) {
  const normalized = normalizeInput(input || {});
  const missing = REQUIRED_FIELDS
    .filter(([key]) => !normalized[key])
    .map(([, label]) => label);

  if (missing.length > 0) {
    return {
      ok: false,
      error: `请填写：${missing.join("、")}`,
      data: normalized
    };
  }

  if (!STYLE_LABELS[normalized.style]) {
    return {
      ok: false,
      error: "请选择有效的视频风格",
      data: normalized
    };
  }

  return { ok: true, data: normalized };
}

module.exports = {
  STYLE_LABELS,
  normalizeInput,
  validateInput
};
