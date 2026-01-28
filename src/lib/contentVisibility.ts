import { StatusType } from '@prisma/client';
type StatusArray = readonly StatusType[];

/**
 * What statuses are visible WHERE
 */
export const CONTENT_VISIBILITY: Record<string, StatusArray>  = {
  public: [StatusType.publish, StatusType.archived],
  listing: [StatusType.publish],
  sitemap: [StatusType.publish],
  upcoming: [StatusType.upcoming],
  admin: [
    StatusType.draft,
    StatusType.upcoming,
    StatusType.publish,
    StatusType.archived,
  ],
} as const;
