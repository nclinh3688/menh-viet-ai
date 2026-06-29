export interface DailyFortuneScore {
  label: string;
  score: number;
}

export interface DailyFortuneSnapshot {
  dateKey: string;
  totalScore: number;
  loveScore: number;
  workScore: number;
  financeScore: number;
  mentalScore: number;
  luckScore: number;
  advice: string;
  shouldDo: string[];
  shouldAvoid: string[];
  scores: DailyFortuneScore[];
}

export function generateDailyFortuneSnapshot(
  profileId: string,
  date = new Date(),
): DailyFortuneSnapshot {
  const dateKey = date.toISOString().slice(0, 10);
  const seed = hashString(`${profileId}:${dateKey}`);
  const loveScore = scoreFromSeed(seed, 11);
  const workScore = scoreFromSeed(seed, 23);
  const financeScore = scoreFromSeed(seed, 37);
  const mentalScore = scoreFromSeed(seed, 53);
  const luckScore = scoreFromSeed(seed, 71);
  const totalScore = Math.round(
    (loveScore + workScore + financeScore + mentalScore + luckScore) / 5,
  );
  const guidance = buildGuidance(totalScore);

  return {
    dateKey,
    totalScore,
    loveScore,
    workScore,
    financeScore,
    mentalScore,
    luckScore,
    advice: buildAdvice(totalScore),
    shouldDo: guidance.shouldDo,
    shouldAvoid: guidance.shouldAvoid,
    scores: [
      { label: "Tình cảm", score: loveScore },
      { label: "Công việc", score: workScore },
      { label: "Tài chính", score: financeScore },
      { label: "Tinh thần", score: mentalScore },
      { label: "May mắn", score: luckScore },
    ],
  };
}

function hashString(value: string) {
  return value.split("").reduce((hash, char) => {
    return (hash * 31 + char.charCodeAt(0)) >>> 0;
  }, 2166136261);
}

function scoreFromSeed(seed: number, salt: number) {
  return 55 + (((seed >>> 3) + salt * 17) % 41);
}

function buildAdvice(score: number) {
  if (score >= 82) {
    return "Hôm nay phù hợp để chủ động mở lời, xử lý việc quan trọng và hoàn thiện các cam kết còn dang dở.";
  }

  if (score >= 68) {
    return "Giữ nhịp ổn định, ưu tiên các việc có kế hoạch rõ ràng và tránh quyết định vội khi cảm xúc lên cao.";
  }

  return "Nên dành thêm thời gian quan sát, nghỉ ngơi và chọn các bước nhỏ chắc chắn thay vì ép tiến độ.";
}

function buildGuidance(score: number) {
  if (score >= 82) {
    return {
      shouldDo: ["Chủ động xử lý việc quan trọng", "Mở lời với người cần kết nối", "Hoàn thiện cam kết còn dang dở"],
      shouldAvoid: ["Ôm quá nhiều đầu việc", "Quyết định vì hưng phấn nhất thời"],
    };
  }

  if (score >= 68) {
    return {
      shouldDo: ["Ưu tiên kế hoạch rõ ràng", "Giữ nhịp làm việc đều", "Ghi chú lại tín hiệu quan trọng"],
      shouldAvoid: ["Tranh luận khi cảm xúc cao", "Đổi hướng quá nhanh"],
    };
  }

  return {
    shouldDo: ["Chọn việc nhỏ nhưng chắc", "Nghỉ ngơi đúng lúc", "Quan sát trước khi phản hồi"],
    shouldAvoid: ["Ép tiến độ", "Ra quyết định lớn khi thiếu dữ kiện"],
  };
}
