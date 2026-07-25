// prisma/selectors/channel.select.ts
export const channelBaseSelect = {
  id: true,
  title: true,
  slug: true,
  createdAt: true,
  updatedAt: true,
};

export const channelTeamSelect = {
  createdBy: true,
  owner: true,
  ownerId: true,
  team: true,
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
  ...channelTeamSelect,
  ...channelMetaSelect,
};

export const channelMiniSelect = {
  id: true,
  title: true,
  slug: true,
};
