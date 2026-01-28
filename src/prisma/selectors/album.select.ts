// prisma/selectors/album.select.ts
export const albumMiniSelect = {
  id: true,
  title: true,
  slug: true,
};

export const albumFullSelect = {
  ...albumMiniSelect,
  image: true,
  color: true,
  createdAt: true,
};
