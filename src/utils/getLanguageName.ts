import { $Enums } from "@prisma/client";

const LANGUAGE_MAP: Record<$Enums.LanguageType, string> = {
  en: "English",
  hi: "Hindi",
  ne: "Nepali",
  pa: "Punjabi",
  ta: "Tamil",
  te: "Telugu",
  ur: "Urdu",
  ml: "Malayalam",
  kn: "Kannada",
  es: "Spanish",
  mr: "Marathi",
  sa: "Sanskrit",
  pt: "Portuguese",
};

export function getLanguageName(code: $Enums.LanguageType): string {
  return LANGUAGE_MAP[code] ?? "Unknown";
}
