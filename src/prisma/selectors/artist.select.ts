// prisma/selectors/artist.select.ts
export const artistBaseSelect = {
  id: true,
  title: true,
  slug: true,
  createdAt: true,
  updatedAt: true,
};

export const artistMetaSelect = {
  image: true,
  color: true,
  link: true,
  type: true,
};


export const artistFullSelect = {
  ...artistBaseSelect,
  ...artistMetaSelect,
};

export const artistMiniSelect = {
  id: true,
  title: true,
  slug: true,
};
