export interface DailyFortuneScore {
  label: string;
  score: number;
}

export interface DailyFortuneDemo {
  dateKey: string;
  totalScore: number;
  loveScore: number;
  workScore: number;
  financeScore: number;
  mentalScore: number;
  advice: string;
  scores: DailyFortuneScore[];
}

export function generateDailyFortuneDemo(
  profileId: string,
  date = new Date(),
): DailyFortuneDemo {
  const dateKey = date.toISOString().slice(0, 10);
  const seed = hashString(`${profileId}:${dateKey}`);
  const loveScore = scoreFromSeed(seed, 11);
  const workScore = scoreFromSeed(seed, 23);
  const financeScore = scoreFromSeed(seed, 37);
  const mentalScore = scoreFromSeed(seed, 53);
  const totalScore = Math.round(
    (loveScore + workScore + financeScore + mentalScore) / 4,
  );

  return {
    dateKey,
    totalScore,
    loveScore,
    workScore,
    financeScore,
    mentalScore,
    advice: buildAdvice(totalScore),
    scores: [
      { label: "Tổng quan", score: totalScore },
      { label: "Tình cảm", score: loveScore },
      { label: "Công việc", score: workScore },
      { label: "Tài chính", score: financeScore },
      { label: "Tinh thần", score: mentalScore },
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
