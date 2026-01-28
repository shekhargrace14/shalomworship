// prisma/selectors/season.select.ts
export const seasonMiniSelect = {
  id: true,
  title: true,
  slug: true,
};

export const seasonFullSelect = {
  ...seasonMiniSelect,
  image: true,
  color: true,
  createdAt: true,
};
