// prisma/selectors/channel.select.ts
export const channelBaseSelect = {
  id: true,
  title: true,
  slug: true,
  createdAt: true,
  updatedAt: true,
};

export const channelMetaSelect = {
  avatar: true,
  banner: true,
  color: true,
  website: true,
  type: true,
};


export const channelFullSelect = {
  ...channelBaseSelect,
  ...channelMetaSelect,
};

export const channelMiniSelect = {
  id: true,
  title: true,
  slug: true,
};
