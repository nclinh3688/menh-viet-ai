import type { Fact, Recommendation } from "./rule-types";

const recommendationMap: Record<string, string[]> = {
  BALANCED_EARTH: ["Quản lý dự án", "Vận hành", "Nhân sự", "Xây dựng quy trình"],
  CAREER_LEADERSHIP: ["Quản lý", "Kinh doanh", "Điều phối", "Dẫn dắt nhóm"],
  CAREER_MANAGEMENT: ["Tài chính", "Pháp lý", "Quản trị", "Kỹ thuật"],
  CAREER_OPERATIONS: ["Vận hành", "Bất động sản", "Quản lý dự án", "Hậu cần"],
  CAREER_STRATEGY: ["Chiến lược", "Phát triển kinh doanh", "Sản phẩm"],
  COMMUNICATION_STRENGTH: ["Truyền thông", "Nghiên cứu", "Thương mại", "Dịch vụ"],
  CREATIVE_GROWTH: ["Giáo dục", "Sáng tạo", "Tư vấn", "Phát triển sản phẩm"],
  GOOD_FINANCE: ["Lập kế hoạch ngân sách", "Theo dõi dòng tiền", "Ưu tiên mục tiêu dài hạn"],
  PRACTICAL_STABILITY: ["Ghi chú quyết định", "Tạo checklist", "Duy trì thói quen ổn định"],
  STABLE_RELATIONSHIP: ["Lắng nghe chủ động", "Thống nhất kỳ vọng", "Dành thời gian chất lượng"],
  STRONG_FIRE: ["Thử vai trò dẫn dắt nhỏ", "Chọn môi trường có nhịp hành động rõ"],
  WOOD_GROWTH: ["Mở rộng mạng lưới", "Học kỹ năng mới", "Nuôi dưỡng dự án dài hạn"],
};

export function buildRecommendations(facts: Fact[]): Recommendation[] {
  return facts
    .map((fact) => ({
      domain: fact.domain,
      factCode: fact.code,
      items: recommendationMap[fact.code] ?? [],
    }))
    .filter((recommendation) => recommendation.items.length > 0);
}
