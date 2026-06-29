const bannedTerms = [
  "chắc chắn",
  "sẽ",
  "định mệnh",
  "100%",
  "tuyệt đối",
  "đại họa",
  "phá sản",
  "ly hôn chắc chắn",
];

export const preferredPhrases = [
  "có xu hướng",
  "từ dữ liệu hiện có",
  "theo nguyên lý",
  "điều này gợi ý rằng",
  "có thể cân nhắc",
] as const;

export function findBannedTerms(text: string) {
  const normalizedText = text.toLowerCase();

  return bannedTerms.filter((term) => normalizedText.includes(term));
}

export function assertSafeLanguage(text: string) {
  const foundTerms = findBannedTerms(text);

  if (foundTerms.length > 0) {
    throw new Error(`Unsafe narrative terms: ${foundTerms.join(", ")}`);
  }
}

export function softenSentence(sentence: string) {
  return `Từ dữ liệu hiện có, ${sentence.charAt(0).toLowerCase()}${sentence.slice(1)}`;
}
