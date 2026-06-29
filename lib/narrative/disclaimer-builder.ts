export function buildDisclaimer(extraContext?: string) {
  const base = "Nội dung chỉ mang tính tham khảo và khám phá bản thân.";

  if (extraContext == null || extraContext.trim().length === 0) {
    return base;
  }

  return `${base} ${extraContext}`;
}

export function buildProfessionalDisclaimer() {
  return buildDisclaimer(
    "Nội dung không thay thế tư vấn chuyên môn về y tế, pháp lý, tài chính hoặc tâm lý.",
  );
}
