// prisma/selectors/album.select.ts
export const categoryMiniSelect = {
  id: true,
  title: true,
  slug: true,
};

export const categoryFullSelect = {
  ...categoryMiniSelect,
  image: true,
  color: true,
  createdAt: true,
};
