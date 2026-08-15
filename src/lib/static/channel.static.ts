import { StatusType } from '@prisma/client';
import prisma from './prisma';
import { channelBaseSelect, channelFullSelect } from '@/prisma/selectors';

export async function getAllChannels() {
  try {
    return await prisma.channel.findMany({ where: { type: { not: 'USER' } } });
  } catch (error) {
    console.error('Error from channel server action:', error);
    throw new Error('Failed to fetch channels'); // properly throw
  }
}
export async function getAllChannelsBasic() {
  try {
    return await prisma.channel.findMany({
      where: { type: { not: 'USER' } },
      select: channelBaseSelect,
    });
  } catch (error) {
    console.error('Error from channel server action:', error);
    throw new Error('Failed to fetch channels'); // properly throw
  }
}
export async function getChannel(channelId: string, statuses: StatusType[]) {
  try {
    return prisma.channel.findUnique({
      where: { id: channelId },
      select: {
        ...channelFullSelect,
        songs: {
          where: {
            status: {
              in: statuses,
            },
          },
        },
      },
    });
  } catch (error) {
    console.error('issue with query at aritst.static.ts');
  }
}
