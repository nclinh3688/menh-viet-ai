const DATE_ERROR = "Ngày sinh không hợp lệ. Vui lòng nhập dạng ngày/tháng/năm.";
const TIME_ERROR = "Giờ sinh không hợp lệ. Ví dụ: 04:20.";

export function normalizeBirthDateInput(value: string): string {
  const rawValue = value.trim();

  if (rawValue.length === 0) return "";

  const parts = rawValue.includes("/") || rawValue.includes("-") || rawValue.includes(".")
    ? rawValue.split(/[./-]/).filter(Boolean)
    : splitCompactDate(rawValue);

  if (parts.length !== 3) return rawValue;

  const [day, month, year] = parts;

  return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
}

export function isValidBirthDate(value: string): boolean {
  const normalizedValue = normalizeBirthDateInput(value);
  const parts = normalizedValue.split("/");

  if (parts.length !== 3) return false;

  const [dayText, monthText, yearText] = parts;
  const day = Number(dayText);
  const month = Number(monthText);
  const year = Number(yearText);

  if (!Number.isInteger(day) || !Number.isInteger(month) || !Number.isInteger(year)) {
    return false;
  }

  if (year < 1900 || year > 2100 || month < 1 || month > 12 || day < 1) {
    return false;
  }

  const maxDay = new Date(year, month, 0).getDate();

  return day <= maxDay;
}

export function normalizeBirthTimeInput(value: string): string {
  const rawValue = value.trim();

  if (rawValue.length === 0) return "";

  if (rawValue.includes(":")) {
    const [hour = "", minute = ""] = rawValue.split(":");

    return `${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`;
  }

  const digits = rawValue.replace(/\D/g, "");

  if (digits.length === 3) {
    return `0${digits.slice(0, 1)}:${digits.slice(1)}`;
  }

  if (digits.length === 4) {
    return `${digits.slice(0, 2)}:${digits.slice(2)}`;
  }

  return rawValue;
}

export function isValidBirthTime(value: string): boolean {
  const normalizedValue = normalizeBirthTimeInput(value);

  if (normalizedValue.length === 0) return true;

  const [hourText, minuteText] = normalizedValue.split(":");
  const hour = Number(hourText);
  const minute = Number(minuteText);

  return (
    /^\d{2}:\d{2}$/.test(normalizedValue) &&
    Number.isInteger(hour) &&
    Number.isInteger(minute) &&
    hour >= 0 &&
    hour <= 23 &&
    minute >= 0 &&
    minute <= 59
  );
}

export function birthDateInputToIsoDate(value: string): string {
  const normalizedValue = normalizeBirthDateInput(value);

  if (!isValidBirthDate(normalizedValue)) {
    throw new Error(DATE_ERROR);
  }

  const [day, month, year] = normalizedValue.split("/");

  return `${year}-${month}-${day}`;
}

export function assertValidBirthTime(value: string): string | undefined {
  const normalizedValue = normalizeBirthTimeInput(value);

  if (!isValidBirthTime(normalizedValue)) {
    throw new Error(TIME_ERROR);
  }

  return normalizedValue.length > 0 ? normalizedValue : undefined;
}

function splitCompactDate(value: string): string[] {
  const digits = value.replace(/\D/g, "");

  if (digits.length !== 8) return [value];

  return [digits.slice(0, 2), digits.slice(2, 4), digits.slice(4)];
}
