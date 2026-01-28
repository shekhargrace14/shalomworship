// prisma/selectors/artist.select.ts
export const artistBaseSelect = {
  id: true,
  title: true,
  slug: true,
};

export const artistMetaSelect = {
  image: true,
  color: true,
  link: true,
  type: true,
};

export const artistTimestampsSelect = {
  createdAt: true,
  updatedAt: true,
};

export const artistFullSelect = {
  ...artistBaseSelect,
  ...artistMetaSelect,
  ...artistTimestampsSelect,
};

export const artistMiniSelect = {
  id: true,
  title: true,
  slug: true,
};
