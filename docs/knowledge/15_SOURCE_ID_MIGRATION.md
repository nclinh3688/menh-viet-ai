# SourceId Migration

## Vì sao cần SourceId

Mệnh Việt dùng Source Registry để mọi kết luận quan trọng có nguồn rõ ràng,
confidence và phạm vi sử dụng. Nếu Rule Engine truyền trực tiếp label hiển thị như
`Ngũ Hành` hoặc `Can Chi`, hệ thống dễ gặp lỗi khi đổi ngôn ngữ, đổi cách trình bày
hoặc cần kiểm định source bằng code.

SourceId là mã ổn định cho dữ liệu nội bộ. UI có thể dùng Source Resolver để đổi
SourceId sang nhãn tiếng Việt đẹp.

## SourceId chuẩn

- `CAN_CHI`
- `THIEN_CAN`
- `DIA_CHI`
- `NAP_AM`
- `FIVE_ELEMENTS`
- `CUNG_PHI`
- `BAT_TRACH`
- `NUMEROLOGY`
- `DAILY_FORTUNE_DETERMINISTIC`
- `GOOD_DAY_MVP`

## Legacy label đã migrate

- `Ngũ Hành` -> `FIVE_ELEMENTS`
- `Can Chi` -> `CAN_CHI`
- `Cung Phi` -> `CUNG_PHI`
- `Thần số học` -> `NUMEROLOGY`
- `Bát Trạch` -> `BAT_TRACH`
- `Nạp âm` -> `NAP_AM`
- `Thiên Can` -> `THIEN_CAN`
- `Địa Chi` -> `DIA_CHI`

## Quy tắc mới

Rule Engine chỉ ghi source bằng SourceId:

```ts
source: {
  primary: "FIVE_ELEMENTS",
  references: ["/lib/astrology/elements.ts"],
}
```

Report Engine giữ SourceId trong render model. Component hiển thị phải gọi
`formatSourceLabel(sourceId)` từ `/lib/sources/source-resolver.ts`.

## Backward compatibility

Source Resolver vẫn hỗ trợ legacy label qua alias để không phá dữ liệu cũ hoặc
report cũ. Tuy nhiên data mới không được dùng legacy label trong `source.primary`
hoặc `source.secondary`.

Validator sẽ cảnh báo:

`Nguồn legacy label nên được chuyển sang SourceId`

nếu gặp source là label cũ.

## Cách thêm source mới

1. Thêm mã vào `SourceId` trong `/lib/sources/source-types.ts`.
2. Thêm item đầy đủ vào `sourceRegistry`.
3. Nếu cần tương thích dữ liệu cũ, thêm alias vào `legacySourceAliases`.
4. Dùng SourceId trong Rule Engine hoặc adapter.
5. Không hard-code label hiển thị trong renderer/component.

## Giới hạn hiện tại

- Source Registry vẫn là code registry, chưa có versioning database.
- Validator mới cảnh báo ở runtime/dev flow, chưa chặn CI riêng.
- Một số module ngoài Birth Report vẫn dùng label tiếng Việt trong nội dung UI
  bình thường; migration này chỉ áp dụng cho field nguồn của Rule/Report Engine.
