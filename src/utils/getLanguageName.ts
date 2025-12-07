import { $Enums } from "@prisma/client";

const LANGUAGE_NAMES: Record<$Enums.LanguageType, string> = {
  en: "English",
  es: "Spanish",
  hi: "Hindi",
  kn: "Kannada",
  ml: "Malayalam",
  mr: "Marathi",
  ne: "Nepali",
  pa: "Punjabi",
  pt: "Portuguese", // <-- MUST EXIST
  sa: "Sanskrit",
  ta: "Tamil",
  te: "Telugu",
  ur: "Urdu",
};

export function getLanguageName(code: $Enums.LanguageType): string {
  return LANGUAGE_NAMES[code] || "Unknown";
}
