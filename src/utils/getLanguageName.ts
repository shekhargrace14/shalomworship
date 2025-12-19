// src/utils/getLanguageName.ts
import { $Enums } from "@prisma/client";

// We accept string keys instead of forcing exact enum literals.
// This is simpler and avoids weird TS edge cases.
const LANGUAGE_NAMES: Record<string, string> = {
  en: "English",
  es: "Spanish",
  hi: "Hindi",
  gu: "Gujarati",
  kn: "Kannada",
  ml: "Malayalam",
  mr: "Marathi",
  ne: "Nepali",
  pa: "Punjabi",
  pt: "Portuguese",
  sa: "Sanskrit",
  ta: "Tamil",
  te: "Telugu",
  ur: "Urdu",
};

export function getLanguageName(code: $Enums.LanguageType | null | undefined): string {
  if (!code) return "Unknown";
  return LANGUAGE_NAMES[code] ?? "Unknown";
}
