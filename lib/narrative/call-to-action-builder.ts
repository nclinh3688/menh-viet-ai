export interface NarrativeCallToAction {
  href?: string;
  label: string;
  type: "apply" | "discover" | "share";
}

export function buildReportCtas(): NarrativeCallToAction[] {
  return [
    {
      label: "Chọn một gợi ý nhỏ để áp dụng trong tuần này",
      type: "apply",
    },
    {
      href: "/",
      label: "Khám phá tiếp",
      type: "discover",
    },
    {
      label: "Chia sẻ nếu thấy hữu ích",
      type: "share",
    },
  ];
}

export function buildSectionCta(section: string): NarrativeCallToAction {
  return {
    label: `Tiếp tục đọc phần ${section} khi bạn muốn hiểu sâu hơn.`,
    type: "discover",
  };
}
