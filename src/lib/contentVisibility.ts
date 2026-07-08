import { StatusType } from '@prisma/client';
type StatusArray = readonly StatusType[];

/**
 * What statuses are visible WHERE
 */
export const CONTENT_VISIBILITY: Record<string, StatusArray> = {
  public: [StatusType.PUBLISH, StatusType.ARCHIVE],
  discoverable: [StatusType.PUBLISH, StatusType.ARCHIVE, StatusType.UPCOMING],
  listing: [StatusType.PUBLISH],
  sitemap: [StatusType.PUBLISH],
  upcoming: [StatusType.UPCOMING],
  admin: [StatusType.DRAFT, StatusType.UPCOMING, StatusType.PUBLISH, StatusType.ARCHIVE],
} as const;
