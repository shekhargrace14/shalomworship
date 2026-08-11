import { Prisma, song, channel, category } from '@prisma/client';

// EXAMPLE -
type SongWithChannel = song & {
  channel: channel | null;
};

// Generic API response
export type ApiResponse<T> = {
  success: boolean;
  data: T;
};

export type ChordLyric = { chord: string; lyrics: string };
// export type SongType = song;
export type Song = {
  id: string;
  _id: string;
  title: string;
  lines: ChordLyric[][];
  createdAt: string;
  content: string;
  image: string | null;
  author?: { id: string; image: string; title: string } | null;
  creator?: { id: string; image: string | null; title: string } | null;
};

export type CategoryType = category;

export type Category = {
  id: string;
  title: string;
  key: string;
  lines: ChordLyric[][];
  // Add other properties if needed
};
export type MetaDataProps = {
  title: string;
  slug: string;
  keyword?: string[];
  metaDescription?: string;
  image?: string;
};

// declare module "next-pwa";

// export type ChannelWithSongs = channel & {
//   songs: song[];
// };

export type ChannelWithSongs = Prisma.channelGetPayload<{
  include: {
    songs: true;
    songCredits: {
      include: {
        song: true;
      };
    };
  };
}>;

export type SongWithDetails = Prisma.songGetPayload<{
  include: {
    channels: true;

    category: {
      include: {
        category: true;
      };
    };

    genre: {
      include?: {
        genre: true;
      };
    };

    credits: {
      include: {
        channel: true;
      };
    };

    album: true;
    scripture: true;
  };
}>;

export const channelWithDetails = Prisma.validator<Prisma.channelDefaultArgs>()({
  include: {
    team: {
      include: {
        user: true,
      },
    },

    songs: true,

    songCredits: {
      include: {
        song: {
          select: {
            id: true,
            title: true,
            slug: true,
            image: true,
            status: true,
          },
        },
      },
    },
  },
});

export type ChannelWithDetails = Prisma.channelGetPayload<typeof channelWithDetails>;

// Color palette

export const colorPalette = ['var(--palette-1)', 'var(--palette-2)', 'var(--palette-3)', 'var(--palette-4)', 'var(--palette-5)', 'var(--palette-6)', 'var(--palette-7)', 'var(--palette-8)', 'var(--palette-9)', 'var(--palette-10)', 'var(--palette-11)', 'var(--palette-12)'] as const;
