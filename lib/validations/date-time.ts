const DATE_ERROR = "Ngày sinh không hợp lệ. Vui lòng nhập dạng ngày/tháng/năm.";
const TIME_ERROR = "Giờ sinh không hợp lệ. Ví dụ: 04:20.";

export function normalizeBirthDateInput(value: string): string {
  const rawValue = value.trim();

  if (rawValue.length === 0) return "";

  const parts = parseBirthDateParts(rawValue);

  if (parts == null) return rawValue;

  const { dayText, monthText, yearText } = parts;

  return `${dayText.padStart(2, "0")}/${monthText.padStart(2, "0")}/${yearText}`;
}

export function isValidBirthDate(value: string): boolean {
  const parts = parseBirthDateParts(normalizeBirthDateInput(value));

  if (parts == null) return false;

  const day = Number(parts.dayText);
  const month = Number(parts.monthText);
  const year = Number(parts.yearText);

  if (
    !/^\d{1,2}$/.test(parts.dayText) ||
    !/^\d{1,2}$/.test(parts.monthText) ||
    !/^\d{4}$/.test(parts.yearText) ||
    !Number.isInteger(day) ||
    !Number.isInteger(month) ||
    !Number.isInteger(year)
  ) {
    return false;
  }

  if (year < 1900 || year > 2100 || month < 1 || month > 12 || day < 1) {
    return false;
  }

  const maxDay = getDaysInMonth(month, year);

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

function parseBirthDateParts(value: string):
  | {
      dayText: string;
      monthText: string;
      yearText: string;
    }
  | null {
  const rawValue = value.trim();

  if (rawValue.length === 0) {
    return null;
  }

  const parts = /[./-]/.test(rawValue)
    ? rawValue.split(/[./-]/).filter(Boolean)
    : splitCompactDate(rawValue);

  if (parts.length !== 3) {
    return null;
  }

  const [dayText, monthText, yearText] = parts.map((part) => part.trim());

  return {
    dayText,
    monthText,
    yearText,
  };
}

function getDaysInMonth(month: number, year: number) {
  if (month === 2) {
    return isLeapYear(year) ? 29 : 28;
  }

  if ([4, 6, 9, 11].includes(month)) {
    return 30;
  }

  return 31;
}

function isLeapYear(year: number) {
  return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
}
