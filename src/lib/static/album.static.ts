import { albumFullSelect } from '@/prisma/selectors';
import prisma from './prisma';

export async function getAllAlbums() {
  return await prisma.album.findMany({
    select: {
      ...albumFullSelect,

      channel: {
        select: {
          id: true,
          title: true,
          slug: true,
          avatar: true,
          type: true,
          verified: true,
        },
      },
    },
  });
}

export async function getAlbum(id: string) {
  try {
    return await prisma.album.findUnique({
      where: { id },

      include: {
        channel: {
          select: {
            id: true,
            title: true,
            slug: true,
            avatar: true,
            type: true,
            verified: true,
          },
        },

        songs: {
          orderBy: {
            trackNo: 'asc',
          },

          include: {
            song: true,
          },
        },
      },
    });
  } catch (error) {
    console.error('Error from albumById server action:', error);
    throw new Error('Failed to fetch album by ID');
  }
}
