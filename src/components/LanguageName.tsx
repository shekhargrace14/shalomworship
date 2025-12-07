// src/components/LanguageName.tsx
"use client";

type LanguageMap = {
  [key: string]: string;
};

const LANGUAGES: LanguageMap = {
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

export default function LanguageName({ code }: { code: string }) {
  const name = LANGUAGES[code] || "Unknown";

  return <span>{name}</span>;
}
