// prisma/selectors/album.select.ts
export const categoryBasicSelect = {
  id: true,
  title: true,
  slug: true,
  createdAt: true,
  updatedAt: true,
  color: true,

};

export const categoryFullSelect = {
  ...categoryBasicSelect,
  image: true,
  color: true,
  song: true,
};
