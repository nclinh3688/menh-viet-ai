# Birth Report Content Depth v1

## Mục tiêu

Birth Report v1 được nâng từ report kỹ thuật thành nội dung có chiều sâu hơn,
dễ đọc hơn và có nguồn rõ hơn. Sprint này không thêm thuật toán mới, không dùng
AI API và không đổi database.

## Section đã nâng

- Tổng quan: thêm lớp cá nhân hóa từ Can Chi, Ngũ Hành, Nạp âm, Cung Phi và
  điểm ngày nếu có.
- Insight nổi bật: dựa trên 2-3 fact mạnh nhất từ Rule Engine, kết hợp với dữ
  liệu BirthChart.
- Điểm mạnh: giải thích fact nổi bật, lý do và cách áp dụng nhỏ.
- Điểm cần lưu ý: chuyển từ cảnh báo chung sang checklist tự quan sát.
- Công việc: thêm liên hệ giữa hành bản mệnh, fact nghề nghiệp và cách thử thực tế.
- Tài chính: nhấn mạnh tổ chức nguồn lực, không dự báo tiền bạc.
- Tình cảm: ưu tiên giao tiếp, kỳ vọng và ví dụ cụ thể.
- Sức khỏe: chỉ nhắc nhịp sống, không thay thế tư vấn y tế.
- Gợi ý áp dụng: thêm màu, số và hướng dưới dạng gợi ý biểu tượng/thực hành.
- Nguồn phân tích: giải thích source theo label tiếng Việt, vai trò và confidence.

## Nguyên tắc nội dung

Mỗi section quan trọng nên có ba lớp:

1. Điều Mệnh Việt nhận thấy.
2. Vì sao.
3. Gợi ý áp dụng.

Nội dung phải bám vào dữ liệu đã có:

- BirthChart;
- Can Chi;
- Ngũ Hành;
- Cung Phi;
- Nạp âm;
- Daily score deterministic nếu có;
- Rule Engine facts, reasons, sources và confidence.

## Cách tránh nội dung chung chung

- Không chỉ ghi tên fact. Cần giải thích fact đó liên quan tới dữ liệu nào.
- Không viết kết luận dài mà thiếu hành động.
- Không dùng các câu phán đoán cố định về tương lai.
- Không dùng lời hù dọa hoặc tạo áp lực nâng cấp.
- Không nhắc AI trong report.

## Source và Reason

Source được lưu bằng SourceId, nhưng UI hiển thị label tiếng Việt qua Source
Resolver. Why Card hiển thị:

- Nguồn;
- Vai trò của nguồn;
- Độ tin cậy nguồn;
- Rule đã dùng;
- Lý do liên quan đến kết luận.

Nếu source không có trong registry, validator cần cảnh báo ở development.

## Premium teaser

Birth Report vẫn mở phần chính cho người dùng. Premium teaser chỉ gợi ý:

- Vận trình 12 tháng;
- Báo cáo PDF cá nhân.

Teaser không che nội dung cốt lõi và không tạo cảm giác bị ép nâng cấp.

## Phần còn thiếu

- Chưa có rule chuyên sâu riêng cho personality, finance, relationship, health.
- Chưa có source versioning.
- Chưa có content QA tự động trong CI.
- Chưa có report detail theo từng tháng.
- Chưa có PDF export.
