// prisma/selectors/album.select.ts
export const albumBasicSelect = {
  id: true,
  title: true,
  slug: true,
  createdAt: true,
  updatedAt: true,
};

export const albumFullSelect = {
  ...albumBasicSelect,
  image: true,
  color: true,
};
