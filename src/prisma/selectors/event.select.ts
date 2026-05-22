// prisma/selectors/album.select.ts
export const eventBasicSelect = {
  id: true,
  title: true,
  slug: true,
  createdAt: true,
  updatedAt: true,
};

export const eventFullSelect = {
  ...eventBasicSelect,
  image: true,
  color: true,
};
