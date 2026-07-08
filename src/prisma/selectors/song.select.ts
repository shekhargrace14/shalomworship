// prisma/selectors/song.select.ts
export const songBaseSelect = {
  id: true,
  title: true,
  slug: true,
  status: true,
  createdAt: true,
  updatedAt: true,
};

export const songContentSelect = {
  content: true,
  lines: true,
  lyrics: true,
  isChords: true,
  isTranslation: true,
  version: true,
};

export const songMusicSelect = {
  key: true,
  bpm: true,
  time: true,
  tempo: true,
};

export const songMediaSelect = {
  image: true,
  video: true,
  videoId: true,
  audio: true,
  color: true,
  language: true,
};

export const songSeoSelect = {
  keyword: true,
  metaDescription: true,
  excerpt: true,
  about: true,
  searchVariant: true,
  searchVariantInTitle: true,
};

export const songStatsSelect = {
  view: true,
  like: true,
};

// Original creator / owner of the song
export const songCredits = {
  channelId: true,
  channel: true,
  credits: true,
};

// Classification

export const songClassification = {
  albums: true,
  seasons: true,
};

export const songFullSelect = {
  ...songBaseSelect,
  ...songContentSelect,
  ...songCredits,
  ...songMusicSelect,
  ...songMediaSelect,
  ...songSeoSelect,
  ...songStatsSelect,
};

export const songMiniSelect = {
  id: true,
  title: true,
  slug: true,
};

export const songSeoOnlySelect = {
  title: true,
  slug: true,
  keyword: true,
  metaDescription: true,
};
